export class Item extends Phaser.GameObjects.Sprite{ 
    constructor(scene, image, x, y, name, pluralName, category, unit){
        super(scene);
		this.scene = scene;
		this.scene.add.existing(this);
        this.image = image;
		this.setTexture(image);
		this.setPosition(x,y);
		this.setInteractive();
		this.scene.input.setDraggable(this);

		this.name = name;
        this.pluralName = pluralName;
        this.category = category;
        this.unit = unit;
        this.customize = false;
        this.angle = 0;
        this.inRoom = false;

        // ---- Item buttons -----
        this.rotateBtn = this.scene.add.image(this.x+(this.displayWidth/2), this.y,'rotateBtn');
        this.rightBtn = this.scene.add.image(this.x+(this.displayWidth/2), this.y+this.rotateBtn.displayHeight,'rightBtn');
        this.scaleBtn = this.scene.add.image(this.x+(this.displayWidth/2), this.y+(2*this.rotateBtn.displayHeight),'scaleBtn');
        this.rotateBtn.visible = false;
        this.rightBtn.visible = false;
        this.scaleBtn.visible = false;

        // ---- Set item buttons functions -----
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
            if (duration > 800 && (this.inRoom == true)){  // Condition: hold more than 800msec and item is in the room
                console.log("show buttons");
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
