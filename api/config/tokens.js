const { SECRET } = require("./envs");
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: "2d" });
  return token;
};

const validateToken = () => {};

module.exports = { generateToken, validateToken };
