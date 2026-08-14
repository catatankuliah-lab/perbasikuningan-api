// seedUser.js
const bcrypt = require("bcrypt");
const User = require("./models/userModel"); // 🎯 Import langsung dari file model user
const sequelize = require("./config/sequelize");

async function seedAdmin() {
  try {
    // Tes koneksi database
    await sequelize.authenticate();
    console.log("✅ Terhubung ke database untuk seeding...");

    const hashedPassword = await bcrypt.hash("kalaitudev", 10);

    const existingUser = await User.findOne({ where: { username: "hokisteam" } });
    if (existingUser) {
      console.log("⚠️ User admin sudah ada di database!");
      process.exit();
    }

    await User.create({
      username: "hokisteam",
      password: hashedPassword,
      role: "admin",
    });

    console.log(
      '✅ Berhasil membuat user default: username "hokisteam", password "kalaitudev"',
    );
    process.exit();
  } catch (error) {
    console.error("❌ Gagal seed user:", error);
    process.exit(1);
  }
}

seedAdmin();