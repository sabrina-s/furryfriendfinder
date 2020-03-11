const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

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
  }
});

UserSchema.pre('save', async function(next) {
  this.password = await hashPassword(this.password);
  next();
});

function hashPassword(password) {
  return bcrypt.hash(password, 10);
};

UserSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateJWT = function() {
  return jwt.sign(
    {
      userid: this._id,
      username: this.username
    },
    secret,
    {
      expiresIn: "7d"
    }
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
