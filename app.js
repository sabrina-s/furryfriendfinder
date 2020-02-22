const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dogsRouter = require('./routes/dogs');
const usersRouter = require('./routes/users');

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/', dogsRouter);
app.use('/', usersRouter);
app.use(express.static(path.join(__dirname, 'client/build')));

module.exports = app;
