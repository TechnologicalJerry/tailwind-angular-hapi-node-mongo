import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import type { Server } from '@hapi/hapi';
import { env } from '../config/env.js';

const swaggerOptions = {
  info: {
    title: 'Hapi API Documentation',
    version: '1.0.0',
  },
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ jwt: [] }],
  host: `${env.HOST === '0.0.0.0' ? 'localhost' : env.HOST}:${env.PORT}`,
  schemes: [env.NODE_ENV === 'production' ? 'https' : 'http'],
};

export async function registerSwaggerPlugin(server: Server): Promise<void> {
  await server.register([
    Inert,
    Vision,
    { plugin: HapiSwagger, options: swaggerOptions },
  ]);
}
