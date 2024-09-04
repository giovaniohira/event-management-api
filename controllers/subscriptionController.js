const { User, Event, Subscription } = require('../models');

// Inscrever-se em um evento
exports.subscribeToEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    
    const subscriptionCount = await Subscription.count({ where: { eventId: id } });
    if (subscriptionCount >= event.limit) {
      return res.status(400).json({ error: 'O evento já atingiu o limite máximo de inscrições.' });
    }

    const [subscription, created] = await Subscription.findOrCreate({
      where: { userId, eventId: id },
      defaults: { userId, eventId: id }
    });



    if (!created) {
      return res.status(400).json({ error: 'Você já está inscrito neste evento.' });
    }

    res.status(201).json({ message: 'Inscrição realizada com sucesso!', subscription });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao se inscrever no evento.' });
  }
};

// Cancelar inscrição em um evento
exports.unsubscribeFromEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const subscription = await Subscription.findOne({ where: { userId, eventId: id } });
    if (!subscription) {
      return res.status(404).json({ error: 'Inscrição não encontrada.' });
    }

    await subscription.destroy();
    res.json({ message: 'Inscrição cancelada com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cancelar inscrição.' });
  }
};
