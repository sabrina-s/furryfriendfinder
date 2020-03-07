const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  }
});

const Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;
