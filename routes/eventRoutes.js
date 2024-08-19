const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticação

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Operações relacionadas aos eventos.
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Evento de Teste"
 *               description:
 *                 type: string
 *                 example: "Descrição do evento de teste."
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-19"
 *     responses:
 *       201:
 *         description: Evento criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *       400:
 *         description: Erro ao criar evento.
 */
router.post('/', authMiddleware.verifyToken, eventController.createEvent);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Lista todos os eventos
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lista de eventos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *       400:
 *         description: Erro ao listar eventos.
 */
router.get('/', eventController.listEvents);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Atualiza um evento existente
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Evento Atualizado"
 *               description:
 *                 type: string
 *                 example: "Descrição atualizada do evento."
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-20"
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *       404:
 *         description: Evento não encontrado.
 *       400:
 *         description: Erro ao atualizar evento.
 */
router.put('/:id', authMiddleware.verifyToken, eventController.updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Exclui um evento existente
 *     tags: [Events]
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
 *         description: Evento excluído com sucesso.
 *       404:
 *         description: Evento não encontrado.
 *       400:
 *         description: Erro ao excluir evento.
 */
router.delete('/:id', authMiddleware.verifyToken, eventController.deleteEvent);

module.exports = router;
