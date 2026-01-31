import prisma from '../service/prisma.client.js';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = (await prisma.user.findMany()).map(({ id, name, email }) => ({
      id,
      name,
      email,
    }));
    res.json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// Crear un usuario
export const createUser = async (req, res) => {
  const { email: _email, name: _name, password: _password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(_password, 10);

    const { id, name, email } = await prisma.user.create({
      data: { email: _email, name: _name, password: hashedPassword },
    });

    res.status(201).json({ id, name, email });
  } catch (err) {
    res.status(400).json({ error: 'Error al crear usuario', details: err.message });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    let data = { email, name };

    // Si viene una nueva contraseña, la ciframos
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id, 10) },
      data,
    });

    res.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email });
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar usuario', details: err.message });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id, 10) },
    });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(400).json({ err });
  }
};
