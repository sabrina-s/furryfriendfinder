const _ = require('lodash');
const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    user = new User(_.pick(req.body, ['username', 'password']));
    await user.save();

    res.send(_.pick(user, ['_id', 'username']));
  } catch (error) {
    res.send(error);
  }
})

module.exports = router;
