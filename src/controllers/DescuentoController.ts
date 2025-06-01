import { Request, Response } from "express";
import prisma from "../models/PrismaClient";

export const descuentos = async (req: Request, res: Response) => {
  try {
    const descuentosDb = await prisma.descuento.findMany();
    if (descuentosDb.length === 0) {
      res.status(204).json({ message: "No hay descuentos cargados en la bd" });
      return;
    }

    res.status(200).json(descuentosDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const descuento = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const descuentoDb = await prisma.descuento.findUnique({
      where: { id: Number(id) },
    });

    if (!descuentoDb) {
      res.status(204).json({ message: "No existe un descuento con id: ", id });
      return;
    }

    res.status(200).json(descuentoDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const crearDescuento = async (req: Request, res: Response) => {
  const { inicio, fin, descuento } = req.body;
  try {
    if (!inicio || !fin || !descuento) {
      res.status(400).json({ message: "Debe enviar los campos obligatorios" });
      return;
    }

    const nuevoDescuento = await prisma.descuento.create({
      data: {
        inicio: new Date(inicio),
        fin: new Date(fin),
        descuento: descuento,
      },
    });
    res
      .status(201)
      .json({ nuevoDescuento, message: "Descuento creado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const updateDescuento = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { inicio, fin, descuento } = req.body;

  try {
    const descuentoActualizado = await prisma.descuento.update({
      where: { id: Number(id) },
      data: {
        ...(inicio && { inicio: new Date(inicio) }),
        ...(fin && { fin: new Date(fin) }),
        ...(descuento && { descuento: Number(descuento) }),
      },
    });

    res.status(200).json({
      descuentoActualizado,
      message: "Descuento actualizado con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const deleteDescuento = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const descuentoEliminado = await prisma.descuento.delete({
      where: { id: Number(id) },
    });
    res
      .status(200)
      .json({ descuentoEliminado, message: "Descuento eliminado con exito" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
