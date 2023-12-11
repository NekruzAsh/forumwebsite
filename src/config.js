
const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://niko:A0y3B3TYjqY7WOjP@login.sjeam6h.mongodb.net/?retryWrites=true&w=majority");

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
