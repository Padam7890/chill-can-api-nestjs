// src/core/config/mail.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  MAIL_USER: process.env.EMAIL_USER,
  MAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  MAIL_HOST: process.env.EMAIL_HOST,
  MAIL_PORT: process.env.EMAIL_PORT,
  MAIL_FROM: process.env.EMAIL_FROM,
}));
