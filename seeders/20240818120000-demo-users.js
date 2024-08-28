'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('admin123', 10);
    return queryInterface.bulkInsert('Users', [
      { name: 'Admin', email: 'admin@example.com', password: hash, isAdmin: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'User1', email: 'user1@example.com', password: hash, isAdmin: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'User2', email: 'user2@example.com', password: hash, isAdmin: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'User3', email: 'user3@example.com', password: hash, isAdmin: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'User4', email: 'user4@example.com', password: hash, isAdmin: false, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
