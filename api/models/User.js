const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");
const Fav = require("./Fav");

class User extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: {
        min: 4,
      },
    },
    salt: {
      type: S.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;
  return user.hash(user.password, salt).then((hash) => (user.password = hash));
});

User.hasMany(Fav);
Fav.belongsTo(User);

module.exports = User;
