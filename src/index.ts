//import from another file
import data from './data.js' ;

//Converting JSON-formatted data to javascript object or array
const students = JSON.parse(data);

//Interface to ensure student object has expected properties
interface Student {
    id: string,
    firstName: string,
    lastName: string,
    dateAdmission: string,
    birthYear: string,
    focusArea?: string | string[],
    dateRegistrationSuspended?: string
}


// This function adds one student row to the table
function addRow(table : HTMLTableElement, student : Student) {
    
    let tr = table.querySelector("tbody")!.insertRow();
    const name = tr.insertCell();
    name.appendChild(document.createTextNode(`${student.firstName}  ${student.lastName}`));

    const age = tr.insertCell();
    age.appendChild(document.createTextNode((new Date().getFullYear() - parseInt(student.birthYear)).toString()));

    const majors = tr.insertCell();
    
    //Checks if its a string or an array
    if (student.focusArea) {
        if (typeof student.focusArea == "string") {
            majors.appendChild(document.createTextNode(student.focusArea));
        } else {
            let areas = "";
            student.focusArea.forEach(area=>{
                areas += area + ", "
            });
            majors.appendChild(document.createTextNode(areas.slice(0,-2)));
        }
    } else {
        majors.appendChild(document.createTextNode("--"));
    }
    

    const status = tr.insertCell();
    // Check if the student is suspended or not
    if (student.dateRegistrationSuspended) {
        status.appendChild(document.createTextNode("Inactive"));
    } else {
        status.appendChild(document.createTextNode("Active"));
    }
    
}

// select HTML table
function selectTable() {
    return <HTMLTableElement>document.querySelector("#students-table");
}

//
function refreshTable(table : HTMLTableElement, students : Student[]) {
    table.querySelector("tbody")!.innerHTML = "";
    students.forEach(student => {
        addRow(table, student);
    });
}

//Runs when page fully loads
window.onload = function () {
    refreshTable(selectTable(), students);
}



