import express from "express";
import {
  crearDetalle,
  deleteDetalle,
  detalle,
  detalles,
  detallesFiltrados,
  updateDetalle,
} from "../controllers/DetalleController";
import { autenticacionToken } from "../services/usuario.services";

export const detalleRouter = express.Router();

detalleRouter.get("/", detalles);
detalleRouter.get("/activos", detallesFiltrados);
detalleRouter.get("/:id", detalle);
detalleRouter.post("/", autenticacionToken, crearDetalle);
detalleRouter.put("/:id", autenticacionToken, updateDetalle);
detalleRouter.delete("/:id", autenticacionToken, deleteDetalle);
