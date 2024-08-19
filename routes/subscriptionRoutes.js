const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Operações relacionadas às inscrições em eventos.
 */

/**
 * @swagger
 * /subscriptions/{id}/subscribe:
 *   post:
 *     summary: Inscrever-se em um evento
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento para o qual o usuário deseja se inscrever.
 *     responses:
 *       201:
 *         description: Inscrição realizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 subscription:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     eventId:
 *                       type: integer
 *       400:
 *         description: Erro ao se inscrever no evento ou já inscrito.
 *       404:
 *         description: Evento não encontrado.
 */
router.post('/:id/subscribe', authMiddleware.verifyToken, subscriptionController.subscribeToEvent);

/**
 * @swagger
 * /subscriptions/{id}/unsubscribe:
 *   delete:
 *     summary: Cancelar inscrição em um evento
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento para o qual o usuário deseja cancelar a inscrição.
 *     responses:
 *       200:
 *         description: Inscrição cancelada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Erro ao cancelar inscrição.
 *       404:
 *         description: Inscrição não encontrada.
 */
router.delete('/:id/unsubscribe', authMiddleware.verifyToken, subscriptionController.unsubscribeFromEvent);

module.exports = router;
