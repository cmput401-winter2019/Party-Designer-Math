import {User} from "../src/js/classes/user";

window.onload = function login() {
    const Login = document.getElementById("login");
    Login.addEventListener('click', (e) => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const loginType = document.getElementById("loginType").value;
        console.log(username, password, loginType);
        post_request(username, password, loginType);
    });

function post_request(username, password, loginType) {
    const body = {
        username: username,
        password: password,
        loginType: loginType
    };
    return fetch("https://162.246.157.181/login", {
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
            localStorage.setItem("username", username);
            localStorage.setItem("access_token", data["access_token"]);
            localStorage.setItem("refresh_token", data["refresh_token"]);
            if (loginType == "Student") {
                let url = window.location.href.split("/");
                url = url[0] + "//" + url[2];
                window.location = url + "/play.html";
            }

            else if (loginType == "Teacher") {
                let url = window.location.href.split("/");
                url = url[0] + "//" + url[2];
                window.location = url + "/dashboard.html";
            }
          });
        }
      )
    }
}
