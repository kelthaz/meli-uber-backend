import swaggerJSDoc from 'swagger-jsdoc';
import requestDocs from './request.docs.js';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Meli-Uber API',
    version: '1.0.0',
    description: 'API para simular la solicitud de un vehículo en Meli-Uber',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
  paths: {
    ...requestDocs,
  },
};

const options = {
  swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
