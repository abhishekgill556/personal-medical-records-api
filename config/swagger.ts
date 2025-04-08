import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Medical Records API',
      version: '1.0.0',
      description: 'API for managing medical records, appointments, and prescriptions.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/api/v1/routes/*.ts'],
});

export default swaggerSpec;
