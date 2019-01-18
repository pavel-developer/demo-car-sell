const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const apiRoutesConfig = require('./server/routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client/dist'));

apiRoutesConfig(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

module.exports = app;
