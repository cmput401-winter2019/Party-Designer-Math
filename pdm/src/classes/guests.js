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

        this.displayWidth = this.scene.game.config.width*0.07;
        this.scaleY = this.scaleX;

        // ---- guest buttons -----
        this.rotateBtn = this.scene.add.image(0, 0,'rotateBtn').setScale(0.5,0.5);
        this.rotateBtn2 = this.scene.add.image(0, 0,'rotateBtn').setScale(0.5,0.5);
        this.rightBtn = this.scene.add.image(0,0,'rightBtn').setScale(0.5,0.5);
        this.scaleBtn = this.scene.add.image(0,0,'scaleBtn').setScale(0.5,0.5);
        this.smallerBtn = this.scene.add.image(0,0,'smallerBtn').setScale(0.5,0.5);
        this.rotateBtn.visible = false;
        this.rotateBtn2.visible = false;
        this.rightBtn.visible = false;
        this.scaleBtn.visible = false;
        this.smallerBtn.visible = false;

        // ---- Set guest buttons functions -----
        this.rightBtn.setInteractive();
        this.rotateBtn.setInteractive();
        this.rotateBtn2.setInteractive();
        this.scaleBtn.setInteractive();
        this.smallerBtn.setInteractive();

        this.rightBtn.on('pointerdown', this.hideButtons, this);
        this.rotateBtn.on('pointerdown', this.rotateGuest, this);
        this.rotateBtn2.on('pointerdown', this.rotateGuest2, this);
        this.scaleBtn.on('pointerdown', this.biggerGuest, this);
        this.smallerBtn.on('pointerdown', this.smallerGuest, this);

        // ---- Guest button only shows if hold was not caused by dragging ------
        this.on('pointerdown', function(pointer){
            this.wasDragging = false;
        }, this);
        this.on('pointerup', function(pointer){
            var duration = pointer.getDuration();
            if (duration > 500){
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
        this.rotateBtn.y = this.y-(2*this.rotateBtn.displayHeight);
        this.rotateBtn2.x = this.rotateBtn.x;
        this.rotateBtn2.y = this.y-this.rotateBtn.displayHeight;
        this.smallerBtn.x = this.rotateBtn.x;
        this.smallerBtn.y = this.y;
        this.scaleBtn.x = this.rotateBtn.x;
        this.scaleBtn.y = this.y+this.rotateBtn.displayHeight;
        this.rightBtn.x = this.rotateBtn.x;
        this.rightBtn.y = this.rightBtn.y = this.y+(2*this.rotateBtn.displayHeight);
        
        this.rotateBtn.visible = true;
        this.rotateBtn2.visible = true;
        this.scaleBtn.visible = true;
        this.rightBtn.visible = true;
        this.smallerBtn.visible = true;

    }
    hideButtons(){
        this.alpha = 1;
        this.input.draggable = true;
        this.rotateBtn.visible = false;
        this.rotateBtn2.visible = false;
        this.scaleBtn.visible = false;
        this.rightBtn.visible = false;
        this.smallerBtn.visible = false;
        this.customize = false;
    }
    rotateGuest(){
        this.angle += 5;
        this.scene.tweens.add({targets: this,duration: 100,y:this.y, angle:this.angle});
    }
    rotateGuest2(){
        this.angle -= 5;
        this.scene.tweens.add({targets: this,duration: 100,y:this.y, angle:this.angle});
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
