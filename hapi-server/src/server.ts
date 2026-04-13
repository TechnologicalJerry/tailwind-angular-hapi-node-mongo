import Hapi from '@hapi/hapi';
import { env } from './config/env.js';
import { registerJwtPlugin } from './plugins/jwt.plugin.js';
import { registerSwaggerPlugin } from './plugins/swagger.plugin.js';
import { registerAuthRoutes } from './modules/auth/auth.route.js';
import { registerUserRoutes } from './modules/user/user.route.js';

export async function createServer(): Promise<Hapi.Server> {
  const server = Hapi.server({
    host: env.HOST,
    port: env.PORT,
    routes: {
      cors: { origin: ['*'] },
      validate: {
        failAction: async (_request, _h, err) => {
          throw err;
        },
      },
    },
  });

  // Plugins
  await registerJwtPlugin(server);
  await registerSwaggerPlugin(server);

  // Routes
  registerAuthRoutes(server);
  registerUserRoutes(server);

  // Health check (no auth)
  server.route({
    method: 'GET',
    path: '/health',
    options: {
      auth: false,
      tags: ['api'],
      description: 'Health check',
      handler: () => ({ status: 'ok', timestamp: new Date().toISOString() }),
    },
  });

  return server;
}
