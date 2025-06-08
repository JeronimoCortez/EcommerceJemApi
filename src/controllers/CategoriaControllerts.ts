import { Request, Response } from "express";
import prisma from "../models/PrismaClient";

export const categorias = async (req: Request, res: Response) => {
  try {
    const categoriasDb = await prisma.categoria.findMany({
      include: {
        productos: true,
      },
    });

    if (categoriasDb.length === 0) {
      res
        .status(204)
        .json({ message: "No hay categorias en la base de datos" });
      return;
    }

    res.status(200).json(categoriasDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const categoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoriaDb = await prisma.categoria.findUnique({
      where: { id: Number(id) },
      include: {
        productos: true,
      },
    });

    if (!categoriaDb) {
      res.status(204).json({ message: "No hay categorias con id: ", id });
      return;
    }

    res.status(200).json(categoriaDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createCategoria = async (req: Request, res: Response) => {
  const { nombre, tipoId } = req.body;
  try {
    if (!nombre || !tipoId) {
      res.status(400).json({ message: "Debe enviar los campos obligatorios" });
      return;
    }

    const nuevaCategoria = await prisma.categoria.create({
      data: {
        nombre: nombre,
        tipoId: tipoId,
      },
    });

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const categoriaActualizada = await prisma.categoria.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    res.status(200).json(categoriaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoriaEliminada = await prisma.categoria.update({
      where: { id: Number(id) },
      data: { activo: false },
    });

    res
      .status(200)
      .json({ categoriaEliminada, message: "Categoria eliminada con exito" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
