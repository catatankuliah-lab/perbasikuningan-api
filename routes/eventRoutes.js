const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

router.use(verifyToken);

// Siapa saja yang login bisa melihat daftar event
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

// Hanya IT Support (atau Admin) yang bisa mengelola event
router.post('/', authorizeRole('IT Support'), eventController.createEvent);
router.put('/:id', authorizeRole('IT Support'), eventController.updateEvent);
router.delete('/:id', authorizeRole('IT Support'), eventController.deleteEvent);

module.exports = router;