function login() {
    const studentNameInput = document.getElementById("studentname").value;
    const classCodeInput = document.getElementById("classcode").value;

    const body = {
        name: studentNameInput,
        classCode: classCodeInput
    }
    let url = window.location.href.split("/");
    url = url[0] + "//" + url[2];
    window.location = url + "index.html";

    // const headers = {
        
    // }

    // return fetch(url + "/posts/api/posts", {
    //     method: "POST",
    //     mode: "cors",
    //     cache: "no-cache",
    //     credentials: "same-origin",
    //     body: body,
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-csrftoken": csrf_token
    //     }
    //   })
    //   .then (response => {
    //     if (response.status == 200) {
    //       alert("Success")
    //       let url = window.location.href.split("/");
    //       url = url[0] + "//" + url[2];
    //       window.location = url;
    //     }
    //     else {
    //       alert("Error: " + response.status);
    //     }
    //   });


}