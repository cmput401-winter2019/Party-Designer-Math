import {CST} from "../CST";
import "babel-polyfill";

async function post(endpoint) {
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
  const userIsVerified = false;

  //Verify user
  const response = await get("http://127.0.0.1:5001/valid");
  if (response.ok) {
    userIsVerified = true;
  } 
  const data = await response.json();
  console.log(data);
}

export class BootScene extends Phaser.Scene{
  constructor(){ super({key: CST.SCENES.BOOT}); }

  preload(){
  }

  create(){
    main(this.scene);

  }
};

