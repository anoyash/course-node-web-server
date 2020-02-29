const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');              //used to work with advanced templeting
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));                  //including html file


app.use( (req,res,next) => {
    var now = new Date().toString();
    var log = ` ${now} : ${req.method} ${req.url}`;

    console.log(log);
    next();                        //if there is no next(), program will stop here
});




app.get( '/' , (req , res ) => {
   // 1. res.send('<h1>Hello Express!!</h1>');
   // 2. sending a json data
   /*res.send( {
       name : 'Ashutosh',
       likes : [
           'Biking',
           'Travelling',
           'PUBG'
       ]
   });*/
    // 3. we can also send the data using res.render to send a hbs file including parameters
   res.render('root.hbs' , {
       welcomeText : 'Welcome to Imperial Donuts',
       currentYear : new Date().getFullYear()
   });
});


app.get('/about' , (req , res )=> {
    //res.send('About Page');
    res.render('about.hbs' , {
        pageTitle : 'About Page',
        currentYear : new Date().getFullYear()
    });                        //we are also passing some arguments to make it more dynamic
});

app.listen(port, ()=>{
    console.log(`Server is updated on port ${port}`);
});