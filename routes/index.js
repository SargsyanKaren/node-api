const express = require('express');

const { getToken } = require('../utils');
const Users = require('../db/controllers/user');

const router = express.Router();

router.post('/login', Users.signIn);
router.post('/signup', Users.signUp);
router.get('/users', getToken, Users.getUsers);
router.get('/user/:id', getToken, Users.getUser);
router.delete('/user/:id', getToken, Users.removeUser)

module.exports = router;
