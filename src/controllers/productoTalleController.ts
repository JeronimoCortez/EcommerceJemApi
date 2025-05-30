import { Request, Response } from 'express';
import { ProductoTalle } from '../models/ProductoTalle.interface';
import prisma from '../models/ProductoTalle';

export const talles = async (_: Request, res: Response): Promise<void> => {
  try {
    const list: ProductoTalle[] = await prisma.productoTalle.findMany();
    if (list.length === 0) {
      res.status(204).json({ message: 'No hay talles en la base de datos' });
      return;
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const talle = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const found: ProductoTalle | null = await prisma.productoTalle.findUnique({
      where: { id: Number(id) },
    });
    if (!found) {
      res.status(201).json({ message: `No existe un talle con el id ${id}` });
      return;
    }
    res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createTalle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productoId, talle, stock } = req.body;
    if (!productoId || !talle || stock === undefined) {
      res.status(204).json({ message: 'Debe completar todos los campos requeridos' });
      return;
    }
    const newTalle = await prisma.productoTalle.create({ data: { productoId, talle, stock } });
    res.status(201).json({ newTalle, message: 'Talle creado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el talle', error });
  }
};

export const updateTalle = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updated = await prisma.productoTalle.update({ where: { id: Number(id) }, data: req.body });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el talle', error });
  }
};

export const deleteTalle = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await prisma.productoTalle.delete({ where: { id: Number(id) } });
    res.status(200).json({ deleted, message: 'Talle eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el talle', error });
  }
};
