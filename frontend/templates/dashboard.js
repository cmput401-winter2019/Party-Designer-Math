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
            const newCellUsername  = newRow.insertCell(0);
            const username  = document.createTextNode(student.username);
            newCellUsername.appendChild(username);

            //Student fullname
            const newCellFullname  = newRow.insertCell(1);
            const fullname  = document.createTextNode(student.fullname);
            newCellFullname.appendChild(fullname);

            //Student usernames
            const newCellAddition  = newRow.insertCell(2);
            const addition = document.createTextNode(student.stats.addition  + "%");
            newCellAddition.appendChild(addition);

            console.log(student);
        }
    }
}
