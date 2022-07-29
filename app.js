// App.js

// SETUP

// Database
var db = require('./database/db-connector')


var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

PORT = 6527;                        // Set a port number at the top so it's easy to change in the future




// ROUTES

// app.get('/', function(req, res)                 
//     {



app.get('/', function(req, res)                                         // This is the basic syntax for what is called a 'route'
{
    res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
});                                         // will process this file, before sending the finished HTML to the client.





// LISTENER


app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the s
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});