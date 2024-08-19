const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Gerenciamento de Eventos',
      version: '1.0.0',
      description: 'API para gerenciamento de eventos, usuários e inscrições',
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Localização dos arquivos de rota e controlador
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
