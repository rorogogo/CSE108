const BASE_URL = "https://amhep.pythonanywhere.com/grades";

function displayGrades(data) {

    const table = document.getElementById("gradesTable");
    table.innerHTML = "";

    // If it's not an array, convert it into one
    if (!Array.isArray(data)) {
        data = [data];
    }

    data.forEach(student => {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const gradeCell = document.createElement("td");
        gradeCell.textContent = student.grade;

        row.appendChild(nameCell);
        row.appendChild(gradeCell);

        table.appendChild(row);
    });
}
function getAllGrades() {

    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => {

        const formatted = Object.entries(data).map(([name, grade]) => ({
            name: name,
            grade: grade
        }));

        displayGrades(formatted);
    });
}
function getStudent() {

    const name = document.getElementById("searchName").value;

    if (name === "") {
        alert("Please enter a student name");
        return;
    }

    fetch(BASE_URL + "/" + encodeURIComponent(name))
        .then(response => response.json())
        .then(data => displayGrades(data));
}
function addStudent() {

    const name = document.getElementById("newName").value;
    const grade = parseFloat(document.getElementById("newGrade").value);

    fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            grade: grade
        })
    })
    .then(response => response.json())
    .then(data => getAllGrades());
}
function updateGrade() {

    const name = document.getElementById("editName").value;
    const grade = parseFloat(document.getElementById("editGrade").value);

    fetch(BASE_URL + "/" + encodeURIComponent(name), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            grade: grade
        })
    })
    .then(response => response.json())
    .then(data => getAllGrades());
}
function deleteStudent() {

    const name = document.getElementById("deleteName").value;

    fetch(BASE_URL + "/" + encodeURIComponent(name), {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => getAllGrades());
}