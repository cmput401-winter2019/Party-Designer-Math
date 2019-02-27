export class Guest extends Phaser.GameObjects.Sprite{
    constructor(scene, image, x, y, name){
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

        this.displayWidth = 50;
        this.scaleY = this.scaleX;

        // ---- guest buttons -----
        this.rotateBtn = this.scene.add.image(this.x+(this.displayWidth/2), this.y,'rotateBtn').setScale(0.5,0.5);
        this.rightBtn = this.scene.add.image(this.x+(this.displayWidth/2), this.y+this.rotateBtn.displayHeight,'rightBtn').setScale(0.5,0.5);
        this.scaleBtn = this.scene.add.image(this.x+(this.displayWidth/2), this.y+(2*this.rotateBtn.displayHeight),'scaleBtn').setScale(0.5,0.5);
        this.rotateBtn.visible = false;
        this.rightBtn.visible = false;
        this.scaleBtn.visible = false;

        // ---- Set guest buttons functions -----
        this.rightBtn.setInteractive();
        this.rotateBtn.setInteractive();
        this.scaleBtn.setInteractive();
        this.rightBtn.on('pointerdown', this.hideButtons, this);
        this.rotateBtn.on('pointerdown', this.rotateGuest, this);
        this.scaleBtn.on('pointerdown', this.biggerGuest, this);

        // ---- Guest button only shows if hold was not caused by dragging ------
        this.on('pointerdown', function(pointer){
            this.wasDragging = false;
        }, this);
        this.on('pointerup', function(pointer){
            var duration = pointer.getDuration();
            if (duration > 800){
                if(this.customize == false && this.wasDragging == false){
                    this.showButtons();
                }
            }
        },this);
    }
    showButtons(){
        this.alpha = 0.6;
        this.input.draggable = false;
        this.rotateBtn.x = this.x+(this.displayWidth/2);
        this.rotateBtn.y = this.y;
        this.scaleBtn.x = this.rotateBtn.x;
        this.scaleBtn.y = this.y+this.rotateBtn.displayHeight;
        this.rightBtn.x = this.rotateBtn.x;
        this.rightBtn.y = this.rightBtn.y = this.y+(2*this.rotateBtn.displayHeight);

        this.rotateBtn.visible = true;
        this.scaleBtn.visible = true;
        this.rightBtn.visible = true;

    }
    hideButtons(){
        this.alpha = 1;
        this.input.draggable = true;
        this.rotateBtn.visible = false;
        this.scaleBtn.visible = false;
        this.rightBtn.visible = false;
        this.customize = false;
    }
    rotateGuest(){
        this.angle += 5;
        this.scene.tweens.add({targets: this,duration: 1000,y:this.y, angle:this.angle});
    }
    biggerGuest(){
        this.displayWidth+=2;
        this.scaleY=this.scaleX;
    }
    smallerGuest(){
        this.displayWidth-=2;
        this.scaleY=this.scaleX;
    }
}
