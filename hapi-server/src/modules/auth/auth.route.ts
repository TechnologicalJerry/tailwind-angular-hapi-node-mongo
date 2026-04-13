import type { Server } from '@hapi/hapi';
import { AuthController } from './auth.controller.js';
import { loginSchema, registerSchema } from './auth.schema.js';

export function registerAuthRoutes(server: Server): void {
  server.route([
    {
      method: 'POST',
      path: '/api/auth/register',
      options: {
        auth: false,
        tags: ['api', 'auth'],
        description: 'Register a new user',
        validate: { payload: registerSchema },
        handler: AuthController.register,
      },
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      options: {
        auth: false,
        tags: ['api', 'auth'],
        description: 'Login and receive a JWT token',
        validate: { payload: loginSchema },
        handler: AuthController.login,
      },
    },
  ]);
}
