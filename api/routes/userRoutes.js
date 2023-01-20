const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { validateAuth } = require("../middlewares/auth");

// REGISTER (Crear un nuevo usuario)   ---> api/user/register

router.post("/register", userController.register);

//LOGIN (Ingresar)    ---> api/user/login
router.post("/login", userController.login);

//LOGOUT (Desloguearse)    ---> api/user/logout
router.post("/logout", userController.logout);

//PERSISTENCIA   ---> api/user/validate
router.get("/validate", validateAuth, userController.validate);

//VER MI PERFIL   ---> api/user/perfil
router.get("/perfil", validateAuth, userController.perfil);

module.exports = router;
