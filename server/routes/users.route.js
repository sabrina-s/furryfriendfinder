const _ = require("lodash");
const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/user.model");
const { route } = require("./dogs.route");
const Dog = require("../models/dog.model");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = new User(_.pick(req.body, ["username", "password"]));
    await user.save();
    const token = user.generateJWT();

    return res
      .status(200)
      .cookie("access_token", token, {
        maxAge: 1000 * 3600 * 24 * 7,
        httpOnly: true,
      })
      .json({
        message: `${user.username} registered successfully!`,
        user: _.pick(user, ["username"]),
      });
  } catch (error) {
    return res.status(400).json({ message: "Unable to register user." });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user)
    return res.status(422).json({ message: "Invalid email or password." });

  const valid = await user.isValidPassword(req.body.password);

  if (!valid) {
    return res.status(422).json({ message: "Invalid email or password." });
  }

  const token = user.generateJWT();

  return res
    .status(200)
    .cookie("access_token", token, {
      maxAge: 1000 * 3600 * 24 * 7,
      httpOnly: true,
    })
    .json({
      message: "Login success!",
      user: _.pick(user, ["id", "username"]),
    });
});

router.get("/me", auth.required, async (req, res) => {
  const user = await User.findById(req.user.id).select("username -_id");
  res.send(user);
});

router.post("/logout", async (req, res) =>
  res
    .status(200)
    .clearCookie("access_token")
    .json({ message: "Logout success!" })
);

router.get("/", [auth.required, admin], async (req, res) => {
  const users = await User.find({}).select("-password");
  return res.json(users);
});

router.put("/change_password", auth.required, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.setPassword(req.body.password);
    await user.save();

    return res.status(200).json({ message: "Password updated!" });
  } catch (error) {
    next(error);
  }
});

router.get("/dogs", auth.required, async (req, res, next) => {
  try {
    const userId = req.user.id;
    // TODO: dog not saved in user's adoptedDogs array
    const dogs = await Dog.find({}).where({ adopter: userId });

    return res.status(200).json(dogs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
