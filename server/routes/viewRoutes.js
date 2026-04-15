const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const { registerValidation } = require("../middleware/validators");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", viewController.renderIndex);
router.get("/register", viewController.renderRegister);
router.post("/register", registerValidation, viewController.handleRegister);
router.get("/login", viewController.renderLogin);
router.post("/login", viewController.handleLogin);
router.get("/logout", viewController.logout);

router.get("/projects", auth, viewController.renderProjects);
router.get("/admin", auth, admin, viewController.renderAdmin);

module.exports = router;