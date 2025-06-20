import express from "express";
import { autenticacionToken } from "../services/usuario.services";
import {
  deleteUser,
  login,
  register,
  updateUser,
  usuario,
  usuarios,
  usuariosActivos,
} from "../controllers/UsuarioController";

export const usuarioRouter = express.Router();

usuarioRouter.get("/", usuarios);
usuarioRouter.get("/activos", usuariosActivos);
usuarioRouter.get("/:id", usuario);
usuarioRouter.post("/", register);
usuarioRouter.post("/login", login);
usuarioRouter.put("/:id", autenticacionToken, updateUser);
usuarioRouter.delete("/:id", autenticacionToken, deleteUser);
