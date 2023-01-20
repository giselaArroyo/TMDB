const express = require("express");
const router = express.Router();
const { validateAuth } = require("../middlewares/auth");
const favController = require("../controllers/favController");
const Fav = require("../models/Fav");

// ADD TO FAV   ---> api/fav/add

router.post("/add", validateAuth, favController.add);

// REMOVE TO ADD    ---> api/fav/remove
router.delete("/remove/:idFilm", validateAuth, favController.remove);

// GET ALL FAVS    ---> api/fav/misfavs
router.get("/misfavs", validateAuth, favController.misFavs);

// GET ONE FAV    ---> api/fav/onefav
router.get("/onefav", validateAuth, favController.oneFav);

module.exports = router;
