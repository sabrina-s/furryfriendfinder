const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/users', (req, res) => {
  res.send('You requested a list of users....');
});

module.exports = router;
