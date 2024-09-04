const { Event, Subscription, User } = require('../models');

// Relatório de eventos com nomes dos inscritos
exports.eventReport = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Valor padrão 10
    const page = parseInt(req.query.page) || 1; // Valor padrão 1

    if (![5, 10, 30].includes(limit)) {
      return res.status(400).json({ error: 'Limite deve ser 5, 10 ou 30.' });
    }

    const offset = (page - 1) * limit;

    // Consulta com os nomes dos usuários inscritos em cada evento
    const { count, rows } = await Event.findAndCountAll({
      include: {
        model: Subscription,
        as: 'subscriptions', // Utilize o alias aqui
        include: {
          model: User,
          as: 'User', // Alias para o usuário
          attributes: ['name'] // Retornar apenas o nome do usuário
        }
      },
      limit,
      offset,
      order: [['createdAt', 'DESC']], // Ordenação opcional
    });

    const formattedEvents = rows.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      subscribers: event.subscriptions.map(sub => sub.User.name) // Nomes dos inscritos
    }));

    res.json({ events: formattedEvents, total: count });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
