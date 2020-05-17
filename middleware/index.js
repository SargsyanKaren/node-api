const jwt = require('jsonwebtoken');

const getToken = (req, res, next) => {
  const bearer = req.headers['authorization'];

  if (bearer) {
    const token = bearer.split(' ')[1]
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
};

const jwtVerify = (req, res, next) => {
  const { token } = req;
  jwt.verify(token, process.env.PRIVATE_KEY, (err, authData) => {
    if (err) res.sendStatus(403)
    else next();
  })
};

module.exports = {
  getToken,
  jwtVerify
};