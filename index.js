require('dotenv').config()

const express = require('express');


const db = require('./db');

const app = express();

app.get('/', (req, res) => {

  const query = {
    text: 'INSERT INTO users(name) VALUES($1)',
    values: ['K'],
  }
  db
    .query(query)
    .then(res => console.log(res))
    .catch(err => console.log(err));

  db.end();

  res.end();
});


app.listen(4000);