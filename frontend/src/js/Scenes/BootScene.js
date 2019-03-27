import {CST} from "../CST";

export class BootScene extends Phaser.Scene{
  constructor(){ super({key: CST.SCENES.BOOT}); }

  preload(){
    //this.load.image("zenva_logo", "assets/example/zenva_logo.png");
  }

  create(){

    console.log(localStorage.getItem("access_token"));
    console.log(localStorage.getItem("refresh_token"));

    return fetch("http://127.0.0.1:5001/valid", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access_token"),
        }
      })
      .then(
        response => {
          // Examine the text in the response
          response.json().then(data => {
            if (response.status !== 200) {
                console.log(response.status + " Error");
                console.log(data);
                return;
            }
            console.log("token is valid");
            this.scene.start(CST.SCENES.CHOOSE_THEME);
          });
        }
      )
  }
};
