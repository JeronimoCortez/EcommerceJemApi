import jwt from "jsonwebtoken";
import { Usuario } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const generatedToken = (usuario: Usuario) => {
  if (!JWT_SECRET) {
    return;
  }

  return jwt.sign(usuario, JWT_SECRET, { expiresIn: "1h" });
};
