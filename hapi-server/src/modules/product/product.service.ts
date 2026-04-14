import Boom from '@hapi/boom';
import { ProductRepository } from './product.repository.js';
import type { IProduct } from './product.model.js';

const productRepo = new ProductRepository();

export class ProductService {
  async getAllProducts(): Promise<IProduct[]> {
    return productRepo.findAll();
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await productRepo.findById(id);
    if (!product) {
      throw Boom.notFound('Product not found');
    }
    return product;
  }

  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    return productRepo.create(data);
  }

  async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct> {
    const updated = await productRepo.updateById(id, data);
    if (!updated) {
      throw Boom.notFound('Product not found');
    }
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    const deleted = await productRepo.deleteById(id);
    if (!deleted) {
      throw Boom.notFound('Product not found');
    }
  }
}
