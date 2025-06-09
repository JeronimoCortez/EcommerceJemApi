import express from "express";
import {
  addDiscount,
  createProducto,
  deleteProducto,
  producto,
  productos,
  productosActivos,
  updateProducto,
} from "../controllers/productoController";
import { autenticacionToken } from "../services/usuario.services";

export const productoRouter = express.Router();

productoRouter.get("/", productos);
productoRouter.get("/activos", productosActivos);
productoRouter.get("/:id", producto);
productoRouter.post("/", autenticacionToken, createProducto);
productoRouter.put("/:id", autenticacionToken, updateProducto);
productoRouter.delete("/:id", autenticacionToken, deleteProducto);
productoRouter.patch("/:idProduct/addDiscount/:idDiscount", addDiscount);
