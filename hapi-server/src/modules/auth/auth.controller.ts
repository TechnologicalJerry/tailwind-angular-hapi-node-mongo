import type { Request, ResponseToolkit } from '@hapi/hapi';
import { AuthService } from './auth.service.js';
import { successResponse } from '../../utils/response.js';

const authService = new AuthService();

export const AuthController = {
  async register(request: Request, h: ResponseToolkit) {
    const { name, email, password } = request.payload as {
      name: string;
      email: string;
      password: string;
    };
    const result = await authService.register(name, email, password);
    return successResponse(h, result, 201);
  },

  async login(request: Request, h: ResponseToolkit) {
    const { email, password } = request.payload as {
      email: string;
      password: string;
    };
    const result = await authService.login(email, password);
    return successResponse(h, result);
  },
};
