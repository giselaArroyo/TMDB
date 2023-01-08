const User = require("../models/User");

class userService {
  // REGISTER

  static async register(body) {
    try {
      const response = await User.create({
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  //LOGIN

  static async login(email, password) {
    try {
      const user = await User.findOne({ where: { email: email } });

      if (!user)
        return {
          error: true,
          data: {
            status: 400,
            message: `No existe un usuario con el mail: ${email}`,
          },
        };

      const validate = await user.validatePassword(password);
      if (!validate)
        return {
          error: true,
          data: {
            status: 400,
            message: `La contraseña es incorrecta`,
          },
        };
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
      };
      return { error: false, data: payload };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = userService;
