require('dotenv').config();
const mongoose = require("mongoose");
const connect = mongoose.connect(process.env.mongoURL);

connect
  .then(() => {
    console.log("Connected correctly to server");
  })
  .catch(() => {
    console.log("Database connection failed");
  });

//create a schema

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

//collection Part

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;
