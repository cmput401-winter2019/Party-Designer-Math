import {CST} from "../CST";
import "babel-polyfill";

async function get(endpoint) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("access_token"),
  };
    
  const request = {
    method: "GET",
    mode: "cors",
    headers: headers
  };

  const response = await fetch(endpoint, request);

  return response;
}

async function main(scene) {
  //Set the scene context
  const currentscene = scene;

  //Verify user
  const response = await get("http://127.0.0.1:5001/gamestate");
  const data = await response.json();
  if (!response.ok) {
    console.log("Something went wrong")
    console.log(data);
  } 
  else {
    //gamestate was created so now pick a theme
    if (response.status === 201) {
      console.log("Gamestate was created");
      this.scene.start(CST.SCENES.CHOOSE_THEME)
    } 
    else {
      //if the theme is null then pick a theme
      if(data["theme"] === null) {
        console.log("Theme is null")
        this.scene.start(CST.SCENES.CHOOSE_THEME)
      } 
      //there exists a theme so start the game
      else {
        this.scene.start(CST.SCENES.GAME)
      }
    }


    console.log(data);
  }
}

export class BootScene extends Phaser.Scene{
  constructor(){ super({key: CST.SCENES.BOOT}); }

  preload(){
  }

  create(){
    main(this.scene);

  }
};

