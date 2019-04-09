import {CST} from "../CST.js";

export class LoginScene extends Phaser.Scene{
  constructor(){
    super({key: CST.SCENES.LOGIN});
  }

  create(){

    var exists = "";
    const Login = document.querySelector('.Login')
    Login.addEventListener('submit', (e) => {
      e.preventDefault()
      const username  = Login.querySelector('.username').value
      const classCode = Login.querySelector('.classCode').value
      get('https://cors-anywhere.herokuapp.com/http://162.246.157.181/student')
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
          for(var count = 0; count < data.length; count++) {
             // console.log(data[count].username)
             if(data[count].username == username){
               exists = true
             }
          }
        })

        if(exists==true){
          alert("login success")
          this.scene.start(CST.SCENES.BOOT);
        }
    })

    const CreateUser = document.querySelector('.CreateUser')
    CreateUser.addEventListener('submit', (e) => {
      e.preventDefault()
      const username = CreateUser.querySelector('.username').value
      const classCode= CreateUser.querySelector('.classCode').value
      post('https://cors-anywhere.herokuapp.com/http://162.246.157.181/student', { username, classCode })
        .then(({ status }) => {
          if (status === 200){
            alert('signup success')
          }
          else alert('signup failed')
        })
    })

    function get (path){
      return fetch(path)
    }


    function post (path, data){
      console.log(path, data)
      return window.fetch(path, { method  : "POST",
                                  headers : { "Accept"       : "application/json",
                                              "Content-Type" : "application/json" },
                                  body    : JSON.stringify(data) })
    }

  }
}
