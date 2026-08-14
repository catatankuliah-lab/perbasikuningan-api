const {
  Product,
  Employee,
  Customer,
  Transaction,
  TransactionItems,
  CommissionRule,
  EmployeeCommission,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

// 1. Buat Transaksi Baru (POS Checkout + Otomatis Catat Komisi)
exports.createTransaction = async (payload, cashierName) => {
  const { customer_id, employee_id, payment_method, items } = payload;

  if (!items || items.length === 0) {
    const err = new Error("Item transaksi tidak boleh kosong");
    err.status = 400;
    throw err;
  }

  const t = await sequelize.transaction();

  try {
    let totalAmount = 0;
    const computedItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.product_id, {
        transaction: t,
      });
      if (!product) {
        throw new Error(`Produk dengan ID ${item.product_id} tidak ditemukan`);
      }

      const itemQty = item.quantity || item.qty || 1;

      // Cek stok jika produk bukan layanan cuci
      if (
        product.category.toLowerCase() !== "cuci" &&
        product.stock < itemQty
      ) {
        throw new Error(`Stok produk ${product.name} tidak mencukupi`);
      }

      const price = product.price;
      const subtotal = price * itemQty;
      totalAmount += subtotal;

      // Hitung komisi berdasarkan product_id jika item adalah layanan cuci dan ada employee_id
      let itemCommission = 0;
      if (employee_id && product.category.toLowerCase() === "cuci") {
        const commissionRule = await CommissionRule.findOne({
          where: { product_id: product.id },
          transaction: t,
        });

        if (commissionRule) {
          itemCommission = Number(commissionRule.commission_price) * itemQty;
        }
      }

      computedItems.push({
        product_id: product.id,
        qty: itemQty,
        price_at_transaction: price,
        subtotal,
        product_category: product.category,
        employee_id: employee_id || null,
        commission_amount: itemCommission,
      });

      // Kurangi stok otomatis hanya untuk barang fisik
      if (product.category.toLowerCase() !== "cuci") {
        product.stock -= itemQty;
        await product.save({ transaction: t });
      }
    }

    // Generate Nomor Invoice Unik Harian
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const countToday = await Transaction.count({
      where: {
        created_at: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      transaction: t,
    });
    const invoiceNumber = `HKI-${dateStr}-${String(countToday + 1).padStart(4, "0")}`;

    // Simpan Header Transaksi (Tanpa employee_id)
    const transaction = await Transaction.create(
      {
        invoice_number: invoiceNumber,
        customer_id: customer_id || null,
        total_amount: totalAmount,
        payment_method: payment_method || "Cash",
        cashier_name: cashierName,
      },
      { transaction: t },
    );

    // Simpan Detail Item Transaksi (employee_id & commission_amount masuk ke tabel item)
    for (const compItem of computedItems) {
      await TransactionItems.create(
        {
          transaction_id: transaction.id,
          product_id: compItem.product_id,
          qty: compItem.qty,
          price_at_transaction: compItem.price_at_transaction,
          subtotal: compItem.subtotal,
          employee_id: compItem.employee_id,
          commission_amount: compItem.commission_amount,
        },
        { transaction: t },
      );
    }

    await t.commit();

    // 🛑 Return data langsung secara aman tanpa query findByPk yang memicu error join
    return {
      id: transaction.id,
      invoice_number: invoiceNumber,
      customer_id: customer_id || null,
      total_amount: totalAmount,
      payment_method: payment_method || "Cash",
      cashier_name: cashierName,
      items: computedItems,
    };
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    throw error;
  }
};

// 2. Ambil Riwayat Seluruh Transaksi (Dengan Support Filter Search & Payment Method)
exports.getAllTransactions = async (query) => {
    try {
      const { search, payment_method, start_date, end_date, page = 1, limit = 10 } = query;
      const offset = (page - 1) * limit;
      const whereClause = {};
  
      // Filter berdasarkan Pencarian (No. Invoice atau Nama Pelanggan)
      if (search) {
        whereClause[Op.or] = [
          { invoice_number: { [Op.like]: `%${search}%` } },
          { "$customer.name$": { [Op.like]: `%${search}%` } }
        ];
      }
  
      // Filter berdasarkan Metode Pembayaran
      if (payment_method) {
        whereClause.payment_method = payment_method;
      }
  
      // Filter berdasarkan Rentang Tanggal
      if (start_date && end_date) {
        whereClause.created_at = {
          [Op.between]: [`${start_date} 00:00:00`, `${end_date} 23:59:59`],
        };
      } else if (start_date) {
        whereClause.created_at = {
          [Op.gte]: `${start_date} 00:00:00`,
        };
      }
  
      const { count, rows } = await Transaction.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Customer,
            as: "customer",
            attributes: ["id", "name", "phone", "vehicle_plate"],
            required: false,
          },
        ],
        order: [["created_at", "DESC"]],
        limit: parseInt(limit),
        offset: parseInt(offset),
        distinct: true,
      });
  
      return {
        data: rows,
        pagination: {
          total_data: count,
          total_pages: Math.ceil(count / limit) || 1,
          current_page: parseInt(page),
          limit: parseInt(limit),
        },
      };
    } catch (error) {
      console.error(
        "================ ERROR SQL GET ALL TRANSACTIONS ================",
      );
      console.error("Pesan Error:", error.message);
      console.error("Detail SQL:", error.sql);
      console.error("Stack Trace:", error);
      console.error(
        "================================================================",
      );
      throw error;
    }
  };

// 3. Ambil Detail Transaksi Berdasarkan ID (Aman dari error karena menggunakan relasi item)
exports.getTransactionById = async (id) => {
  const transaction = await Transaction.findByPk(id, {
    include: [
      {
        model: Customer,
        as: "customer",
        attributes: ["id", "name", "phone", "vehicle_plate"],
      },
      {
        model: TransactionItems,
        as: "items",
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name", "category"],
          },
          { model: Employee, as: "employee", attributes: ["id", "name"] },
        ],
      },
    ],
  });

  if (!transaction) {
    const err = new Error("Transaksi tidak ditemukan");
    err.status = 404;
    throw err;
  }

  return transaction;
};
