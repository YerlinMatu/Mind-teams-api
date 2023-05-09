import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: 'ItIsNoLogerAsecret',
  expiresIn: '1h',
}));
