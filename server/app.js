const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dogsRouter = require('./routes/dogs');
const usersRouter = require('./routes/users');

require('dotenv').config();

app.use(express.json());
app.use(cookieParser());

const origin = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://spotifind-sabrina.herokuapp.com';
  } else {
    return 'http://localhost:3000';
  }
}

app.use(cors({
  origin: origin(),
  credentials: true
}));

const apiRoute = express.Router();

app.use('/api', apiRoute);
apiRoute.use('/dogs', dogsRouter);
apiRoute.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

module.exports = app;
