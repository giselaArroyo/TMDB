const Fav = require("../models/Fav");

class favService {
  // ADD TO FAV
  static async add(idFilm, id, type, title, poster_path) {
    try {
      const response = await Fav.create({
        idFilm: idFilm,
        userId: id,
        type: type,
        title: title,
        poster_path: poster_path,
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // REMOVE
  static async remove(idFilm, id) {
    try {
      const response = await Fav.destroy({
        where: { idFilm: idFilm, userId: id },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET ALL FAVS
  static async misFavs(id) {
    try {
      const response = await Fav.findAll({ where: { userId: id } });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = favService;
