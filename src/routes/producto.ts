import express from "express";
import {
  createProducto,
  deleteProducto,
  producto,
  productos,
  updateProducto,
} from "../controllers/productoController";
import { autenticacionToken } from "../services/usuario.services";

export const productoRouter = express.Router();

productoRouter.get("/", productos);
productoRouter.get("/:id", producto);
productoRouter.post("/", autenticacionToken, createProducto);
productoRouter.put("/:id", autenticacionToken, updateProducto);
productoRouter.delete("/:id", autenticacionToken, deleteProducto);
