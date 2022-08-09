
// NOTE:  all .js and .hbs files were modified from the starter code provided by this course

// Get the objects we need to modify
let addPlaneForm = document.getElementById('add-plane-form-ajax');

// Modify the objects we need
addPlaneForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPassenger = document.getElementById("passenger_id");
    let inputDepartureCode = document.getElementById("departure_airport_code");
    let inputArrivalCode = document.getElementById("arrival_airport_code");
    let inputType = document.getElementById("type");
    let inputManufacturedYear = document.getElementById("manufactured_year");
    let inputRangeCapacity = document.getElementById("range_capacity");
    let inputPassengerCapacity = document.getElementById("passenger_capacity");
    let inputMealServed = document.getElementById("meal_served");


    // Get the values from the form fields
    let passengerValue = inputPassenger.value
    let departureCodeValue =  inputDepartureCode.value
    let arrivalCodeValue = inputArrivalCode.value
    let typeValue = inputType.value
    let manufacturedYearValue = inputManufacturedYear.value
    let rangeCapacityValue =  inputRangeCapacity.value
    let passengerCapacityValue = inputPassengerCapacity.value
    let mealServedValue = inputMealServed.value

    // Put our data we want to send in a javascript object
    let data = {
        passenger_id: passengerValue,
        departure_airport_code: departureCodeValue,
        arrival_airport_code: arrivalCodeValue,
        type: typeValue,
        manufactured_year: manufacturedYearValue,
        range_capacity: rangeCapacityValue,
        passenger_capacity: passengerCapacityValue,
        meal_served: mealServedValue
    }

    console.log("data: ", data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-plane-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPassenger.value = '';
            inputDepartureCode.value = '';
            inputArrivalCode.value = '';
            inputType.value = '';
            inputManufacturedYear.value = '';
            inputRangeCapacity.value = '';
            inputPassengerCapacity.value = '';
            inputMealServed.value = '';

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
    let currentTable = document.getElementById("plane-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let id_cell = document.createElement("TD")
    let passenger_id_cell = document.createElement("TD");
    let departure_airport_code_cell = document.createElement("TD");
    let arrival_airport_code_cell = document.createElement("TD");
    let type_cell = document.createElement("TD");
    let manufactured_year_cell = document.createElement("TD");
    let range_capacity_cell = document.createElement("TD");
    let passenger_capacity_cell = document.createElement("TD");
    let meal_served_cell = document.createElement("TD");

    // Fill the cells with correct data
    id_cell.innerText = newRow.plane_id;
    passenger_id_cell.innerText = newRow.passenger_id;
    departure_airport_code_cell.innerText = newRow.departure_airport_code;
    arrival_airport_code_cell.innerText = newRow.arrival_airport_code;
    type_cell.innerText = newRow.type;
    manufactured_year_cell.innerText = newRow.manufactured_year;
    range_capacity_cell.innerText = newRow.range_capacity;
    passenger_capacity_cell.innerText = newRow.passenger_capacity;
    meal_served_cell.innerText = newRow.meal_served;

    // Add the cells to the row 
    row.appendChild(id_cell);
    row.appendChild(passenger_id_cell);
    row.appendChild(departure_airport_code_cell);
    row.appendChild(arrival_airport_code_cell);
    row.appendChild(type_cell);
    row.appendChild(manufactured_year_cell);
    row.appendChild(range_capacity_cell);
    row.appendChild(passenger_capacity_cell);
    row.appendChild(meal_served_cell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}