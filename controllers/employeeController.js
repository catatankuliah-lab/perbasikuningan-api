// controllers/employeeController.js
const EmployeeService = require("../services/employeeService");

exports.getEmployees = async (req, res, next) => {
  try {
    // 1. Ambil semua data dari service
    let data = await EmployeeService.getAllEmployees();

    const { page, limit, search } = req.query;

    // Jika tidak pakai parameter pagination/search sama sekali
    if (!page && !limit && !search) {
      return res.json({ 
        success: true, 
        message: "Daftar karyawan berhasil diambil", 
        data 
      });
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const keyword = search ? search.toLowerCase() : "";

    // 2. Proses Filter Search
    if (keyword) {
      data = data.filter((emp) => 
        emp.name && emp.name.toLowerCase().includes(keyword)
      );
    }

    // 3. Proses Pagination
    const totalData = data.length;
    const totalPages = Math.ceil(totalData / limitNum) || 1;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedData = data.slice(startIndex, startIndex + limitNum);

    // 4. Kirim respon ke frontend
    res.json({
      success: true,
      message: "Daftar karyawan berhasil diambil",
      data: paginatedData,
      pagination: {
        total_data: totalData,
        total_pages: totalPages,
        current_page: pageNum,
        per_page: limitNum,
      },
    });
  } catch (error) {
    console.error("❌ [ERROR] getEmployees:", error);
    next(error);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const data = await EmployeeService.getEmployeeById(req.params.id);
    res.json({ success: true, message: "Detail karyawan berhasil diambil", data });
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const data = await EmployeeService.createEmployee(req.body);
    res.status(201).json({ success: true, message: "Karyawan berhasil ditambahkan", data });
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const data = await EmployeeService.updateEmployee(req.params.id, req.body);
    res.json({ success: true, message: "Karyawan berhasil diperbarui", data });
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const data = await EmployeeService.deleteEmployee(req.params.id);
    res.json({ success: true, message: data.message });
  } catch (error) {
    next(error);
  }
};