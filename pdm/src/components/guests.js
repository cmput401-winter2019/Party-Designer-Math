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
        this.customize = false;
        this.angle = 0;

        // ---- guest buttons -----
        this.rotateBtn=this.scene.add.image(this.x+(this.displayWidth/2), this.y,'rotateBtn');
        this.rightBtn=this.scene.add.image(this.x+(this.displayWidth/2), this.y+this.rotateBtn.displayHeight,'rightBtn');
        this.rotateBtn.visible = false;
        this.rightBtn.visible = false;
        this.rightBtn.setInteractive();
        this.rotateBtn.setInteractive();
        this.rightBtn.on('pointerdown', this.hideButtons, this);
        this.rotateBtn.on('pointerdown', this.rotateGuest, this);

        this.scene.input.on('pointerup', function(pointer){
            var duration = pointer.getDuration();
            if (duration > 800){
                console.log("show buttons");
                if(this.customize == false){
                    this.showButtons();
                    this.customize = true;
                }
            }
        },this);


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
    showButtons(){
        this.alpha = 0.6;
        this.input.draggable = false;
        this.rotateBtn.x = this.x+(this.displayWidth/2);
        this.rotateBtn.y = this.y;
        this.rightBtn.x = this.rotateBtn.x;
        this.rightBtn.y = this.y+this.rotateBtn.displayHeight;
        this.rotateBtn.visible = true;
        this.rightBtn.visible = true;    
    }
    hideButtons(){
        this.alpha = 1;
        this.input.draggable = true;
        this.rotateBtn.visible = false;
        this.rightBtn.visible = false;   
        this.customize = false;
    }
    rotateGuest(){
        this.angle += 5;
        this.scene.tweens.add({targets: this,duration: 1000,y:this.y, angle:this.angle});
    }
}
