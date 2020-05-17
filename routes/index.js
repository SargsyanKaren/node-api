"use strict"
const express = require('express');

// middleware
const { getToken, jwtVerify } = require('../middleware');
const fileUpload = require('../middleware/fileUpload')

// controllers
const Users = require('../db/controllers/user');

const router = express.Router();

router.post('/login', Users.signIn);
router.post('/signup', Users.signUp);

router.use(getToken, jwtVerify);

router.get('/users', Users.getUsers);
router.get('/user/:id', Users.getUser);
router.delete('/user/:id', Users.removeUser)

router.post('/upload', fileUpload);

module.exports = router;
