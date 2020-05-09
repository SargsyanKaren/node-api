const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

const hostName = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', routes);

app.get('*', (req, res) => {
  res.end();
});

server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});

module.exports = app;
