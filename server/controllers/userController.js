const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body;
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "This email has been registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser(name, email, hashedPassword);
    delete user.password;
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    users.forEach(u => delete u.password);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    delete user.password;
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: err.message });
  }
};

const setAdmin = async (req, res) => {
  try {
    await User.setAdmin(req.params.id);
    res.json({ message: "User promoted to admin successfully" });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: err.message });
  }
};

const removeAdmin = async (req, res) => {
  try {
    await User.removeAdmin(req.params.id);
    res.json({ message: "Admin removed successfully" });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser, getAllUsers, getUser, deleteUser, setAdmin, removeAdmin };