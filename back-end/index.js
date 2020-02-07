const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const Dog = require('./models/Dog');

const app = express();

app.use(express.static(path.join(__dirname, '../front-end/build')));

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

// Temporary - to create new dog

// const newDog = new Dog({ name: "Bernie", gender: "male", description: "ok" });

// async function createDog() {
//   await newDog.save();
// };

// createDog();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/dogs', (req, res) => {
  Dog.find({}, function(err, dogs) {
    res.send(dogs);
  });
});
