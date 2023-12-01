const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.set('view engine', 'ejs');


app.use(express.static('public'));



app.get('/', (req, res) => {

    res.render('login.ejs');



});


app.get('/signup', (req, res) => {

    res.render('signup.ejs');

});

// Register User
app.post('/signup', async (req, res) => {

    const data = {

        name: req.body.username,

        password: req.body.password

    }

    //checking if the user already exists

    const existingUser = await collection.findOne({ name: data.name });
    if(existingUser){

        res.send("User already exists. Please choose another username. "); 

    }else{
        // hashing the password

        const saltRounds = 10; // # of salt rounds to use when generating salt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const userdata = await collection.insertMany(data);
        console.log(userdata);

    }

});



app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});


