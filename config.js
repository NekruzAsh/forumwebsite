const mongoose =  require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/MyDatabase', {useNewUrlParser: true, useUnifiedTopology: true});