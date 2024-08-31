const express = require('express');
const router = express.Router();
const { User, Event, Subscription } = require('../models');
const { sequelize } = require('../models');

// Rota para instalar e popular o banco de dados
router.get('/', async (req, res) => {
  try {
    const queryInterface = sequelize.getQueryInterface();
    await User.sync({ force: true });
    await Event.sync({ force: true });
    await Subscription.sync({ force: true });
    await require('../seeders/20240818120000-demo-users').up(queryInterface, sequelize);
    await require('../seeders/20240818120001-demo-events').up(queryInterface, sequelize);
    await require('../seeders/20240819-create-subscriptions').up(queryInterface, sequelize);
    
    res.json({ message: 'Banco de dados instalado e populado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao instalar o banco de dados.' });
  }
});

module.exports = router;