const { Event, Subscription } = require('../models');

// Relatório de eventos com número de inscrições
exports.eventReport = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: {
        model: Subscription,
        attributes: [[sequelize.fn('COUNT', sequelize.col('Subscriptions.id')), 'subscriptionCount']],
        duplicating: false
      },
      group: ['Event.id']
    });

    res.json(events);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao gerar relatório.' });
  }
};
