const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 5,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

UserSchema.pre('save', async function(next) {
  const rounds = 10;
  this.password = await bcrypt.hash(this.password, rounds);
  next();
});

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      userid: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000)
    },
    secret
  );
};

UserSchema.methods.verifyJWT = function(token) {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
};

UserSchema.plugin(uniqueValidator, { message: 'should be unique' });

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(8).required()
  })

  return Joi.assert(user, schema);
}

exports.User = User;
exports.validate = validateUser;
