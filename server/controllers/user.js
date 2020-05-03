const { User } = require('../models');

class Users {
  static signUp(req, res) {
    const { name, username, email, password } = req.body;

    return User
      .create({
        name,
        username,
        email,
        password
      })
      .then(userData => res.status(200).send({
        success: true,
        message: 'user successfully created',
        userData
      }))
  }

  static getUsers(req, res) {
    return User
      .findAll()
      .then(userData => res.status(200).send({
        success: true,
        users: userData
      }))
  }
}

module.exports = Users;
