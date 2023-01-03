const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Favs extends Model {}

Favs.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_film: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

module.exports = Favs;
