window.onload = function signup() {
    const Register = document.getElementById("register");
    Register.addEventListener('click', (e) => {
        const username = document.getElementById("username").value;
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmpassword = document.getElementById("confirmpassword").value;
        const signupType = document.getElementById("signupType").value;
        if (password === confirmpassword){
            post_request(username, firstname, lastname, password, email, signupType);
        }
        else {
            console.log("Passwords must match")
        }
    });

function post_request(username, firstname, lastname, password, email, signupType) {
    const body = {
        username: username,
        firstName: firstname,
        lastName: lastname,
        password: password,
        email: email,
        signupType: signupType
    };
    return fetch("http://127.0.0.1:5001/signup", {
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
            let url = window.location.href.split("/");
            url = url[0] + "//" + url[2];
            window.location = url + "/login.html";
            console.log("Registration was successful!")
          });
        }
      )
    }
}