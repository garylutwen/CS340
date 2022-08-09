
// NOTE:  all .js and .hbs files were modified from the starter code provided by the following link: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deletePassenger(passenger_id) {
    // put data we want to send in a js object
    let data = {
        id: passenger_id
    };

    // setup ajax request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-passenger-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // tell our ajax request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // add the new data to the table
            deleteRow(passenger_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input")
        }
    }
    // send the req and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(passenger_id) {
    let table = document.getElementById("passenger-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // rows would be accessed using the "row" var assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == passenger_id) {
            table.deleteRow(i);
            deleteDropDownMenu(passenger_id);
            break;
        }
    }
}


function deleteDropDownMenu(passenger_id) {
    let selectMenu = document.getElementById("update-selected-name");
    for (let i = 0; i < selectMenu.length; i++){
        if (Number(selectMenu.options[i].value) === Number(passenger_id)){
            selectMenu[i].remove();
            break;
        } 
    }
}




// below code is if we were using jQuery

// function deletePassenger(passenger_id) {
//     let link = '/delete-passenger-ajax/';
//     let data = {
//         id: passenger_id
//     };
//     $.ajax({
//         url: link,
//         type: 'DELETE',
//         data: JSON.stringify(data),
//         contentType: "application/json; charset=utf-8",
//         success: function(result) {
//             deleteRow(passenger_id);
//         }
//     });
// }

// function deleteRow(passenger_id){
//     let table = document.getElementById("passenger-table");
//     for (let i = 0, row; row = table.rows[i]; i++) {
//         if (table.rows[i].getAttribute("data-value") == passenger_id) {
//             table.deleteRow[i];
//             break;
//         }
//     }
// }