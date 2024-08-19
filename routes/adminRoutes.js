const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware para verificar se o usuário é um administrador
router.use(authMiddleware.verifyToken);
router.use(authMiddleware.checkAdmin);

router.post('/', adminController.createAdmin);
router.delete('/users/:id', adminController.deleteUser);


module.exports = router;
