'use strict';

module.exports = {
  /**
   * Run the migrations.
   *
   * @param {import('sequelize').QueryInterface} 
   * @param {import('sequelize').Sequelize} 
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subscriptions', [
      {
        userId: 1,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        eventId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  /**
   * Revert the migrations.
   *
   * @param {import('sequelize').QueryInterface} 
   * @param {import('sequelize').Sequelize} 
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subscriptions', null, {});
  }
};
