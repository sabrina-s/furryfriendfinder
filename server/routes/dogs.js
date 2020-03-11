const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

const Dog = require('../models/dog');

router.get('/', async (req, res) => {
  const token = req.cookies.access_token;

  if (token == undefined) {
    return res.status(401).json({ message: 'Access token is required.' })
  }

  // TODO
  jwt.verify(token, secret, async (err) => {
    if (err) {
      return res.status(401).json({ message: 'Access token not valid.' });
    } else {
      const dogs = await Dog.find({});
      return res.status(200).json(dogs);
    }
  })
});

module.exports = router;
