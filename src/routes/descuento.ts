import express from "express";
import {
  crearDescuento,
  deleteDescuento,
  descuento,
  descuentos,
  updateDescuento,
} from "../controllers/DescuentoController";

export const descuentoRouter = express.Router();

descuentoRouter.get("/", descuentos);
descuentoRouter.get("/:id", descuento);
descuentoRouter.post("/", crearDescuento);
descuentoRouter.put("/:id", updateDescuento);
descuentoRouter.delete("/:id", deleteDescuento);
