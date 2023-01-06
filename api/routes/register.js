const User = require("../models/User");

function register(req, res, next) {
  User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => res.status(500).send(err));
}

module.exports = { register };
