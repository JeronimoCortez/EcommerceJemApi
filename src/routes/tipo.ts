import express from "express";
import {
  createTipo,
  deleteTipo,
  tipo,
  tipos,
  tiposActivos,
  updateTipo,
} from "../controllers/TipoController";
import { autenticacionToken } from "../services/usuario.services";

export const tipoRouter = express.Router();

tipoRouter.get("/", tipos);
tipoRouter.get("/activos", tiposActivos);
tipoRouter.get("/:id", tipo);
tipoRouter.post("/", autenticacionToken, createTipo);
tipoRouter.put("/:id", autenticacionToken, updateTipo);
tipoRouter.delete("/:id", autenticacionToken, deleteTipo);
