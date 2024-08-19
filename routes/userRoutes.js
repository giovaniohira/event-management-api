const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
router.post('/register', userController.register);
router.post('/login', userController.login);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza dados pessoais do usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Dados a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: jane.doe@example.com
 *               password:
 *                 type: string
 *                 example: newpassword
 *     responses:
 *       200:
 *         description: Dados atualizados com sucesso
 *       400:
 *         description: Erro de validação
 *       403:
 *         description: Permissão negada
 */
router.put('/:id', authMiddleware.verifyToken, userController.updateUser);

module.exports = router;