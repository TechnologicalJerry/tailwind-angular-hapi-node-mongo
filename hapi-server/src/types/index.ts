import type { Request } from '@hapi/hapi';

export interface AuthCredentials {
  userId: string;
  email: string;
  role: string;
}

// Use this type annotation when you need to access auth credentials in handlers
export type AuthenticatedRequest = Request & {
  auth: Request['auth'] & {
    credentials: AuthCredentials;
  };
};

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
