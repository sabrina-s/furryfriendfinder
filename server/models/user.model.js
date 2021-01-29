/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    index: true,
    unique: true,
    minlength: 5,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: 8
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

UserSchema.pre('save', async function(next) {
  this.password = await hashPassword(this.password);
  next();
});

UserSchema.methods.setPassword = async function(newPassword) {
  this.password = newPassword;
};

UserSchema.methods.isValidPassword = async function(password) {
  // eslint-disable-next-line no-return-await
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      isAdmin: this.isAdmin
    },
    secret,
    {
      expiresIn: '1d'
    }
  );
};

UserSchema.methods.verifyJWT = function (token) {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
