import {CST} from "../CST";

export class BootScene extends Phaser.Scene{
  constructor(){ super({key: CST.SCENES.BOOT}); }

  preload(){
    this.load.image("zenva_logo", "assets/example/zenva_logo.png");
  }

  create(){

    this.scene.start(CST.SCENES.PRELOADER);
  }
};
