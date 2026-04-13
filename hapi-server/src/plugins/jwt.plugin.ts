import Jwt from '@hapi/jwt';
import type { Server } from '@hapi/hapi';
import { env } from '../config/env.js';

export async function registerJwtPlugin(server: Server): Promise<void> {
  await server.register(Jwt);

  server.auth.strategy('jwt', 'jwt', {
    keys: env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400,
      timeSkewSec: 15,
    },
    validate: (artifacts: { decoded: { payload: Record<string, unknown> } }) => {
      return {
        isValid: true,
        credentials: {
          userId: artifacts.decoded.payload['userId'],
          email: artifacts.decoded.payload['email'],
          role: artifacts.decoded.payload['role'],
        },
      };
    },
  });

  server.auth.default('jwt');
}
