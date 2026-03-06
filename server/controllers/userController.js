const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
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

// GET /users/:id
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

// DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteUser(req.params.id);
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /users/:id/admin
const setAdmin = async (req, res) => {
  try {
    const user = await User.setAdmin(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User promoted to admin user successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /users/:id/removeadmin
const removeAdmin = async (req, res) => {
  try {
    const user = await User.removeAdmin(req.params.id);
    if (user == nil) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "Admin user degraded to user successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser, getUser, deleteUser, setAdmin, removeAdmin };
