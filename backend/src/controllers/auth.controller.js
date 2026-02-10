import prisma from '../service/prisma.client.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Env } from '../constants/env.js';

const expiresIn = '168h';
// Signup (registro)
export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, Env.JWT_SECRET, {
      expiresIn,
    });

    res.status(201).json({ user: { id: newUser.id, name: newUser.name }, token });
  } catch (err) {
    res.status(400).json({ error: 'Error al registrar usuario', details: err.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Comparar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Credenciales inválidas' });

    // Generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, Env.JWT_SECRET, {
      expiresIn,
    });

    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ error: 'Error en login', details: err.message });
  }
};

export const verify = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      success: true,
      user,
      message: 'Token válido',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error al verificar token',
      details: err.message,
    });
  }
};
