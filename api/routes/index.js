const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken } = require("../config/tokens");

router.post("/newuser", (req, res, next) => {
  User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => res.status(500).send(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    where: { email },
  }).then((user) => {
    if (!user)
      return res
        .status(404)
        .send(alert(`No existe ningun usuario con este ${email}`));

    user.validatePassword(password).then((isValid) => {
      if (!isValid)
        return res.status(401).send(alert("La contraseña no es válida"));
      else {
        const payload = {
          email: user.email,
          name: user.name,
          lastName: user.lastName,
        };
        const token = generateToken(payload);

        res.cookie("token", token);
        res.send(payload);
      }
    });
  });
});

module.exports = router;
