// Get the objects we need to modify
let addAirportForm = document.getElementById('add-airport-form-ajax');

// Modify the objects we need
addAirportForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDeparture = document.getElementById("departure_airport_code");
    let inputArrival = document.getElementById("arrival_airport_code");
    let inputContinent = document.getElementById("continent");
    let inputCountry = document.getElementById("country");
    let inputCity = document.getElementById("city");


    // Get the values from the form fields
    let departureValue = inputDeparture.value
    let arrivalValue =  inputArrival.value
    let continentValue = inputContinent.value
    let countryValue = inputCountry.value
    let cityValue = inputCity.value

    // Put our data we want to send in a javascript object
    let data = {
        departure_airport_code: departureValue,
        arrival_airport_code: arrivalValue,
        continent: continentValue,
        country: countryValue,
        city: cityValue
    }
    console.log("data: ", data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-airport-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDeparture.value = '';
            inputArrival.value = '';
            inputContinent.value = '';
            inputCountry.value = '';
            inputCity.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("airport-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let departure_airport_code_cell = document.createElement("TD")
    let arrival_airport_code_cell = document.createElement("TD");
    let continent_cell = document.createElement("TD");
    let country_cell = document.createElement("TD");
    let city_cell = document.createElement("TD");

    // Fill the cells with correct data
    departure_airport_code_cell.innerText = newRow.departure_airport_code;
    arrival_airport_code_cell.innerText = newRow.arrival_airport_code;
    continent_cell.innerText = newRow.continent;
    country_cell.innerText = newRow.country;
    city_date_cell.innerText = newRow.city;

    // Add the cells to the row 
    row.appendChild(departure_airport_code_cell);
    row.appendChild(arrival_airport_code_cell);
    row.appendChild(continent_cell);
    row.appendChild(country_cell);
    row.appendChild(city_cell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}