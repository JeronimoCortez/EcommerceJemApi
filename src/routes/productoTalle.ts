import express from "express";
import {
  createTalle,
  deleteTalle,
  talle,
  talles,
  updateTalle,
} from "../controllers/productoTalleController";

export const productoTalleRouter = express.Router();

productoTalleRouter.get("/", talles);
productoTalleRouter.get("/:id", talle);
productoTalleRouter.post("/", createTalle);
productoTalleRouter.put("/:id", updateTalle);
productoTalleRouter.delete("/:id", deleteTalle);
