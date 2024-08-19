const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Operações relacionadas aos relatórios.
 */

/**
 * @swagger
 * /reports/events:
 *   get:
 *     summary: Gera um relatório dos eventos com o número de inscrições
 *     tags: [Reports]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Relatório dos eventos com o número de inscrições.
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
 *                   subscriptionCount:
 *                     type: integer
 *       400:
 *         description: Erro ao gerar relatório.
 */
router.get('/events', authMiddleware.verifyToken, reportController.eventReport);

module.exports = router;
