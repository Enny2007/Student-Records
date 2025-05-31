import data from './data.js';
const students = JSON.parse(data);
function addRow(table, student) {
    let tr = table.querySelector("tbody").insertRow();
    const name = tr.insertCell();
    name.appendChild(document.createTextNode(`${student.firstName}  ${student.lastName}`));
    const age = tr.insertCell();
    age.appendChild(document.createTextNode((new Date().getFullYear() - parseInt(student.birthYear)).toString()));
    const majors = tr.insertCell();
    if (student.focusArea) {
        if (typeof student.focusArea == "string") {
            majors.appendChild(document.createTextNode(student.focusArea));
        }
        else {
            let areas = "";
            student.focusArea.forEach(area => {
                areas += area + ", ";
            });
            majors.appendChild(document.createTextNode(areas.slice(0, -2)));
        }
    }
    else {
        majors.appendChild(document.createTextNode("--"));
    }
    const status = tr.insertCell();
    if (student.dateRegistrationSuspended) {
        status.appendChild(document.createTextNode("Inactive"));
    }
    else {
        status.appendChild(document.createTextNode("Active"));
    }
}
// select HTML table
function selectTable() {
    return document.querySelector("#students-table");
}
function refreshTable(table, students) {
    table.querySelector("tbody").innerHTML = "";
    students.forEach(student => {
        addRow(table, student);
    });
}
window.onload = function () {
    refreshTable(selectTable(), students);
};

