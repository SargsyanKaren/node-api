const jwt = require('jsonwebtoken');

const { User } = require('../models');

class Users {
  static signIn(req, res) {
    const { email, password } = req.body;

    return User
      .findOne({ where: { email, password } })
      .then(user => {
        if (user) {
          jwt.sign({}, process.env.PRIVATE_KEY, (err, token) => {
            res.status(200).send({
              success: true,
              user,
              token
            });
          })
        } else {
          res.sendStatus(401);
        }
      })
  }

  static signUp(req, res) {
    const { name, email, password } = req.body;
    const { token } = req;

    jwt.verify(token, process.env.PRIVATE_KEY, (err, authData) => {
      if (err) res.sendStatus(403)
      else {
        return User
          .create({ name, email, password })
          .then(userData => res.status(200).send({
            success: true,
            userData
          }));
      }
    })
  }

  static getUsers(req, res) {
    const { token } = req;

    jwt.verify(token, process.env.PRIVATE_KEY, (err, authData) => {
      if (err) res.sendStatus(403)
      else {
        return User
          .findAll()
          .then(usersData => res.status(200).send({
            success: true,
            users: usersData,
          }));
      }
    })
  }

  static getUser(req, res) {
    const { id } = req.params;

    jwt.verify(token, process.env.PRIVATE_KEY, (err, authData) => {
      if (err) res.sendStatus(403)
      else {
        return User
          .findOne({ where: { id } })
          .then(userData => res.status(200).send({
            success: true,
            user: userData
          }));
      }
    })
  }
}

module.exports = Users;
