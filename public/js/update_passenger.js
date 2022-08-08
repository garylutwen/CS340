
// grab objects we need to modify
let updatePassengerForm = document.getElementById('update-passenger-form-ajax');

if (!updatePassengerForm) {
    console.log("updatePassengerForm is NULL");
}
// modify objects we need
updatePassengerForm.addEventListener("submit", function (e) {

    //prevent form from submitting
    e.preventDefault();

    // get form fields we need to get data from
    let inputName = document.getElementById("update-selected-name");
    let inputEmail = document.getElementById("update-email");

    // get their values from form fields
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    console.log("nameValue is: " + nameValue);
    console.log("emailValue is: " + emailValue);

    // if the database table for passengers does not allow updating values to NULL,
    // we must abort if being passed NULL for email

    // if (isNaN(emailValue)) 
    // {
    //     console.log("NULL error");
    //     return;
    // }


    // put data we want to send in a js object
    let data = {
        name: nameValue,
        email: emailValue,
    }

    // setup ajax req
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-passenger-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // tell our ajax req how to resolve
    xhttp.onreadystatechange = () => {
       if(xhttp.readyState == 4 && xhttp.status == 200) {

            // add new data to the table
            updateRow(xhttp.response, nameValue);
       } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
       }
    }
    // send the req and wait for the repsonse
    xhttp.send(JSON.stringify(data));
})


function updateRow(data, passenger_id) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("passenger-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

        // rows would be accessed using the "row" var assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == passenger_id) {

            // get location of where we found the matching passenger_id
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // get td of email value
            let td = updateRowIndex.getElementsByTagName("td")[2];

            //reassign email to our new value
            td.innerHTML = parsedData[0].email;
        }
    }
}