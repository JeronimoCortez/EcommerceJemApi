import { Request, Response } from "express";
import prisma from "../models/PrismaClient";

export const direcciones = async (req: Request, res: Response) => {
  try {
    const direccionesDb = await prisma.direccion.findMany();
    if (direccionesDb.length === 0) {
      res.status(204).json({ message: "No hay direcciones cargadas en la bd" });
      return;
    }

    res.status(200).json(direccionesDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const direccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const direccionDb = await prisma.direccion.findUnique({
      where: { id: Number(id) },
    });

    if (!direccionDb) {
      res.status(204).json({ message: "No existe una direccion con id: ", id });
      return;
    }

    res.status(200).json(direccionDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const crearDireccion = async (req: Request, res: Response) => {
  const { calle, localidad, cp } = req.body;
  try {
    if (!calle || !localidad || !cp) {
      res.status(400).json({ message: "Debe enviar los campos obligatorios" });
      return;
    }

    const nuevaDireccion = await prisma.direccion.create({
      data: {
        calle: calle,
        localidad: localidad,
        cp: cp,
      },
    });
    res
      .status(201)
      .json({ nuevaDireccion, message: "direccion creada con exito" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateDireccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const direccionActualizado = await prisma.direccion.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    res.status(200).json({
      direccionActualizado,
      message: "direccion actualizada con exito",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteDireccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const direccionEliminada = await prisma.direccion.delete({
      where: { id: Number(id) },
    });
    res
      .status(200)
      .json({ direccionEliminada, message: "direccion eliminada con exito" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
