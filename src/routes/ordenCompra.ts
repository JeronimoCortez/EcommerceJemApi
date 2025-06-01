import express from "express";
import {
  createOrden,
  deleteOrden,
  orden,
  ordenes,
  updateOrden,
} from "../controllers/ordenCompraController";

export const ordenCompraRouter = express.Router();

ordenCompraRouter.get("/", ordenes);
ordenCompraRouter.get("/:id", orden);
ordenCompraRouter.post("/", createOrden);
ordenCompraRouter.put("/:id", updateOrden);
ordenCompraRouter.delete("/:id", deleteOrden);
