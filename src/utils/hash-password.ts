import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltOrRounds = 10;
  return bcrypt.hash(password, saltOrRounds);
}
