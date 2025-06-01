import express from "express";
import {
  crearDetalle,
  deleteDetalle,
  detalle,
  detalles,
  updateDetalle,
} from "../controllers/DetalleController";

export const detalleRouter = express.Router();

detalleRouter.get("/", detalles);
detalleRouter.get("/:id", detalle);
detalleRouter.post("/", crearDetalle);
detalleRouter.put("/:id", updateDetalle);
detalleRouter.delete("/:id", deleteDetalle);
