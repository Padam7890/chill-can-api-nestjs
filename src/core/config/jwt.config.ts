import { registerAs } from '@nestjs/config';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtSignOptions => ({
    secret: process.env.JWT_SECRET || 'default-secret', // Ensure this is set in the .env file
     expiresIn: process.env.JWT_EXPIRE_IN || '1h'
  }),
);
