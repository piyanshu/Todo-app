// First we have to include mongoose
const mongoose = require('mongoose');

//  Connect our database with mongodb
mongoose.connect('mongodb+srv://admin-piyanshu:test123@cluster0.rvke8.mongodb.net/TO_DO_LIST_db', {
     useNewUrlParser: true,
     useUnifiedTopology: true
});

// Accessing the connection between mongodb and our database
const db = mongoose.connection;

// if there is an error in connecting database
db.on('err', console.log.bind(console, 'Error in accessing the database'));

// if it successfully connected
db.once('open', function(){
    console.log('Successfully connected to database');
});