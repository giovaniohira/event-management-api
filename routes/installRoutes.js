const express = require('express');
const router = express.Router();
const { User, Event } = require('../models');

// Rota para instalar e popular o banco de dados
router.get('/install', async (req, res) => {
  try {
    await User.sync({ force: true });
    await Event.sync({ force: true });
    await require('../seeders/20240818120000-demo-users').up();
    await require('../seeders/20240818120001-demo-events').up();
    await require('../seeders/20240818120002-create-default-admin').up();
    res.json({ message: 'Banco de dados instalado e populado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao instalar o banco de dados.' });
  }
});

module.exports = router;