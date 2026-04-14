import type { Request, ResponseToolkit } from '@hapi/hapi';
import { ProductService } from './product.service.js';
import { successResponse } from '../../utils/response.js';

const productService = new ProductService();

export const ProductController = {
  async getAll(_request: Request, h: ResponseToolkit) {
    const products = await productService.getAllProducts();
    return successResponse(h, products);
  },

  async getOne(request: Request, h: ResponseToolkit) {
    const { id } = request.params as { id: string };
    const product = await productService.getProductById(id);
    return successResponse(h, product);
  },

  async create(request: Request, h: ResponseToolkit) {
    const payload = request.payload as Record<string, unknown>;
    const product = await productService.createProduct(payload);
    return successResponse(h, product, 201);
  },

  async update(request: Request, h: ResponseToolkit) {
    const { id } = request.params as { id: string };
    const payload = request.payload as Record<string, unknown>;
    const product = await productService.updateProduct(id, payload);
    return successResponse(h, product);
  },

  async remove(request: Request, h: ResponseToolkit) {
    const { id } = request.params as { id: string };
    await productService.deleteProduct(id);
    return successResponse(h, null, 204);
  },
};
