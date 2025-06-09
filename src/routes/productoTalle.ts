import express from "express";
import {
  createTalle,
  deleteTalle,
  talle,
  talles,
  tallesActivos,
  updateTalle,
} from "../controllers/productoTalleController";
import { autenticacionToken } from "../services/usuario.services";

export const productoTalleRouter = express.Router();

productoTalleRouter.get("/", talles);
productoTalleRouter.get("/activos", tallesActivos);
productoTalleRouter.get("/:id", talle);
productoTalleRouter.post("/", autenticacionToken, createTalle);
productoTalleRouter.put("/:id", autenticacionToken, updateTalle);
productoTalleRouter.delete("/:id", autenticacionToken, deleteTalle);
