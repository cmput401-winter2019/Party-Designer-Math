export class Guest extends Phaser.GameObjects.Sprite{ 
    constructor(scene, image, x, y, name, type){
        super(scene);
		this.scene = scene;
		this.scene.add.existing(this);
		this.setTexture(image);
		this.setPosition(x,y);
		this.setInteractive();
		this.scene.input.setDraggable(this);

		this.name = name;
        this.type = "guest";



        // ------ drag logic ------
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        // ------ Check if drag is outside of background ------
        this.scene.input.on('dragend', function (pointer, gameObject, dragX, dragY) {
            if (gameObject.y < (76+(gameObject.height/2))|| gameObject.y > this.scene.background.displayHeight || gameObject.x < 0 || gameObject.x > gameObject.scene.game.config.width){
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            } 
        });
        // ------ ------ ------
    }
}
