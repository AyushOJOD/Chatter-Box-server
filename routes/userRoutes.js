const express = require("express");
const {
  register,
  setAvatar,
  getAllUsers,
} = require("../controller/userController");
const { login } = require("../controller/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", getAllUsers);

module.exports = router;
