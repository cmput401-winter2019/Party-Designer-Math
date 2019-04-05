import {CST} from "../CST";
import "babel-polyfill";

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

async function main(scene) {
  //Set the scene context
  const currentscene = scene;

  localStorage.setItem("theme_loaded" , false);
  localStorage.setItem("one_loaded"   , false);
  localStorage.setItem("two_loaded"   , false);
  localStorage.setItem("three_loaded" , false);

  //Generate or get gamestate
  const response = await get("http://127.0.0.1:5001/gamestate");
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    console.log("Something went wrong")
    console.log(data);
  }
  else {
    //if the theme is null then pick a theme
    if(data["theme"] == null) {
      console.log("Theme is null")
      console.log(data);
      currentscene.start(CST.SCENES.CHOOSE_THEME, data)
    }
    else {
      //this means you picked a theme but didnt design an invitation
      if (data["designedInvitation"] == false) {
        currentscene.start(CST.SCENES.PARTY_INVITATION, data)
      }
      else {
        currentscene.start(CST.SCENES.PRELOADER, data)
      }
    }
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
