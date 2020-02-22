const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/users', (req, res) => {
  res.send('You requested a list of users....');
});

module.exports = router;
