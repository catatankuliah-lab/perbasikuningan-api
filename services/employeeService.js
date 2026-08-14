// services/employeeService.js
const { Employee } = require("../models");

// Ambil semua karyawan
exports.getAllEmployees = async () => {
  return await Employee.findAll({ order: [["name", "ASC"]] });
};

// Ambil detail karyawan berdasarkan ID
exports.getEmployeeById = async (id) => {
  const employee = await Employee.findByPk(id);
  if (!employee) {
    const err = new Error("Karyawan tidak ditemukan");
    err.status = 404;
    throw err;
  }
  return employee;
};

// Tambah karyawan baru
exports.createEmployee = async (payload) => {
  const { name, phone, is_active } = payload;
  return await Employee.create({
    name,
    phone,
    is_active: is_active !== undefined ? is_active : true,
  });
};

// Update karyawan berdasarkan ID
exports.updateEmployee = async (id, payload) => {
  const employee = await exports.getEmployeeById(id);
  const { name, phone, is_active } = payload;

  employee.name = name !== undefined ? name : employee.name;
  employee.phone = phone !== undefined ? phone : employee.phone;
  employee.is_active = is_active !== undefined ? is_active : employee.is_active;

  await employee.save();
  return employee;
};

// Hapus karyawan berdasarkan ID
exports.deleteEmployee = async (id) => {
  const employee = await exports.getEmployeeById(id);
  await employee.destroy();
  return { message: "Karyawan berhasil dihapus" };
};