const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas aos usuários.
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Cadastro de um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
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
 *                     isAdmin:
 *                       type: boolean
 *       400:
 *         description: Erro ao criar usuário.
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de um usuário existente
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas.
 *       400:
 *         description: Erro ao realizar login.
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar dados do usuário
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dados atualizados com sucesso.
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
 *                     isAdmin:
 *                       type: boolean
 *       404:
 *         description: Usuário não encontrado.
 *       403:
 *         description: Permissão negada.
 *       500:
 *         description: Erro ao atualizar dados.
 */
router.put('/:id', authMiddleware.verifyToken, userController.updateUser);

module.exports = router;
