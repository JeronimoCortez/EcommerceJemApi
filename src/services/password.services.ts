import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const verify = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password, userPassword);
};
