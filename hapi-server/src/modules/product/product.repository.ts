import { ProductModel, type IProduct } from './product.model.js';
import type { UpdateQuery } from 'mongoose';

export class ProductRepository {
  async findAll(): Promise<IProduct[]> {
    return ProductModel.find().lean().exec() as unknown as Promise<IProduct[]>;
  }

  async findById(id: string): Promise<IProduct | null> {
    return ProductModel.findById(id).lean().exec() as unknown as Promise<IProduct | null>;
  }

  async create(data: Partial<IProduct>): Promise<IProduct> {
    const product = new ProductModel(data);
    return product.save() as Promise<IProduct>;
  }

  async updateById(id: string, data: UpdateQuery<IProduct>): Promise<IProduct | null> {
    return ProductModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .lean()
      .exec() as unknown as Promise<IProduct | null>;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
