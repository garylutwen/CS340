// Get the objects we need to modify
let addPassengerForm = document.getElementById('add-passenger-form-ajax');

// Modify the objects we need
addPassengerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("name");
    let inputEmail = document.getElementById("email");
    let inputPhoneNum = document.getElementById("phone_num");
    let inputBirthDate = document.getElementById("birth_date");
    let inputAddress = document.getElementById("address");


    // Get the values from the form fields
    let emailValue = inputEmail.value
    let nameValue =  inputName.value
    let phoneValue = inputPhoneNum.value
    let birthDateValue = inputBirthDate.value
    let addressValue = inputAddress.value

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        email: emailValue,
        phone_num: phoneValue,
        birth_date: birthDateValue,
        address: addressValue
    }
    console.log("data: ", data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-passenger-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputEmail.value = '';
            inputBirthDate.value = '';
            inputPhoneNum.value = '';
            inputAddress.value = '';

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
    let id_cell = document.createElement("TD")
    let name_cell = document.createElement("TD");
    let email_cell = document.createElement("TD");
    let phone_num_cell = document.createElement("TD");
    let birth_date_cell = document.createElement("TD");
    let address_cell = document.createElement("TD");

    // Fill the cells with correct data
    id_cell.innerText = newRow.passenger_id;
    name_cell.innerText = newRow.name;
    email_cell.innerText = newRow.email;
    phone_num_cell.innerText = newRow.phone_num;
    address_cell.innerText = newRow.address;
    birth_date_cell.innerText = newRow.birth_date;

    // Add the cells to the row 
    row.appendChild(id_cell);
    row.appendChild(name_cell);
    row.appendChild(email_cell);
    row.appendChild(phone_num_cell);
    row.appendChild(birth_date_cell);
    row.appendChild(address);
    
    // Add the row to the table
    currentTable.appendChild(row);
}