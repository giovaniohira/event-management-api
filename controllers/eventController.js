const { Event } = require('../models');

// Criar evento
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const event = await Event.create({ title, description, date });
    res.status(201).json({ message: 'Evento criado com sucesso!', event });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar evento.' });
  }
};

// Listar eventos
exports.listEvents = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10; // Valor padrão 10
      const page = parseInt(req.query.page) || 1; // Valor padrão 1
  
      if (![5, 10, 30].includes(limit)) {
        return res.status(400).json({ error: 'Limite deve ser 5, 10 ou 30.' });
      }
  
      const offset = (page - 1) * limit;
  
      const { count, rows } = await Event.findAndCountAll({
        limit,
        offset
      });
  
      res.json({ events: rows, total: count });
    } catch (error) {
      res.status(400).json({ error: 'Erro ao listar eventos.' });
    }
  };

// Atualizar evento
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    await event.update({ title, description, date });
    res.json({ message: 'Evento atualizado com sucesso!', event });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar evento.' });
  }
};

// Excluir evento
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado.' });
    }
    await event.destroy();
    res.json({ message: 'Evento excluído com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir evento.' });
  }
};