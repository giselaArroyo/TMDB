const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const favRoutes = require("./favRoutes");

router.use("/user", userRoutes);
router.use("/fav", favRoutes);

module.exports = router;
