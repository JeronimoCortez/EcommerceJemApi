import express from "express";
import { autenticacionToken } from "../services/usuario.services";
import {
  crearDescuento,
  deleteDescuento,
  descuento,
  descuentos,
  descuentosFiltrados,
  updateDescuento,
} from "../controllers/DescuentoController";

export const descuentoRouter = express.Router();

descuentoRouter.get("/", descuentos);
descuentoRouter.get("/activos", descuentosFiltrados);
descuentoRouter.get("/:id", descuento);
descuentoRouter.post("/", autenticacionToken, crearDescuento);
descuentoRouter.put("/:id", autenticacionToken, updateDescuento);
descuentoRouter.delete("/:id", autenticacionToken, deleteDescuento);
