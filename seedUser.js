// seedUser.js
const bcrypt = require("bcryptjs"); // Gunakan bcryptjs (sesuai dengan model tadi)
const User = require("./models/userModel"); 
const sequelize = require("./config/sequelize");

async function seedAdmin() {
  try {
    await sequelize.authenticate();
    console.log("✅ Terhubung ke database untuk seeding...");

    // Cek apakah email admin sudah ada
    const existingUser = await User.findOne({ where: { email: "perbasikuningan@gmail.com" } });
    if (existingUser) {
      console.log("⚠️ User admin sudah ada di database!");
      process.exit();
    }

    await User.create({
      email: "perbasikuningan@gmail.com",
      password_hash: "kalaitudev", 
      role: "IT Support",
      full_name: "Admin Perbasi",
      is_active: true
    });

    console.log(
      '✅ Berhasil membuat user default: email "perbasikuningan@gmail.com", password "kalaitudev"',
    );
    process.exit();
  } catch (error) {
    console.error("❌ Gagal seed user:", error);
    process.exit(1);
  }
}

seedAdmin();