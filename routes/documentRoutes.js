const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.use(verifyToken);

router.get('/', documentController.getAllDocuments);
router.get('/:id', documentController.getDocumentById);

// Hanya IT Support yang bisa mengelola dokumen
// Gunakan 'file_url' sebagai field name di Postman form-data
router.post(
  '/', 
  authorizeRole('IT Support'), 
  upload.single('file_url'), 
  documentController.createDocument
);

router.put(
  '/:id', 
  authorizeRole('IT Support'), 
  upload.single('file_url'), 
  documentController.updateDocument
);

router.delete(
  '/:id', 
  authorizeRole('IT Support'), 
  documentController.deleteDocument
);

module.exports = router;