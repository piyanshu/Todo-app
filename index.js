// first we have to include express package in our project
const express = require('express');
const app = express();

// We have to choose the port on which our seever runs
// const port = process.env.PORT || 8000;

// we have to tell the express that which type of search engine we are use.
app.set('view engine', 'ejs');
// we have to include the path where this ejs search engine has.
app.set('views', './views');

// This middleware is used to tell that where we have used our static files
app.use(express.static('assets'));
// This middleware is used to encode the data into object 
app.use(express.urlencoded({extended: true}));

// This tells that where we have config mongodb
const db = require('./config/mongoose');
// This tells where we have made our schema
const list = require('./models/contact'); 
// This array includes some list items 
const todolist = [
    {
        description: "Annual report submission deadline",
        category: "WORK",
        date: "Jun 1,2019"
    },
    {
        description:"get vegetables",
        category:"PERSONAL",
        date:"May 1, 2019"
    },
    {
        description:"shopping",
        category:"PERSONAL",
        date:"May 20, 2019"
    }
]
// fetching list items from database
app.get('/', function(req, res){
    list.find({}, function(err, list_items){
        if(err)
        {
            console.log('error in fetching list items');
            return;
        }
        // console.log('succesully fetching list items');
        return res.render('index', {
            title: "TODO APP",
            todo_list: list_items
        });
    })
});

// Adding the list items to the database
app.post('/add-task', function(req, res){
    list.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(err, newlist){
        if(err)
        {
            console.log('error in creating a list');
            return;
        }
        return res.redirect('back');
    })
});
// Delete the list items from database
app.get('/delete-work', function(req, res){
    let id = req.query.id;
    list.findByIdAndDelete(id, function(err){
        if(err)
        {
            console.log('error in deleting a list item');
            return;
        }
        // console.log('successfully deleting a list item');
        return res.redirect('back');
    });
});
let port = process.env.PORT;
if(port == null || port == ""){
    port = 8000;
}
// Running a server at a port 
app.listen(port, function(err){
    if(err)
    {
        console.log('Error in running a server', err);
    }
    console.log('Server is up and running on port:',port);
});