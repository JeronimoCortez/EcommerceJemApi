import { Tipo } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../models/PrismaClient";

export const tipos = async (req: Request, res: Response): Promise<void> => {
  try {
    const tiposDb: Tipo[] = await prisma.tipo.findMany();

    if (tiposDb.length === 0) {
      res
        .status(204)
        .json({ message: "La tabla tipo esta vacia en la base de datos" });
      return;
    }

    res.status(200).json(tiposDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const tipo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const tipoDb: Tipo | null = await prisma.tipo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!tipoDb) {
      res.status(204).json({ message: "No hay un tipo con ese id en la BD" });
      return;
    }
    res.status(200).json(tipoDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createTipo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nombre } = req.body;
  try {
    if (!nombre) {
      res.status(400).json({ message: "Debe ingresar el nombre del tipo" });
      return;
    }

    const nuevoTipo = await prisma.tipo.create({
      data: {
        nombre: nombre,
      },
    });

    res.status(201).json({ nuevoTipo, message: "Tipo creado con exito" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateTipo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const datosActualizados = req.body;

  try {
    const tipoActualizado = await prisma.tipo.update({
      where: { id: Number(id) },
      data: datosActualizados,
    });

    res
      .status(200)
      .json({ tipoActualizado, message: "El tipo se actualizo correctamente" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteTipo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const tipoEliminado = await prisma.tipo.delete({
      where: { id: Number(id) },
    });

    res
      .status(200)
      .json({ tipoEliminado, message: "El tipo se elimino correctamente" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
