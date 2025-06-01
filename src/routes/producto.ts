import express from "express";
import {
  createProducto,
  deleteProducto,
  producto,
  productos,
  updateProducto,
} from "../controllers/productoController";

export const productoRouter = express.Router();

productoRouter.get("/", productos);
productoRouter.get("/:id", producto);
productoRouter.post("/", createProducto);
productoRouter.put("/:id", updateProducto);
productoRouter.delete("/:id", deleteProducto);
