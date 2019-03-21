window.onload = function login() {
    const Login = document.getElementById("Login");
    Login.addEventListener('click', (e) => {
        const studentNameInput = document.getElementById("studentname").value;
        const classCodeInput = document.getElementById("classcode").value;
        console.log(studentNameInput, classCodeInput);
        post_request(studentNameInput, classCodeInput);
    });

function post_request(studentNameInput, classCodeInput) {
    const body = {
        name: studentNameInput,
        classCode: classCodeInput
    };
    return fetch("http://127.0.0.1:5001/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(
        function(response) {
          // Examine the text in the response
          response.json().then(function(data) {
            if (response.status !== 200) {
                alert(response.status + " Error"+ " : " + data["message"]);
                return;
            }
            //console.log(data);
            localStorage.setItem("access_token", data["access_token"]);
            //console.log(localStorage.getItem("access_token"));
            let url = window.location.href.split("/");
            url = url[0] + "//" + url[2];
            window.location = url + "/play.html";
          });
        }
      )
    }
}