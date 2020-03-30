const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const winston = require('winston');
// require('winston-mongodb');
const error = require('./middleware/error');
require('express-async-errors');

const dogsRouter = require('./routes/dogs');
const usersRouter = require('./routes/users');

require('dotenv').config({ path: '../client/.env' });

app.use(express.json());
app.use(cookieParser());

const origin = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://spotifind-sabrina.herokuapp.com';
  } else {
    return 'http://localhost:3000';
  }
};

app.use(cors({
  origin: origin(),
  credentials: true
}));

const apiRoute = express.Router();

app.use('/api', apiRoute);
apiRoute.use('/dogs', dogsRouter);
apiRoute.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html')));

// error logging
app.use(error);
winston.add(new winston.transports.File({ filename: 'logfile.log' }));
// winston.add(new winston.transports.MongoDB({ db: process.env.MONGODB_URI }));

module.exports = app;
