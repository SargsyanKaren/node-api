const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models');

class Users {
  static signIn(req, res) {
    const { email, password } = req.body;

    return User
      .findOne({ where: { email } })
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
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
        } else {
          res.sendStatus(401);
        }
      })
  }

  static signUp(req, res) {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashPassword) => {
      console.log(err, hashPassword);
      
      if (!err) {
        return User
          .create({ name, email, password: hashPassword })
          .then(user => res.status(200).send({
            success: true,
            user
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
    const { token } = req;

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

  static removeUser(req, res) {
    const { id } = req.params;
    const { token } = req;

    jwt.verify(token, process.env.PRIVATE_KEY, (err, authData) => {
      if (err) res.sendStatus(403);
      else {
        return User.destroy({ where: { id } })
        .then(user => res.status(200).send({
          success: true
        }))
      }
    })
  }
}

module.exports = Users;
