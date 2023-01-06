const express = require("express");
const router = express.Router();
const Fav = require("../models/Fav");
const User = require("../models/User");
const { validateAuth } = require("../middlewares/auth");

//add to fav

router.post("/:filmId", (req, res) => {
  const id = req.body.id;
  const filmId = req.params.filmId;

  //chequear que no esté en favs

  Fav.findOne({ where: { userId: id, idFilm: filmId } }).then((element) => {
    if (element) {
      res.status(303).send({
        message: `Ya está en tus favoritos`,
      });
    } else {
      // agregar a favs
      Fav.create({ userId: id, idFilm: filmId })
        .then((favorito) => {
          res.status(201).send(favorito);
        })
        .catch((err) => res.status(500).send(err));
    }
  });
});

// delete to fav

router.delete("/:userId/:filmId", (req, res) => {
  const idFilm = req.params.filmId;
  const { id } = req.user;

  Fav.findOne(
    { where: { userId: id, idFilm: idFilm } }.then((element) => {
      if (element) {
        Fav.destroy({ where: { userId: id, idFilm: idFilm } }).then(
          res.sendStatus(204)
        );
      } else {
        res.status(303).send({
          message: `No está en sus favoritos`,
        });
      }
    })
  );
});

// router.get("/:userId", validateAuth, (req, res) => {
//   res.send(req.user);
// });

// get all fav

router.get("/misfavs", validateAuth, (req, res) => {
  const { id } = req.user;

  const favoritos = Fav.findAll({ where: { userId: id } });
  res.send(favoritos);
});

module.exports = router;

// router.get("/misfavs", validateAuth, (req, res) => {
//   res.send(req.user);
// });
