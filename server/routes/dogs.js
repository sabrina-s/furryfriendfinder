const express = require('express');
const router = express.Router();

const Dog = require('../models/dog');

router.get('/', async (req, res) => {
  const dogs = await Dog.find({});
  res.json(dogs);
});

module.exports = router;
