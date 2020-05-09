const express = require('express');

const { getToken } = require('../../utils');
const Users = require('../controllers/user');

const router = express.Router();

router.post('/login', Users.signIn);
router.post('/users', getToken, Users.signUp);
router.get('/users', getToken, Users.getUsers);
router.get('/user/:id', getToken, Users.getUser);

module.exports = router;
