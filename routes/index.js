"use strict";
const express = require('express');
const multer = require('multer');

// utils
const { getToken } = require('../utils');

// controllers
const Users = require('../db/controllers/user');

const router = express.Router();
const upload = multer();

router.post('/login', Users.signIn);
router.post('/signup', Users.signUp);
router.get('/users', getToken, Users.getUsers);
router.get('/user/:id', getToken, Users.getUser);
router.delete('/user/:id', getToken, Users.removeUser)

router.post('/upload', upload.any(), (req, res) => {
    console.log('Token', req.token);
    console.log(req.files[0])
    console.log(JSON.stringify(req.body));

    res.send({
        ...req.files[0],
        buffer: ''
    });

    res.end();

});

module.exports = router;
