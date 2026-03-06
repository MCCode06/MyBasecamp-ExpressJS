const express = require("express");
const router = express.Router();
const { signIn, signOut } = require("../controllers/sessionController");

router.post("/", signIn);
router.delete("/", signOut);

module.exports = router;
