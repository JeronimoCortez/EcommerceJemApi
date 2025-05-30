import { Request, Response } from 'express';
import { Producto } from '../models/Producto.interface';
import prisma from '../models/Producto';

export const productos = async (req: Request, res: Response): Promise<void> => {
  try {
    const list: Producto[] = await prisma.producto.findMany();
    if (list.length === 0) {
      res.status(204).json({ message: 'No hay productos en la base de datos' });
      return;
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const producto = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const found: Producto | null = await prisma.producto.findUnique({
      where: { id: Number(id) },
    });
    if (!found) {
      res.status(201).json({ message: `No existe un producto con el id ${id}` });
      return;
    }
    res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createProducto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, precio, descripcion, color, marca, categoriaIds = [], descuentoIds = [] } = req.body;
    if (!nombre || !precio || !descripcion || !color || !marca) {
      res.status(204).json({ message: 'Debe completar todos los campos requeridos' });
      return;
    }
    const newProd = await prisma.producto.create({
      data: {
        nombre,
        precio,
        descripcion,
        color,
        marca,
        categorias: { connect: categoriaIds.map((id: number) => ({ id })) },
        descuentos: { connect: descuentoIds.map((id: number) => ({ id })) },
      },
    });
    res.status(201).json({ newProd, message: 'Producto creado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};

export const updateProducto = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const { categoriaIds, descuentoIds, ...rest } = req.body;
    const updated = await prisma.producto.update({
      where: { id: Number(id) },
      data: {
        ...rest,
        categorias: categoriaIds ? { set: categoriaIds.map((cid: number) => ({ id: cid })) } : undefined,
        descuentos: descuentoIds ? { set: descuentoIds.map((did: number) => ({ id: did })) } : undefined,
      },
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

export const deleteProducto = async (req: Request, res: Response):Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await prisma.producto.delete({ where: { id: Number(id) } });
    res.status(200).json({ deleted, message: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};
