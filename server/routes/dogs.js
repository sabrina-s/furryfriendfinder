const _ = require('lodash');
const express = require('express');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const Dog = require('../models/dog');

const router = express.Router();

router.get('/', async (req, res) => {
  const dogs = await Dog.find({});
  return res.status(200).json(dogs);
});

router.post('/', async (req, res) => {
  try {
    const params = _.pick(req.body, ['name', 'gender', 'description', 'hdbApproved', 'birthday', 'available']);
    const dog = new Dog(params);
    await dog.save();

    return res.status(200)
      .json({ message: `${dog.name} added successfully!` });
  } catch (error) {
    return res.status(400).json({ message: 'Unable to add new dog.' });
  }
});

router.put('/adopt/:id', [auth.required, validateObjectId], async (req, res) => {
  try {
    const dogId = req.params.id;
    console.log('backend dogid', dogId);

    const dog = await Dog.findByIdAndUpdate(
      dogId,
      { $set: { available: false } }
    );

    return res.status(200)
      .json({ message: `${dog.name} successfully adopted!` });
  } catch (error) {
    return res.status(400);
  }
});

module.exports = router;
