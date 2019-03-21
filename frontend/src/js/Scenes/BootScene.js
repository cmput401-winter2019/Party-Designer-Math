import {CST} from "../CST";

export class BootScene extends Phaser.Scene{
  constructor(){ super({key: CST.SCENES.BOOT}); }

  preload(){
    this.load.image("zenva_logo", "assets/example/zenva_logo.png");
  }

  create(){
    console.log(localStorage.getItem("access_token"));
    this.scene.start(CST.SCENES.PRELOADER);
  }
};
