import { Request, Response } from "express";
import prisma from "../models/PrismaClient";
import { connect } from "http2";

export const detalles = async (req: Request, res: Response) => {
  try {
    const detallesDb = await prisma.detalle.findMany();
    if (detallesDb.length === 0) {
      res.status(204).json({ message: "No hay detalles cargados en la bd" });
      return;
    }

    res.status(200).json(detallesDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const detalle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const detalleDb = await prisma.detalle.findUnique({
      where: { id: Number(id) },
    });

    if (!detalleDb) {
      res.status(204).json({ message: "No existe un detalle con id: ", id });
      return;
    }

    res.status(200).json(detalleDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const crearDetalle = async (req: Request, res: Response) => {
  const { cantidad, productoId, ordenCompraId } = req.body;
  try {
    if (!cantidad || !productoId) {
      res.status(400).json({ message: "Debe enviar los campos obligatorios" });
      return;
    }
    const nuevodetalle = await prisma.detalle.create({
      data: {
        cantidad: cantidad,
        producto: {
          connect: { id: productoId },
        },
        orden: ordenCompraId
          ? { connect: { id: Number(ordenCompraId) } }
          : undefined,
      },
    });
    res.status(201).json({ nuevodetalle, message: "detalle creado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const updateDetalle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const detalleActualizado = await prisma.detalle.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    res.status(200).json({
      detalleActualizado,
      message: "detalle actualizado con exito",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteDetalle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const detalleEliminado = await prisma.detalle.update({
      where: { id: Number(id) },
      data: { activo: false },
    });
    res
      .status(200)
      .json({ detalleEliminado, message: "detalle eliminado con exito" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
