const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const renderIndex = (req, res) => res.render("index");

const renderRegister = (req, res) => res.render("register", { errors: [], message: "" });

const handleRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("register", { errors: errors.array(), message: "" });
  }
  try {
    const { name, email, password } = req.body;
    const existing = await User.findUserByEmail(email);
    if (existing) {
      return res.render("register", { errors: [{ msg: "Email has already been registered." }], message: "" });
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.createUser(name, email, hashed);
    res.render("register", { errors: [], message: "Account created successfully." });
  } catch (err) {
    res.status(500).render("register", { errors: [{ msg: err.message }], message: "" });
  }
};

const renderLogin = (req, res) => res.render("login", { errors: [], message: "" });

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render("login", { errors: [{ msg: "Invalid credentials" }], message: "" });
  }
  req.session.user = user;
  res.redirect("/projects");
};

const renderProjects = (req, res) => {
  res.render("projects", { user: req.session.user });
};

const renderAdmin = (req, res) => {
  res.render("admin", { user: req.session.user });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

module.exports = {
  renderIndex,
  renderRegister,
  handleRegister,
  renderLogin,
  handleLogin,
  renderProjects,
  renderAdmin,
  logout
};