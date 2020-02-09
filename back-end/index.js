require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const Dog = require('./models/Dog');

const app = express();

app.use(express.static(path.join(__dirname, '../front-end/build')));
app.use(express.json());
app.use(cors());

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('connected!');
})

async function connectDb() {
  await mongoose.connect(`mongodb+srv://Sabrina:${process.env.MONGO_PW}@playground-yqlwt.mongodb.net/furryfriendfinder?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

connectDb();

// Create new dog
// const createDog = async dog => {
//   try {
//     const newDog = new Dog(dog);
//     await newDog.save();
//   } catch (err) {
//     handleError(err);
//   }
// };
// createDog({
//   name: "",
//   gender: "",
//   description: "",
//   hdbApproved: false,
//   available: true
// });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/dogs', (req, res) => {
  Dog.find({}, function(err, dogs) {
    res.send(dogs);
  });
});
