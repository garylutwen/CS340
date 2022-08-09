/*
    SETUP
*/

// NOTE:  all .js and .hbs files were modified from the starter code provided by the following link: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 6572;                 // Set a port number at the top so it's easy to change in the future
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
// Static Files
app.use(express.static('public'));

// Database
var db = require('./db-connector')

/*
    ROUTES
*/

app.get('/', function(req, res)
    {
        res.render('homepage')
    });

app.get('/passengers', function(req, res)
    {
        let query1 = "SELECT * FROM Passengers"
        db.pool.query(query1, function(error, rows,fields){
            // console.log(rows)
            res.render('passengers', {data: rows})
        })
    });

app.get('/airports', function(req, res)
    {
        let query3 = "SELECT * FROM Airports"
        db.pool.query(query3, function(error, rows,fields){
            // console.log(rows)
            res.render('airports', {data: rows})
        })
    });

app.get('/itineraries', function(req, res)
    {
        let query5 = "SELECT * FROM Itineraries"
        db.pool.query(query5, function(error, rows,fields){
            // console.log(rows)
            res.render('itineraries', {data: rows})
        })
    });

app.get('/planes', function(req, res)
    {
        let query7 = "SELECT * FROM Planes"
        db.pool.query(query7, function(error, rows,fields){
            // console.log(rows)
            res.render('planes', {data: rows})
        })
    });

app.get('/crew', function(req, res)
    {
        let query9 = "SELECT * FROM Crew"
        db.pool.query(query9, function(error, rows,fields){
            // console.log(rows)
            res.render('crew', {data: rows})
        })
    });
// app.js - ROUTES section

app.post('/add-passenger-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // let age = parseInt(data.age);
    // if (isNaN(age))
    // {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    query1 = `INSERT INTO Passengers (name, email, phone_num, birth_date, address) VALUES ('${data.name}', '${data.email}', '${data.phone_num}', '${data.birth_date}', '${data.address}')`;
    console.log("Query: ", query1)
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            console.log("Error1")
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Passengers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


app.post('/add-airport-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    // let homeworld = parseInt(data.homeworld);
    // if (isNaN(homeworld))
    // {
    //     homeworld = 'NULL'
    // }

    // let age = parseInt(data.age);
    // if (isNaN(age))
    // {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    query3 = `INSERT INTO Airports (departure_airport_code, arrival_airport_code, continent, country, city) VALUES ('${data.departure_airport_code}', '${data.arrival_airport_code}', '${data.continent}', '${data.country}', '${data.city}')`;
    console.log("Query: ", query3)
    db.pool.query(query3, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            console.log("Error1")
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Airports
            query4 = `SELECT * FROM Airports;`;
            db.pool.query(query4, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


app.post('/add-itinerary-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Capture NULL values
    // let age = parseInt(data.age);
    // if (isNaN(age))
    // {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    query5 = `INSERT INTO Itineraries (passenger_id, plane_id, departure_airport_code, arrival_airport_code, cost, purchase_date, date_of_trip, flight_hour, layover_hour) VALUES (${data.passenger}, ${data.plane}, '${data.departure}', '${data.arrival}', ${data.cost}, '${data.purchaseDate}', '${data.dateTrip}', ${data.flightHour}, ${data.layoverHour})`;
    console.log("Query: ", query5)
    db.pool.query(query5, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            console.log("Error1")
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query6 = `SELECT * FROM Itineraries;`;
            db.pool.query(query6, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


app.post('/add-plane-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    // let homeworld = parseInt(data.homeworld);
    // if (isNaN(homeworld))
    // {
    //     homeworld = 'NULL'
    // }

    // let age = parseInt(data.age);
    // if (isNaN(age))
    // {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    query7 = `INSERT INTO Planes (passenger_id, departure_airport_code, arrival_airport_code, type, manufactured_year, range_capacity, passenger_capacity, meal_served) VALUES ('${data.passenger_id}', '${data.departure_airport_code}', '${data.arrival_airport_code}', '${data.type}', '${data.manufactured_year}', '${data.range_capacity}', '${data.passenger_capacity}', '${data.meal_served}')`;
    console.log("Query: ", query7)
    db.pool.query(query7, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            console.log("Error1")
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query8 = `SELECT * FROM Planes;`;
            db.pool.query(query8, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



app.post('/add-crew-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    // let homeworld = parseInt(data.homeworld);
    // if (isNaN(homeworld))
    // {
    //     homeworld = 'NULL'
    // }

    // let age = parseInt(data.age);
    // if (isNaN(age))
    // {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    query9 = `INSERT INTO Crew (plane_id, job_type, years_experience, hourly_wage, full_time, english, spanish, french, arabic, chinese, japanese) VALUES (${data.plane_id}, '${data.job_type}', '${data.years_experience}', '${data.hourly_wage}', ${data.full_time}, ${data.english}, ${data.spanish}, ${data.french}, ${data.arabic}, ${data.chinese}, ${data.japanese})`;
    console.log("Query: ", query9)
    db.pool.query(query9, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            console.log("Error1")
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Crew
            query10 = `SELECT * FROM Crew;`;
            db.pool.query(query10, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



// delete implementation ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.delete('/delete-passenger-ajax/', function(req, res, next) {
    let data = req.body;
    let passenger_id = parseInt(data.id);
    let delete_Passengers= 'DELETE FROM Passengers WHERE passenger_id = ?';

    // run query
    db.pool.query(delete_Passengers, [passenger_id], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // add second query for m:m here
            res.sendStatus(204);
        }
    })
});



// update implementation ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.put('/put-passenger-ajax', function(req, res, next) {
    let data = req.body;

    let passenger = parseInt(data.name);
    let name = data.newName;
    let email = data.email;
    let phoneNum = data.phoneNum;
    let birthDate = data.birthDate;
    let address = data.address;


    // let queryUpdate = 'UPDATE Passengers SET name = ?, email = ?, phone_num = ?, birth_date = ?, address = ? WHERE Passengers.passenger_id = ?';
    let queryUpdate = 'UPDATE Passengers SET name = ?, email = ?, phone_num = ?, birth_date = ?, address = ? WHERE Passengers.passenger_id = ?';
    let selectPassenger = 'SELECT * FROM Passengers WHERE passenger_id = ?';

        // run 1st query
        // db.pool.query(queryUpdate, [name, email, phoneNum, , birthDate, address, passenger], function(error, rows, fields) {
        db.pool.query(queryUpdate, [name, email, phoneNum, birthDate, address, passenger], function(error, rows, fields) {
            if (error) {
                
                // log error and send response 400 indicating a bad request.
                console.log("1st update query error");
                res.sendStatus(400);
            } else {
                
                // if there was no error, run 2nd query and return that data so we can use it to update passengers table on front end
                db.pool.query(selectPassenger, [email], function(error, rows, fields) {
                    if (error) {
                        console.log("2nd update query error");
                        res.sendStatus(400);
                    } else {
                        console.log('name: ' + name);
                        console.log('email: ' + email);
                        console.log('phone: ' + phoneNum);
                        console.log('birth: ' + birthDate);
                        console.log('address: ' + address);
                        console.log('Successfully Updated');
                        res.send(rows);
                    }
                })
            }
        })
});


//   LISTENER

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
