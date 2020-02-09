const mongoose = require('mongoose');

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

module.exports = connectDb();
