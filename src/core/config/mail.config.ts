
//mail config
import { registerAs } from "@nestjs/config";

export default registerAs('mail', () => ({
  MAIL_HOST: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  MAIL_PORT: parseInt(process.env.EMAIL_PORT, 10) || 587,
  MAIL_USER: process.env.EMAIL_USER,
  MAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  MAIL_FROM: process.env.EMAIL_FROM || '"No Reply" <noreply@example.com>',
}));
