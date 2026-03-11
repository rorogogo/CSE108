const BASE_URL = "https://amhep.pythonanywhere.com/grades";

function displayGrades(data) {

    const table = document.getElementById("gradesTable");
    table.innerHTML = "";

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