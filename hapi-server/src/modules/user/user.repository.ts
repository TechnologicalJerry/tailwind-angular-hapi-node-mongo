import { UserModel, type IUser } from './user.model.js';
import type { FilterQuery, UpdateQuery } from 'mongoose';

export class UserRepository {
  async findAll(): Promise<IUser[]> {
    return UserModel.find().select('-password').lean().exec() as unknown as Promise<IUser[]>;
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).select('-password').lean().exec() as unknown as Promise<IUser | null>;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email } as FilterQuery<IUser>)
      .select('+password')
      .lean()
      .exec() as unknown as Promise<IUser | null>;
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(data);
    return user.save() as Promise<IUser>;
  }

  async updateById(id: string, data: UpdateQuery<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .select('-password')
      .lean()
      .exec() as unknown as Promise<IUser | null>;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await UserModel.countDocuments({ email } as FilterQuery<IUser>);
    return count > 0;
  }
}
