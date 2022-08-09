
// NOTE:  all .js and .hbs files were modified from the starter code provided by this course

// Get the objects we need to modify
let addItineraryForm = document.getElementById('add-itinerary-form-ajax');

// Modify the objects we need
addItineraryForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("passenger_id");
    let inputPlane = document.getElementById("plane_id");
    let inputDepartureCode = document.getElementById("departure_airport_code");
    let inputArrivalCode = document.getElementById("arrival_airport_code");
    let inputCost = document.getElementById("cost");
    let inputPurchaseDate = document.getElementById("purchase_date");
    let inputDateTrip = document.getElementById("date_of_trip");
    let inputFlightHour = document.getElementById("flight_hour");
    let inputLayoverHour = document.getElementById("layover_hour");

    // Get the values from the form fields
    let passengerVal = inputName.value;
    let planeVal = inputPlane.value;
    let departVal = inputDepartureCode.value;
    let arrivalVal = inputArrivalCode.value;
    let costVal = inputCost.value;
    let pDateVal = inputPurchaseDate.value;
    let dateTripVal = inputDateTrip.value;
    let flightHourVal = inputFlightHour.value;
    let layoverHourVal = inputLayoverHour.value;


    // Put our data we want to send in a javascript object
    let data = {
        passenger: passengerVal,
        plane: planeVal,
        departure: departVal,
        arrival: arrivalVal,
        cost: costVal,
        purchaseDate: pDateVal,
        dateTrip: dateTripVal,
        flightHour: flightHourVal,
        layoverHour: layoverHourVal,
    }
    console.log("data: ", data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-itinerary-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputPlane.value = '';
            inputDepartureCode.value = '';
            inputArrivalCode.value = '';
            inputCost.value = '';
            inputPurchaseDate.value = '';
            inputDateTrip.value = '';
            inputFlightHour.value = '';
            inputLayoverHour.value = '';
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
    let currentTable = document.getElementById("passenger-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let booking_id_cell = document.createElement("TD")
    let passenger_id_cell = document.createElement("TD");
    let plane_id_cell = document.createElement("TD");
    let depart_code_cell = document.createElement("TD");
    let arrival_code_cell = document.createElement("TD");
    let cost_cell = document.createElement("TD");
    let pdate_cell = document.createElement("TD");
    let date_trip_cell = document.createElement("TD");
    let flight_hour_cell = document.createElement("TD");
    let layover_hour_cell = document.createElement("TD");


    // Fill the cells with correct data
    booking_id_cell.innerText = newRow.booking_id;
    passenger_id_cell.innerText = newRow.passenger_id;
    plane_id_cell.innerText = newRow.plane_id;
    depart_code_cell.innerText = newRow.departure_airport_code;
    arrival_code_cell.innerText = newRow.arrival_airport_code;
    cost_cell.innerText = newRow.cost;
    pdate_cell.innerText = newRow.purchase_date;
    date_trip_cell.innerText = newRow.date_of_trip;
    flight_hour_cell.innerText = newRow.flight_hour;
    layover_hour_cell.innerHTML = newRow.layover_hour;


    // Add the cells to the row 
    row.appendChild(booking_id_cell);
    row.appendChild(passenger_id_cell);
    row.appendChild(plane_id_cell);
    row.appendChild(depart_code_cell);
    row.appendChild(arrival_code_cell);
    row.appendChild(cost_cell);
    row.appendChild(pdate_cell);
    row.appendChild(date_trip_cell);
    row.appendChild(flight_hour_cell);
    row.appendChild(layover_hour_cell);

    
    // Add the row to the table
    currentTable.appendChild(row);
}