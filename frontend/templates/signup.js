window.onload = function signup() {
    const Register = document.getElementById("register");
    const selection = signupType = document.getElementById("signupType")
    if (selection.value === "Teacher" ) {
        document.getElementById("classcode").style.display = 'none';
    }

    selection.addEventListener('change', (e) => {
        if (selection.value === "Teacher" ) {
            document.getElementById("classcode").style.display = 'none';
        }
        else if (selection.value === "Student" ) {
            document.getElementById("classcode").style.display = 'block';
        }
    });

    Register.addEventListener('click', (e) => {
        if(selection.value === 'Student'){
          const username        = document.getElementById("username").value;
          const firstname       = document.getElementById("firstname").value;
          const lastname        = document.getElementById("lastname").value;
          const email           = document.getElementById("email").value;
          const password        = document.getElementById("password").value;
          const confirmpassword = document.getElementById("confirmpassword").value;
          const signupType      = document.getElementById("signupType").value;
          const classCode       = document.getElementById("classcode").value;
          if (password === confirmpassword){
              post_request(username, firstname, lastname, password, email, signupType, classCode);
          }
          else {
              console.log("Passwords must match")
          }

        }else if(selection.value === 'Teacher'){
          const username        = document.getElementById("username").value;
          const firstname       = document.getElementById("firstname").value;
          const lastname        = document.getElementById("lastname").value;
          const email           = document.getElementById("email").value;
          const password        = document.getElementById("password").value;
          const confirmpassword = document.getElementById("confirmpassword").value;
          const signupType      = document.getElementById("signupType").value;
          if (password === confirmpassword){
              teacher_request(username, firstname, lastname, password, email, signupType);
          }
          else {
              console.log("Passwords must match")
          }
        }
    });

function post_request(username, firstname, lastname, password, email, signupType, classCode) {
    const body = {
        username: username,
        firstName: firstname,
        lastName: lastname,
        password: password,
        email: email,
        signupType: signupType,
        classCode: classCode
    };
    return fetch("https://cors-anywhere.herokuapp.com/http://162.246.157.181/signup", {
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
            window.location = url + "/Party-Designer-Math/frontend/templates/login.html";
            console.log("Registration was successful!")
          });
        }
      )
    }

function post_request(username, firstname, lastname, password, email, signupType) {
    const body = {
        username: username,
        firstName: firstname,
        lastName: lastname,
        password: password,
        email: email,
        signupType: signupType
    };
    return fetch("http://162.246.157.181/signup", {
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
            window.location = url + "/Party-Designer-Math/frontend/templates/login.html";
            console.log("Registration was successful!")
          });
        }
      )
    }

}
