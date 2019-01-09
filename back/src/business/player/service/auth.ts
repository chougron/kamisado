import bcrypt from 'bcrypt';

const saltRounds = 10;

export function hashPassword(clearPassword: string): Promise<string> {
  return bcrypt.hash(clearPassword, saltRounds);
}

export function comparePassword(clearPassword: string, hash: string): Promise<boolean> {
  return bcrypt.compare(clearPassword, hash);
}
