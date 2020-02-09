require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const Dog = require('./models/Dog');
const connectDb = require('./db');

app.use(express.static(path.join(__dirname, '../front-end/build')));
app.use(express.json());
app.use(cors());

connectDb;

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
