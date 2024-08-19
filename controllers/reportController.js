const { Event, Subscription } = require('../models');

// Relatório de eventos com número de inscrições
exports.eventReport = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10; // Valor padrão 10
      const page = parseInt(req.query.page) || 1; // Valor padrão 1
  
      if (![5, 10, 30].includes(limit)) {
        return res.status(400).json({ error: 'Limite deve ser 5, 10 ou 30.' });
      }
  
      const offset = (page - 1) * limit;
  
      const { count, rows } = await Event.findAndCountAll({
        include: {
          model: Subscription,
          attributes: [[sequelize.fn('COUNT', sequelize.col('Subscriptions.id')), 'subscriptionCount']],
          duplicating: false
        },
        group: ['Event.id'],
        limit,
        offset
      });
  
      res.json({ events: rows, total: count });
    } catch (error) {
      res.status(400).json({ error: 'Erro ao gerar relatório.' });
    }
  };