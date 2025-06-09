import express from "express";
import {
  crearDireccion,
  deleteDireccion,
  direccion,
  direcciones,
  direccionesActivas,
  updateDireccion,
} from "../controllers/DireccionController";
import { autenticacionToken } from "../services/usuario.services";

export const direccionRouter = express.Router();

direccionRouter.get("/", direcciones);
direccionRouter.get("/activos", direccionesActivas);
direccionRouter.get("/:id", direccion);
direccionRouter.post("/", autenticacionToken, crearDireccion);
direccionRouter.put("/:id", autenticacionToken, updateDireccion);
direccionRouter.delete("/:id", autenticacionToken, deleteDireccion);
