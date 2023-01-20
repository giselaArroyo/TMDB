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

router.get("/uno", validateAuth, (req, res) => {
  const userId = req.user.id;
  const idFilm = req.body.idFilm;

  Fav.findOne({
    where: { idFilm: idFilm, userId: userId },
  }).then((fav) => {
    if (fav) {
      res.send({
        data: true,
      });
    } else {
      res.send({
        data: false,
      });
    }
  });
});

module.exports = router;
