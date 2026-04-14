import type { Server } from '@hapi/hapi';
import { ProductController } from './product.controller.js';
import { createProductSchema, updateProductSchema, productIdParamSchema } from './product.schema.js';

export function registerProductRoutes(server: Server): void {
  server.route([
    {
      method: 'GET',
      path: '/api/products',
      options: {
        auth: 'jwt',
        tags: ['api', 'products'],
        description: 'Get all products',
        handler: ProductController.getAll,
      },
    },
    {
      method: 'GET',
      path: '/api/products/{id}',
      options: {
        auth: 'jwt',
        tags: ['api', 'products'],
        description: 'Get product by ID',
        validate: { params: productIdParamSchema },
        handler: ProductController.getOne,
      },
    },
    {
      method: 'POST',
      path: '/api/products',
      options: {
        auth: 'jwt',
        tags: ['api', 'products'],
        description: 'Create a new product',
        validate: { payload: createProductSchema },
        handler: ProductController.create,
      },
    },
    {
      method: 'PUT',
      path: '/api/products/{id}',
      options: {
        auth: 'jwt',
        tags: ['api', 'products'],
        description: 'Update product by ID',
        validate: {
          params: productIdParamSchema,
          payload: updateProductSchema,
        },
        handler: ProductController.update,
      },
    },
    {
      method: 'DELETE',
      path: '/api/products/{id}',
      options: {
        auth: 'jwt',
        tags: ['api', 'products'],
        description: 'Delete product by ID',
        validate: { params: productIdParamSchema },
        handler: ProductController.remove,
      },
    },
  ]);
}
