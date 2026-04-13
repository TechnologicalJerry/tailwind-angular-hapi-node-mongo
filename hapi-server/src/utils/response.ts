import type { ResponseToolkit } from '@hapi/hapi';
import type Boom from '@hapi/boom';

export function successResponse<T>(
  h: ResponseToolkit,
  data: T,
  statusCode = 200,
) {
  return h.response({ success: true, data }).code(statusCode);
}

export function errorResponse(
  h: ResponseToolkit,
  message: string,
  statusCode = 500,
) {
  return h.response({ success: false, message }).code(statusCode);
}

export function isBoom(err: unknown): err is Boom.Boom {
  return (err as Boom.Boom)?.isBoom === true;
}
