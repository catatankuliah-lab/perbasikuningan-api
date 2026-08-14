// models/index.js
const sequelize = require('../config/sequelize');
const User = require('./userModel');
const Customer = require('./customerModel');
const Product = require('./productModel');
const Employee = require('./employeeModel');
const Transaction = require('./transactionModel');
const TransactionItems = require('./transactionItemModel');
const CommissionRule = require('./commissionRuleModel');
const EmployeeCommission = require('./employeeCommissionModel');
const Procurement = require('./procurementModel');
const Expense = require('./expenseModel');

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Customer = Customer;
db.Product = Product;
db.Employee = Employee;
db.Transaction = Transaction;
db.TransactionItems = TransactionItems;
db.CommissionRule = CommissionRule;
db.EmployeeCommission = EmployeeCommission;
db.Procurement = Procurement;
db.Expense = Expense;

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;