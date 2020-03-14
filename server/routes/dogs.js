const express = require('express');
const router = express.Router();

const Dog = require('../models/dog');

router.get('/', async (req, res) => {
  const dogs = await Dog.find({});
  return res.status(200).json(dogs);
});

module.exports = router;
