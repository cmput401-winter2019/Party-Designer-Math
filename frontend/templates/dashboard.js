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

async function post(endpoint, body) {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("access_token")
    };

    const request = {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify(body)
    };

    const response = await fetch(endpoint, request);

    return response;
}

async function main() {
    const teacherresponse = await get("http://162.246.157.181/geteacherinfo");
    const teacherdata = await teacherresponse.json();
    if (teacherresponse.ok) {
        document.getElementById("content").style.display = "block";
        console.log("notAuthenticated")
    }

    const welcomeText = document.getElementById("welcome");
    welcomeText.innerText = "Welcome, " + teacherdata.teacherName + "!";

    const Login = document.getElementById("logout");
    Login.addEventListener('click', async (e) =>{
        const body = {
            access_token: localStorage.getItem("access_token"),
            refresh_token: localStorage.getItem("refresh_token")
        };
        const logoutresponse = await post("http://162.246.157.181/logout", body);
        const logoutdata    = await logoutresponse.json();

    });

    const response = await get("http://162.246.157.181/" + teacherdata.classCode + "/stats");
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
