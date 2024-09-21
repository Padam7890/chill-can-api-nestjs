import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refresh_jwt',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_JWT_SECRET || 'default-refresh-secret',  // Default fallback
    expiresIn: process.env.REFRESH_JWT_EXPIRE_IN || '7d',                // Default fallback to 7 days
  }),
);
