import "babel-polyfill";
window.onload = function dashboard() {
    main()
}

async function get(endpoint) {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("access_token")
    };
  
    const request = {
      method: "GET",
      mode: "cors",
      headers: headers
    };
  
    const response = await fetch(endpoint, request);
  
    return response;
}
  
async function main() {
//Generate or get gamestate
    const response = await get("http://127.0.0.1:5001/XQJ20/stats");
    const data = await response.json();
    if (!response.ok) {
        
        console.log("Something went wrong")
        console.log(data);
    }
    else {
        const studentsInnerTable = document.getElementById("tableid").getElementsByTagName("tbody")[0];
        for (const student of data) {
            //Student usernames
            const newRow = studentsInnerTable.insertRow();
            const newCellUsername = newRow.insertCell(0);
            const username  = document.createTextNode(student.username);
            newCellUsername.appendChild(username);

            //Student fullname
            const newCellFullname = newRow.insertCell(1);
            const fullname  = document.createTextNode(student.fullname);
            newCellFullname.appendChild(fullname);

            //Student addition
            const newCellAddition = newRow.insertCell(2);
            const addition = document.createTextNode(student.stats.addition  + "%");
            newCellAddition.appendChild(addition);

            //Student subtraction
            const newCellsubtraction = newRow.insertCell(3);
            const subtraction = document.createTextNode(student.stats.subtraction  + "%");
            newCellsubtraction.appendChild(subtraction);

            //Student multiplication
            const newCellMultiplication = newRow.insertCell(4);
            const multiplication = document.createTextNode(student.stats.multiplication  + "%");
            newCellMultiplication.appendChild(multiplication);

            //Student division
            const newCellDivision = newRow.insertCell(5);
            const division = document.createTextNode(student.stats.division  + "%");
            newCellDivision.appendChild(division);

            //Student mixed
            const newCellMixed = newRow.insertCell(6);
            const mixed = document.createTextNode(student.stats.mixed  + "%");
            newCellMixed.appendChild(mixed);
        }
    }
}
