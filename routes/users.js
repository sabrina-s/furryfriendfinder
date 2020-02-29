const _ = require('lodash');
const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', async (req, res) => {
  let user = await User.findOne({ username: req.body.username });

  if (user) return res.status(400).send('User already registered.');

  try {
    user = new User(_.pick(req.body, ['username', 'password']));

    await user.save();

    res.send(_.pick(user, ['_id', 'username']));
  } catch (err) {
    res.status(422).send('Could not register user.');
  }
})

module.exports = router;
