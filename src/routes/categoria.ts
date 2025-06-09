import express from "express";
import { autenticacionToken } from "../services/usuario.services";
import {
  categoria,
  categorias,
  categoriasActivas,
  createCategoria,
  deleteCategoria,
  updateCategoria,
} from "../controllers/CategoriaControllerts";

export const categoriaRouter = express.Router();

categoriaRouter.get("/", categorias);
categoriaRouter.get("/activos", categoriasActivas);
categoriaRouter.get("/:id", categoria);
categoriaRouter.post("/", autenticacionToken, createCategoria);
categoriaRouter.put("/:id", autenticacionToken, updateCategoria);
categoriaRouter.delete("/:id", autenticacionToken, deleteCategoria);
