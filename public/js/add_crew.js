
// NOTE:  all .js and .hbs files were modified from the starter code provided by the following link: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addCrewForm = document.getElementById('add-crew-form-ajax');

// Modify the objects we need
addCrewForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlaneID = document.getElementById("plane_id");
    let inputJobType = document.getElementById("job_type");
    let inputYearsExperience = document.getElementById("years_experience");
    let inputHourlyWage = document.getElementById("hourly_wage");
    let inputFullTime = document.getElementById("full_time");
    let inputEnglish = document.getElementById("english");
    let inputSpanish = document.getElementById("spanish");
    let inputFrench = document.getElementById("french");
    let inputArabic = document.getElementById("arabic");
    let inputChinese = document.getElementById("chinese");
    let inputJapanese = document.getElementById("japanese");

    // Get the values from the form fields
    let planeIDValue = inputPlaneID.value
    let jobTypeValue =  inputJobType.value
    let yearsExperienceValue = inputYearsExperience.value
    let hourlyWageValue = inputHourlyWage.value
    let fullTimeValue = inputFullTime.value
    let englishValue = inputEnglish.value
    let spanishValue =  inputSpanish.value
    let frenchValue = inputFrench.value
    let arabicValue = inputArabic.value
    let chineseValue = inputChinese.value
    let japaneseValue = inputJapanese.value


    // Put our data we want to send in a javascript object
    let data = {
        plane_id: planeIDValue,
        job_type: jobTypeValue,
        years_experience: yearsExperienceValue,
        hourly_wage: hourlyWageValue,
        full_time: fullTimeValue,
        english: englishValue,
        spanish: spanishValue,
        french: frenchValue,
        arabic: arabicValue,
        chinese: chineseValue,
        japanese: japaneseValue
    }
    console.log("data: ", data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-crew-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            
            inputPlaneID.value = '';
            inputJobType.value = '';
            inputYearsExperience.value = '';
            inputHourlyWage.value = '';
            inputFullTime.value = '';
            inputEnglish.value = '';
            inputSpanish.value = '';
            inputFrench.value = '';
            inputArabic.value = '';
            inputChinese.value = '';
            inputJapanese.value = '';


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
    let currentTable = document.getElementById("crew-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let id_cell = document.createElement("TD")
    let plane_id_cell = document.createElement("TD");
    let job_type_cell = document.createElement("TD");
    let years_experience_cell = document.createElement("TD");
    let hourly_wage_cell = document.createElement("TD");
    let full_time_cell = document.createElement("TD");
    let english_cell = document.createElement("TD")
    let spanish_cell = document.createElement("TD");
    let french_cell = document.createElement("TD");
    let arabic_cell = document.createElement("TD");
    let chinese_cell = document.createElement("TD");
    let japanese_cell = document.createElement("TD");

    // Fill the cells with correct data
    id_cell.innerText = newRow.employee_id;
    plane_id_cell.innerText = newRow.plane_id;
    job_type_cell.innerText = newRow.job_type;
    years_experience_cell.innerText = newRow.years_experience;
    hourly_wage_cell.innerText = newRow.hourly_wage;
    full_time_cell.innerText = newRow.full_time;
    english_cell.innerText = newRow.english;
    spanish_cell.innerText = newRow.spanish;
    french_cell.innerText = newRow.french;
    arabic_cell.innerText = newRow.arabic;
    chinese_cell.innerText = newRow.chinese;
    japanese_cell.innerText = newRow.japanese;

    // Add the cells to the row 
    row.appendChild(id_cell);
    row.appendChild(plane_id_cell);
    row.appendChild(job_type_cell);
    row.appendChild(years_experience_cell);
    row.appendChild(hourly_wage_cell);
    row.appendChild(full_time_cell);
    row.appendChild(english_cell);
    row.appendChild(spanish_cell);
    row.appendChild(french_cell);
    row.appendChild(arabic_cell);
    row.appendChild(chinese_cell);
    row.appendChild(japanese_cell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}