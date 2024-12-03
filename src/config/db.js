const mongoose = require('mongoose');
const { mongodb } = require('../config');
const connectionURI = mongodb[mongodb.environment];
const connectDB = async () => {
  await mongoose.connect(connectionURI);
  console.log('Pinged your deployment. You successfully connected to MongoDB!');
};

module.exports = connectDB;
