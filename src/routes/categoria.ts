import express from "express";
import { autenticacionToken } from "../services/usuario.services";
import {
  categoria,
  categorias,
  createCategoria,
  deleteCategoria,
  updateCategoria,
} from "../controllers/CategoriaControllerts";

export const categoriaRouter = express.Router();

categoriaRouter.get("/", categorias);
categoriaRouter.get("/:id", categoria);
categoriaRouter.post("/", autenticacionToken, createCategoria);
categoriaRouter.put("/:id", autenticacionToken, updateCategoria);
categoriaRouter.delete("/:id", autenticacionToken, deleteCategoria);
