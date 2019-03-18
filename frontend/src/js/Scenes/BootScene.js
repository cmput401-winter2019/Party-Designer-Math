export class BootScene extends Phaser.Scene{
  constructor(){ super("Boot"); }

  preload(){
    this.load.image("zenva_logo", "assets/example/zenva_logo.png");
  }

  create(){

    this.scene.start("Preloader");
  }
};
