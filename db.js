const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: '127.0.0.1',
  database: 'postgres',
  password: process.env.PASSWORD,
  port: 5432
});

module.exports = pool;
