import express from "express";
import {
  createOrden,
  deleteOrden,
  orden,
  ordenes,
  ordenesActivas,
  updateOrden,
} from "../controllers/ordenCompraController";
import { autenticacionToken } from "../services/usuario.services";

export const ordenCompraRouter = express.Router();

ordenCompraRouter.get("/", ordenes);
ordenCompraRouter.get("/activos", ordenesActivas);
ordenCompraRouter.get("/:id", orden);
ordenCompraRouter.post("/", autenticacionToken, createOrden);
ordenCompraRouter.put("/:id", autenticacionToken, updateOrden);
ordenCompraRouter.delete("/:id", autenticacionToken, deleteOrden);
