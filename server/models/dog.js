const mongoose = require('mongoose');

const { Schema } = mongoose;

const DogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  description: {
    type: String,
    required: true
  },
  hdbApproved: {
    type: Boolean,
    required: true
  },
  birthday: Date,
  available: {
    type: Boolean,
    required: true,
    default: true
  },
  image: {
    type: String
  },
  adopter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;
