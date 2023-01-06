const express = require("express");
const User = require("../models/User");
const { generateToken } = require("../config/tokens");

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({
    where: { email },
  }).then((user) => {
    if (!user)
      return res.status(404).send({
        message: `No existe ningun usuario con el siguiente mail: ${email}`,
      });

    user.validatePassword(password).then((isValid) => {
      if (!isValid)
        return res.status(401).send({ message: `La contraseña es incorrecta` });
      else {
        const payload = {
          id: user.id,
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
}

function logout(req, res, next) {
  res.clearCookie("token");

  res.sendStatus(204);
}

module.exports = { login, logout };
