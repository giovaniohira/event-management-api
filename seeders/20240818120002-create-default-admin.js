'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona um administrador padrão
    await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      email: 'admin@example.com',
      password: 'adminpassword', // Utilize uma senha segura e criptografada
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: 'admin@example.com'
    }, {});
  }
};
