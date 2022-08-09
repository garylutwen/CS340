
// NOTE:  all .js and .hbs files were modified from the starter code provided by this course

// grab objects we need to modify
let updatePassengerForm = document.getElementById('update-passenger-form-ajax');

// modify objects we need
updatePassengerForm.addEventListener("submit", function (e) {


    //prevent form from submitting
    e.preventDefault();

    // get form fields we need to get data from
    let inputName = document.getElementById("update-selected-name");
    let inputNewName = document.getElementById("update-name");
    let inputEmail = document.getElementById("update-email");
    let inputPhoneNum = document.getElementById("update-phone-num");
    let inputBirthDate = document.getElementById("update-birthdate");
    let inputAddress = document.getElementById("update-address");


    // get their values from form fields
    let nameValue = inputName.value;
    let newNameValue = inputNewName.value;
    let emailValue = inputEmail.value;
    let phoneNumValue = inputPhoneNum.value;
    let birthDateValue = inputBirthDate.value;
    let addressValue = inputAddress.value;


    // if the database table for passengers does not allow updating values to NULL,
    // we must abort if being passed NULL for email

    // if (isNaN(emailValue)) 
    // {
    //     console.log("NULL error");
    //     return;
    // }
    
    if ( (!newNameValue) || (!emailValue) || (!phoneNumValue) || (!birthDateValue) || (!addressValue) ) {
        alert("Please fill out all fields in the Update Section");
        return;
    }

    // put data we want to send in a js object
    let data = {
        name: nameValue,
        newName: newNameValue,
        email: emailValue,
        phoneNum: phoneNumValue,
        birthDate: birthDateValue,
        address: addressValue,
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

            // get td of name, email, and phoneNum
            let tdName = updateRowIndex.getElementsByTagName("td")[1];
            let tdEmail = updateRowIndex.getElementsByTagName("td")[2];
            let tdPhoneNum = updateRowIndex.getElementsByTagName("td")[3];
            let tdBirthDate = updateRowIndex.getElementsByTagName("td")[4];
            let tdAddress = updateRowIndex.getElementsByTagName("td")[5];

            //reassign email to our new value if the new value has a value, if not, returns old value
            tdName.innerHTML = parsedData[0].newName;
            tdEmail.innerHTML = parsedData[1].email;
            tdPhoneNum.innerHTML = parsedData[2].phoneNum;
            tdBirthDate.innerHTML = parsedData[3].birthDate;
            tdAddress.innerHTML = parsedData[4].address;
        }
    }
}

