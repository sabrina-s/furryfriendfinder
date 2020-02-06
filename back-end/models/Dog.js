const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogSchema = new Schema({
  name: String,
  gender: String,
  description: String,
  hdbApproved: Boolean,
  birthday: Date
});

const Dog = mongoose.model('Dog', DogSchema);

// TODO: fix this!
// export default Dog;

module.exports = Dog;
