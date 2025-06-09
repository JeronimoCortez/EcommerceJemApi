import { Request, Response } from "express";
import prisma from "../models/PrismaClient";
import { hashPassword, verify } from "../services/password.services";
import { generatedToken } from "../services/auth.services";

export const usuarios = async (req: Request, res: Response) => {
  try {
    const usuariosDb = await prisma.usuario.findMany({
      include: {
        ordenes: true,
      },
    });
    if (usuariosDb.length === 0) {
      res.status(204).json({ message: "No hay usuarios en la base de datos" });
      return;
    }

    res.status(200).json(usuariosDb);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const usuariosActivos = async (req: Request, res: Response) => {
  try {
    const usuariosDb = await prisma.usuario.findMany({
      include: {
        ordenes: true,
      },
    });
    if (usuariosDb.length === 0) {
      res.status(204).json({ message: "No hay usuarios en la base de datos" });
      return;
    }

    const usuariosFiltrados = usuariosDb.filter((u) => u.activo === true);

    res.status(200).json(usuariosFiltrados);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const usuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: {
        ordenes: true,
      },
    });

    if (!usuario) {
      res.status(204).json({ message: "No existe el usuario con id: ", id });
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const register = async (req: Request, res: Response) => {
  const { nombre, email, password, passwordRepeat } = req.body;

  try {
    if (!nombre || !email || !password || !passwordRepeat) {
      res.status(400).json({ message: "Debe enviar todos los datos" });
      return;
    }

    if (password !== passwordRepeat) {
      res.status(400).json({ message: "Las contraseñas son distintas" });
      return;
    }

    const existEmail = await prisma.usuario.findUnique({
      where: { email: email },
    });

    if (existEmail) {
      res.status(400).json({ message: "Ya existe un usuario con ese email" });
      return;
    }

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: nombre,
        password: await hashPassword(password),
        email: email,
      },
    });

    const token = generatedToken(nuevoUsuario);

    res
      .status(201)
      .json({ nuevoUsuario, message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "Debe ingresar usuario y contraseña" });
      return;
    }

    const userData = await prisma.usuario.findUnique({
      where: { email: email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "No hay un usuario registrado con ese email" });
      return;
    }

    const passwordCorrect = await verify(password, userData.password);

    if (!passwordCorrect) {
      res.status(401).json({ message: "La contraseña nno es correcta" });
      return;
    }

    const token = generatedToken(userData);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: datosActualizados,
    });

    res.status(200).json({
      usuarioActualizado,
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuarioEliminado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { activo: false },
    });

    res.status(200).json({
      usuarioEliminado,
      message: "Se elimino el usuario de la base de datos",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
