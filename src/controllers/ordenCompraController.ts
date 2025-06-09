import { Request, Response } from "express";
import prisma from "../models/PrismaClient";
import { OrdenCompra } from "@prisma/client";

export const ordenes = async (req: Request, res: Response): Promise<void> => {
  try {
    const all: OrdenCompra[] = await prisma.ordenCompra.findMany({
      include: {
        detalles: true,
      },
    });
    if (all.length === 0) {
      res
        .status(204)
        .json({ message: "No hay órdenes de compra en la base de datos" });
      return;
    }
    res.status(200).json(all);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const ordenesActivas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const all: OrdenCompra[] = await prisma.ordenCompra.findMany({
      include: {
        detalles: true,
      },
    });
    if (all.length === 0) {
      res
        .status(204)
        .json({ message: "No hay órdenes de compra en la base de datos" });
      return;
    }
    const ordenesFiltradas = all.filter((o) => o.activo == true);
    res.status(200).json(ordenesFiltradas);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const orden = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const found: OrdenCompra | null = await prisma.ordenCompra.findUnique({
      where: { id: Number(id) },
      include: {
        detalles: true,
      },
    });
    if (!found) {
      res.status(201).json({ message: `No existe una orden con el id ${id}` });
      return;
    }
    res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createOrden = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { usuarioId, fecha, precioTotal, metodoPago, estado, detallesIds } =
      req.body;
    if (
      !usuarioId ||
      !fecha ||
      !precioTotal ||
      !metodoPago ||
      detallesIds.length === 0
    ) {
      res
        .status(204)
        .json({ message: "Debe completar todos los campos requeridos" });
      return;
    }

    const detalles = await prisma.detalle.findMany({
      where: { id: { in: detallesIds } },
      include: { producto: { select: { precio: true } } },
    });

    if (detalles.length !== detallesIds.length) {
      res.status(400).json({ message: "Algunos detalles no existen" });
      return;
    }

    const total = detalles.reduce(
      (total, detalle) => total + detalle.cantidad * detalle.producto.precio,
      0
    );

    const newOrden = await prisma.ordenCompra.create({
      data: {
        usuarioId,
        fecha: new Date(fecha),
        precioTotal: total,
        metodoPago,
        estado,
        detalles: {
          connect: detallesIds.map((id: number) => ({ id })),
        },
      },
    });
    res
      .status(201)
      .json({ newOrden, message: "Orden de compra creada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la orden", error });
  }
};

export const updateOrden = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedData = req.body;
    if (updatedData.fecha) updatedData.fecha = new Date(updatedData.fecha);
    const updated = await prisma.ordenCompra.update({
      where: { id: Number(id) },
      data: updatedData,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la orden", error });
  }
};

export const deleteOrden = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await prisma.ordenCompra.update({
      where: { id: Number(id) },
      data: { activo: false },
    });
    res.status(200).json({ deleted, message: "Orden eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la orden", error });
  }
};
