export class TopMenu extends Phaser.GameObjects.Container{ 
    constructor(config){
		super(config.scene);
        this.scene = config.scene;
        this.exitBtn = this.scene.add.image(30,30,"exitBtn");
    }
}
