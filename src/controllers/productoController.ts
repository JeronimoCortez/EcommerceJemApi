import { Request, Response } from "express";
import prisma from "../models/PrismaClient";
import { Producto } from "@prisma/client";

export const productos = async (req: Request, res: Response): Promise<void> => {
  try {
    const list: Producto[] = await prisma.producto.findMany({
      include: {
        categoria: true,
        productoTalles: true,
        descuentos: true,
        detalles: true,
      },
    });
    if (list.length === 0) {
      res.status(204).json({ message: "No hay productos en la base de datos" });
      return;
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const productosActivos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const list: Producto[] = await prisma.producto.findMany({
      include: {
        categoria: true,
        productoTalles: true,
        descuentos: true,
        detalles: true,
      },
    });
    if (list.length === 0) {
      res.status(204).json({ message: "No hay productos en la base de datos" });
      return;
    }
    const productosFiltrados = list.filter((p) => p.activo === true);
    res.status(200).json(productosFiltrados);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const producto = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const found: Producto | null = await prisma.producto.findUnique({
      where: { id: Number(id) },
      include: {
        categoria: true,
        productoTalles: true,
        descuentos: true,
        detalles: true,
      },
    });
    if (!found) {
      res
        .status(201)
        .json({ message: `No existe un producto con el id ${id}` });
      return;
    }
    res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      nombre,
      precio,
      descripcion,
      color,
      marca,
      categoria,
      descuentoIds = [],
      talles = [],
    } = req.body;
    if (
      !nombre ||
      !precio ||
      !descripcion ||
      !color ||
      !marca ||
      talles.length === 0 ||
      !categoria
    ) {
      res
        .status(204)
        .json({ message: "Debe completar todos los campos requeridos" });
      return;
    }
    const newProd = await prisma.producto.create({
      data: {
        nombre,
        precio,
        descripcion,
        color,
        marca,
        categoria: {
          connect: { id: categoria },
        },
        descuentos: { connect: descuentoIds.map((id: number) => ({ id })) },
        productoTalles: {
          connect: talles.map((id: number) => ({ id })),
        },
      },
    });
    res.status(201).json({ newProd, message: "Producto creado con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

export const updateProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const { productoTalles, descuentoIds, ...rest } = req.body;
    const updated = await prisma.producto.update({
      where: { id: Number(id) },
      data: {
        ...rest,
        productoTalles: productoTalles
          ? { set: productoTalles.map((cid: number) => ({ id: cid })) }
          : undefined,
        descuentos: descuentoIds
          ? { set: descuentoIds.map((did: number) => ({ id: did })) }
          : undefined,
      },
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

export const deleteProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await prisma.producto.update({
      where: { id: Number(id) },
      data: { activo: false },
    });
    res.status(200).json({ deleted, message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};

export const addDiscount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { idProduct, idDiscount } = req.params;
  try {
    const product: Producto | null = await prisma.producto.findUnique({
      where: { id: Number(idProduct) },
      include: { descuentos: true },
    });
    const discount = await prisma.descuento.findUnique({
      where: { id: Number(idDiscount) },
    });
    if (!product) {
      res
        .status(404)
        .json({ message: "No se encontro el producto en la base de datos" });
      return;
    }

    if (!discount) {
      res
        .status(404)
        .json({ message: "No se encontro el descuento en la base de datos" });

      return;
    }
    const productUpdate = await prisma.producto.update({
      where: { id: Number(idProduct) },
      data: {
        descuentos: {
          connect: { id: Number(idDiscount) },
        },
      },
    });
    res.status(200).json({ message: "Descuento agregado con exito" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar descuento" });
  }
};
