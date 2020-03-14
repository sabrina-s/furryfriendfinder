const _ = require('lodash');
const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    user = new User(_.pick(req.body, ['username', 'password']));
    await user.save();

    return res.status(200).json({ message: `${user.username} registered successfully!` });
  } catch (error) {
    return res.status(400).json({ message: 'Unable to register user.' });
  }
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (_.isEmpty(user)) {
    return res.status(422).json({ message: 'User does not exist.' });
  }

  const valid = await user.isValidPassword(req.body.password);

  if (!valid) {
    return res.status(422).json({ message: 'Incorrect password.' });
  } else {
    const token = user.generateJWT();

    res.cookie('access_token', token, {
      maxAge: 1000 * 3600 * 24 * 7,
      httpOnly: true
    });

    return res.status(200).json({
      message: 'Login success!'
    });
  }
})

module.exports = router;
