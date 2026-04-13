import Boom from '@hapi/boom';
import { UserRepository } from './user.repository.js';
import type { IUser } from './user.model.js';

const userRepo = new UserRepository();

export class UserService {
  async getAllUsers(): Promise<IUser[]> {
    return userRepo.findAll();
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await userRepo.findById(id);
    if (!user) {
      throw Boom.notFound('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser> {
    if (data.email) {
      const existing = await userRepo.findByEmail(data.email);
      if (existing && String(existing._id) !== id) {
        throw Boom.conflict('Email already in use');
      }
    }

    const updated = await userRepo.updateById(id, data);
    if (!updated) {
      throw Boom.notFound('User not found');
    }
    return updated;
  }

  async deleteUser(id: string): Promise<void> {
    const deleted = await userRepo.deleteById(id);
    if (!deleted) {
      throw Boom.notFound('User not found');
    }
  }
}
