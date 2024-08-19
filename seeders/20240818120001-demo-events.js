'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      { title: 'Evento 1', description: 'Descrição do evento 1', date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { title: 'Evento 2', description: 'Descrição do evento 2', date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { title: 'Evento 3', description: 'Descrição do evento 3', date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { title: 'Evento 4', description: 'Descrição do evento 4', date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { title: 'Evento 5', description: 'Descrição do evento 5', date: new Date(), createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
