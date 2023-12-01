const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');


const app = express();

//use EJS as view engine

app.set('view engine', 'ejs');
//static file

app.use(express.static('public'));



app.get('/', (req, res) => {

    res.render('login.ejs');



});


app.get('/signup', (req, res) => {

    res.render('signup.ejs');

});


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
