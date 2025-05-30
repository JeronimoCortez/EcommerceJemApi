import { Request, Response } from 'express';
import { OrdenCompra } from '../models/OrdenCompra.interface';
import prisma from '../models/OrdenCompra';

export const ordenes = async (req: Request, res: Response): Promise<void> => {
  try {
    const all: OrdenCompra[] = await prisma.ordenCompra.findMany();
    if (all.length === 0) {
      res.status(204).json({ message: 'No hay órdenes de compra en la base de datos' });
      return;
    }
    res.status(200).json(all);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const orden = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const found: OrdenCompra | null = await prisma.ordenCompra.findUnique({
      where: { id: Number(id) },
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

export const createOrden = async (req: Request, res: Response): Promise<void> => {
  try {
    const { usuarioId, fecha, precioTotal, metodoPago, estado } = req.body;
    if (!usuarioId || !fecha || !precioTotal || !metodoPago) {
      res.status(204).json({ message: 'Debe completar todos los campos requeridos' });
      return;
    }
    const newOrden = await prisma.ordenCompra.create({
      data: {
        usuarioId,
        fecha: new Date(fecha),
        precioTotal,
        metodoPago,
        estado,
      },
    });
    res.status(201).json({ newOrden, message: 'Orden de compra creada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la orden', error });
  }
};

export const updateOrden = async (req: Request, res: Response): Promise<void> => {
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
    res.status(500).json({ message: 'Error al actualizar la orden', error });
  }
};

export const deleteOrden = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await prisma.ordenCompra.delete({ where: { id: Number(id) } });
    res.status(200).json({ deleted, message: 'Orden eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la orden', error });
  }
};
