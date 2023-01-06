const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { validateAuth } = require("../middlewares/auth");
const { register } = require("./register");
const { login, logout } = require("./login");
const favs = require("./favs");

router.post("/newuser", register);
router.post("/login", login);
router.use("/misfavs", favs);

// router.get("/misfavs", validateAuth, (req, res) => {
//   res.send(req.user);
// });
router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.post("/logout", logout);

module.exports = router;
