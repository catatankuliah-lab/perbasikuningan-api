// services/approvalLogService.js
const { ApprovalLog, Document, User } = require("../models");

/**
 * Mengambil semua log persetujuan
 */
exports.findAll = async () => {
  return await ApprovalLog.findAll({
    include: [
      { model: Document, as: "document", attributes: ["id", "title", "type"] },
      { model: User, as: "approver", attributes: ["id", "full_name", "email"] },
    ],
    order: [["created_at", "DESC"]],
  });
};

/**
 * Mengambil log berdasarkan ID Dokumen tertentu
 */
exports.findByDocumentId = async (documentId) => {
  return await ApprovalLog.findAll({
    where: { document_id: documentId },
    include: [
      { model: User, as: "approver", attributes: ["id", "full_name", "email"] },
    ],
    order: [["created_at", "DESC"]],
  });
};

/**
 * Membuat log persetujuan baru
 */
exports.create = async (data) => {
  return await ApprovalLog.create(data);
};