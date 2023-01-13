const S = require("sequelize");
const db = require("../db");

class Fav extends S.Model {}

Fav.init(
  {
    idFilm: {
      type: S.INTEGER,
      allowNull: false,
    },
    type: {
      type: S.STRING,
      allowNull: false,
    },
    poster_path: {
      type: S.STRING,
    },
    title: {
      type: S.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "fav",
  }
);

module.exports = Fav;
