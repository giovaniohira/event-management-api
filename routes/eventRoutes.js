const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticação

router.post('/', authMiddleware, eventController.createEvent);
router.get('/', eventController.listEvents);
router.put('/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;