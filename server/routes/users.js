const _ = require('lodash');
const express = require('express');
const router = express.Router();
const jwt_validation = require('../middleware/jwt_middleware');

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

  if (!user) return res.status(422).json({ message: 'Invalid email or password.' });

  const valid = await user.isValidPassword(req.body.password);

  if (!valid) {
    return res.status(422).json({ message: 'Invalid email or password.' });
  } else {
    const token = user.generateJWT();

    return res.status(200)
      .cookie('access_token', token, {
        maxAge: 1000 * 3600 * 24 * 7,
        httpOnly: true
      })
      .json({
        message: 'Login success!',
        user: _.pick(user, ['id', 'username'])
      });
  }
})

router.get('/', async (req, res) => {
  const users = await User.find({}).select('-password');
  return res.json(users);
})

router.get('/me', jwt_validation.required, async (req, res) => {
  const user = await User.findById(req.user.userid).select('-password');
  return res.send(user);
})

router.put('/change_password', jwt_validation.required, async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  user.setPassword(req.body.password);
  await user.save();

  return res.status(200).json({ message: 'Password updated!' })
})

module.exports = router;
