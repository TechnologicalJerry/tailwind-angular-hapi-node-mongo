import type { Server } from '@hapi/hapi';
import { UserController } from './user.controller.js';
import { updateUserSchema, userIdParamSchema } from './user.schema.js';

export function registerUserRoutes(server: Server): void {
  server.route([
    {
      method: 'GET',
      path: '/api/users',
      options: {
        auth: 'jwt',
        tags: ['api', 'users'],
        description: 'Get all users',
        handler: UserController.getAll,
      },
    },
    {
      method: 'GET',
      path: '/api/users/{id}',
      options: {
        auth: 'jwt',
        tags: ['api', 'users'],
        description: 'Get user by ID',
        validate: { params: userIdParamSchema },
        handler: UserController.getOne,
      },
    },
    {
      method: 'PUT',
      path: '/api/users/{id}',
      options: {
        auth: 'jwt',
        tags: ['api', 'users'],
        description: 'Update user by ID',
        validate: {
          params: userIdParamSchema,
          payload: updateUserSchema,
        },
        handler: UserController.update,
      },
    },
    {
      method: 'DELETE',
      path: '/api/users/{id}',
      options: {
        auth: 'jwt',
        tags: ['api', 'users'],
        description: 'Delete user by ID',
        validate: { params: userIdParamSchema },
        handler: UserController.remove,
      },
    },
  ]);
}
