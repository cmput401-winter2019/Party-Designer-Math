export class Guest extends Phaser.GameObjects.Sprite {

  constructor(scene, image, x, y, name) {
    super(scene);

    this.scene.add.existing(this);
    this.setTexture(image);
    this.setPosition(x,y);
    this.setInteractive();
    this.scene.input.setDraggable(this);

    this.scene        = scene;
    this.name         = name;
    this.type         = "guest";
    this.customize    = false;
    this.angle        = 0;
    this.displayWidth = (this.scene.game.config.width*0.07);
    this.scaleY       = this.scaleX;
  }

}
