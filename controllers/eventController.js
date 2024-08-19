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
    const events = await Event.findAll();
    res.json(events);
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