const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
//convert data into json format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//use EJS as view engine

app.set("view engine", "ejs");
//static file

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

// Register User
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,

    password: req.body.password,
  };

  //checking if the user already exists

  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send("User already exists. Please choose another username. ");
  } else {
    // hashing the password

    const saltRounds = 10; // # of salt rounds to use when generating salt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;
    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

//login user
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("User not found. Please register first.");
    }
    //compare the hashed password from database
    const validPassword = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (validPassword) {
      res.render("index");
    } else {
      req.send("Incorrect Password");
    }
  } catch {
    res.send("wrong credentials");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
