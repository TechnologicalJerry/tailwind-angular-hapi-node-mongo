import type { Request, ResponseToolkit } from '@hapi/hapi';
import { UserService } from './user.service.js';
import { successResponse } from '../../utils/response.js';

const userService = new UserService();

export const UserController = {
  async getAll(request: Request, h: ResponseToolkit) {
    const users = await userService.getAllUsers();
    return successResponse(h, users);
  },

  async getOne(request: Request, h: ResponseToolkit) {
    const { id } = request.params as { id: string };
    const user = await userService.getUserById(id);
    return successResponse(h, user);
  },

  async update(request: Request, h: ResponseToolkit) {
    const { id } = request.params as { id: string };
    const payload = request.payload as Record<string, unknown>;
    const user = await userService.updateUser(id, payload);
    return successResponse(h, user);
  },

  async remove(request: Request, h: ResponseToolkit) {
    const { id } = request.params as { id: string };
    await userService.deleteUser(id);
    return successResponse(h, null, 204);
  },
};
