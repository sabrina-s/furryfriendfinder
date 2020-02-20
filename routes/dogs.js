const express = require('express');
const router = express.Router();

const Dog = require('../models/Dog');

router.get('/dogs', (req, res) => {
  Dog.find({}, function(err, dogs) {
    res.send(dogs);
  });
});

module.exports = router;
