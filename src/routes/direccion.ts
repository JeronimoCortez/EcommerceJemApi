import express from "express";
import {
  crearDireccion,
  deleteDireccion,
  direccion,
  direcciones,
  updateDireccion,
} from "../controllers/DireccionController";

export const direccionRouter = express.Router();

direccionRouter.get("/", direcciones);
direccionRouter.get("/:id", direccion);
direccionRouter.post("/", crearDireccion);
direccionRouter.put("/:id", updateDireccion);
direccionRouter.delete("/:id", deleteDireccion);
