const { body } = require('express-validator');

const registerValidation = [
  body("name")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches("[0-9]")
    .withMessage("Password must contain a number")
    .matches("[a-z]")
    .withMessage("Password must contain a letter"),
];

module.exports = { registerValidation };