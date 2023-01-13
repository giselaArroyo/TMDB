const e = require("express");
const favService = require("../services/favService");

class favController {
  // ADD TO FAV
  static async add(req, res) {
    const idFilm = req.body.id;
    const title = req.body.title;
    const poster_path = req.body.poster_path;
    const type = req.body.type;
    const { id } = req.user;

    const { error, data } = await favService.add(
      idFilm,
      id,
      type,
      title,
      poster_path
    );

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(201).send(data);
  }

  // REMOVE TO FAV
  static async remove(req, res) {
    const idFilm = req.body.id;
    const { id } = req.user;

    const { error, data } = await favService.remove(idFilm, id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.sendStatus(202);
  }

  // GET ALL FAVS
  static async misFavs(req, res) {
    const { id } = req.user;
    const { error, data } = await favService.misFavs(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  // GET ONE FAV

  static async oneFav(req, res) {
    const { id } = req.user;
    const idFilm = req.body.id;
    const { error, data } = await favService.oneFav(id, idFilm);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
  }
}

module.exports = favController;
