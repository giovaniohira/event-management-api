const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticação

// As rotas devem usar o middleware corretamente
router.post('/', authMiddleware.verifyToken, eventController.createEvent);
router.get('/', eventController.listEvents);
router.put('/:id', authMiddleware.verifyToken, eventController.updateEvent);
router.delete('/:id', authMiddleware.verifyToken, eventController.deleteEvent);

module.exports = router;
