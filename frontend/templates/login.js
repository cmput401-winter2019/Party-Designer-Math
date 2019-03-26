import {User} from "../src/js/classes/user";

window.onload = function login() {
    const Login = document.getElementById("login");
    Login.addEventListener('click', (e) => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log(username, password);
        post_request(username, password);
    });

function post_request(username, password) {
    const body = {
        username: username,
        password: password
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
            console.log(data);
            localStorage.setItem("username", data["username"]);
            localStorage.setItem("access_token", data["access_token"]);
            localStorage.setItem("refresh_token", data["refresh_token"]);
            let url = window.location.href.split("/");
            url = url[0] + "//" + url[2];
            window.location = url + "/play.html";
          });
        }
      )
    }
}
