const _ = require("lodash");
const express = require("express");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const Dog = require("../models/dog.model");
const User = require("../models/user.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const dogs = await Dog.find({});
  return res.status(200).json(dogs);
});

router.post("/", async (req, res, next) => {
  try {
    const params = _.pick(req.body, [
      "name",
      "gender",
      "description",
      "hdbApproved",
      "birthday",
      "available",
    ]);
    const dog = new Dog(params);
    await dog.save();

    return res.status(200).json({ message: `${dog.name} added successfully!` });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", [auth.required, admin], async (req, res, next) => {
  try {
    const params = _.pick(req.body, [
      "name",
      "gender",
      "description",
      "hdbApproved",
      "birthday",
      "available",
    ]);

    const dog = await Dog.findByIdAndUpdate(
      req.params.id,
      { $set: params },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: `${dog.name} modified successfully!` });
  } catch (error) {
    error.message = "Dog does not exist.";
    next(error);
  }
});

router.put(
  "/adopt/:id",
  [auth.required, validateObjectId],
  async (req, res, next) => {
    try {
      const dogId = req.params.id;
      const user = await User.findById(req.user.id);

      const dog = await Dog.findByIdAndUpdate(
        dogId,
        { $set: { available: false, adopter: user._id } },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: `${dog.name} successfully adopted!`, dog });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
