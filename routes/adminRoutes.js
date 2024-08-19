const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware para verificar se o usuário é um administrador
router.use(authMiddleware.verifyToken);
router.use(authMiddleware.checkAdmin);

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Operações relacionadas aos administradores.
 */

/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Cria um novo administrador
 *     tags: [Admins]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao.silva@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Email já está em uso.
 *       500:
 *         description: Erro ao criar administrador.
 */
router.post('/', adminController.createAdmin);

/**
 * @swagger
 * /admins/users/{id}:
 *   delete:
 *     summary: Exclui um usuário não administrador
 *     tags: [Admins]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       400:
 *         description: Não é permitido excluir um administrador.
 *       500:
 *         description: Erro ao remover usuário.
 */
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
