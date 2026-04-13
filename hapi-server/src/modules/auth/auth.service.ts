import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom';
import { UserRepository } from '../user/user.repository.js';
import { env } from '../../config/env.js';
import type { IUser } from '../user/user.model.js';

const userRepo = new UserRepository();

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: string;
}

export interface AuthResult {
  token: string;
  user: Omit<IUser, 'password'>;
}

export class AuthService {
  async register(name: string, email: string, password: string): Promise<AuthResult> {
    const exists = await userRepo.existsByEmail(email);
    if (exists) {
      throw Boom.conflict('Email already registered');
    }

    const hashed = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
    const user = await userRepo.create({ name, email, password: hashed, role: 'user' });
    const token = this.signToken(user);

    return { token, user: this.sanitize(user) };
  }

  async login(email: string, password: string): Promise<AuthResult> {
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw Boom.unauthorized('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw Boom.unauthorized('Invalid credentials');
    }

    const token = this.signToken(user);
    return { token, user: this.sanitize(user) };
  }

  private signToken(user: IUser): string {
    const payload: AuthTokenPayload = {
      userId: String(user._id),
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRATION } as jwt.SignOptions);
  }

  private sanitize(user: IUser): Omit<IUser, 'password'> {
    const { password: _pw, ...rest } = user.toObject ? user.toObject() : user;
    return rest as Omit<IUser, 'password'>;
  }
}
