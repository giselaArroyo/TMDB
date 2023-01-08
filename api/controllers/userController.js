const express = require("express");
const { generateToken } = require("../config/tokens");
const userService = require("../services/userService");

class userController {
  // REGISTER
  //   api/user/register

  static async register(req, res) {
    const body = req.body;
    const { error, data } = await userService.register(body);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(201).send(data);
  }

  // LOGIN
  //  api/user/login

  static async login(req, res) {
    const { email, password } = req.body;
    const { error, data } = await userService.login(email, password);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    const token = generateToken(data);
    res.cookie("token", token);
    res.send(data);
  }

  //LOGOUT
  // api/user/logout

  static async logout(req, res) {
    res.clearCookie("token");
    res.sendStatus(204);
  }

  // PERSISTENCIA
  static async validate(req, res) {
    res.send(req.user);
  }

  // MI PERFIL
  static async perfil(req, res) {
    res.send(req.user);
  }
}

module.exports = userController;
