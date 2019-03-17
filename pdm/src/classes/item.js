export class Item extends Phaser.GameObjects.Sprite{
    constructor(scene, image, x, y, name, pluralName, category, cost, unit){
        super(scene);
		this.scene = scene;
		this.scene.add.existing(this);
		this.setTexture(image);
		this.setPosition(x,y);
		this.setInteractive();
		this.scene.input.setDraggable(this);

        // Item properties
		this.name = name;
        this.type = "item";
        this.customize = false;
        this.angle = 0;
        this.pluralName = pluralName;
        this.category = category;
        this.cost = cost;
        this.unit = unit;

        this.displayWidth = this.scene.game.config.width*0.07;
        this.scaleY = this.scaleX;

        // ---- Item buttons -----
        this.rotateBtn = this.scene.add.image(0, 0,'rotateBtn');
        this.rotateBtn2 = this.scene.add.image(0, 0,'rotateBtn');
        this.scaleBtn = this.scene.add.image(0,0,'scaleBtn');
        this.smallerBtn = this.scene.add.image(0,0,'smallerBtn');
        this.forwardBtn = this.scene.add.image(0,0, 'forwardBtn').setOrigin(0.5,0);
        this.backwardBtn = this.scene.add.image(0,0, 'backwardBtn').setOrigin(0.5,0);
        this.rightBtn = this.scene.add.image(0,0,'rightBtn').setOrigin(0.5,-0.5);

        this.btnList = [this.rotateBtn, this.rotateBtn2, this.smallerBtn, this.scaleBtn, this.forwardBtn, this.backwardBtn, this.rightBtn];

        this.hideButtons();

        // ---- Set item buttons functions -----
        this.rightBtn.setInteractive();
        this.rotateBtn.setInteractive();
        this.rotateBtn2.setInteractive();
        this.scaleBtn.setInteractive();
        this.smallerBtn.setInteractive();
        this.forwardBtn.setInteractive();
        this.backwardBtn.setInteractive();

        this.rightBtn.on('pointerdown', this.hideButtons, this);
        this.rotateBtn.on('pointerdown', this.rotateGuest, this);
        this.rotateBtn2.on('pointerdown', this.rotateGuest2, this);
        this.scaleBtn.on('pointerdown', this.biggerGuest, this);
        this.smallerBtn.on('pointerdown', this.smallerGuest, this);
        this.forwardBtn.on('pointerdown', this.bringForward, this);
        this.backwardBtn.on('pointerdown', this.toBackpack, this);

        // ---- Item button only shows if hold was not caused by dragging ------
        this.on('pointerdown', function(pointer){
            this.wasDragging = false;
        }, this);
        this.on('pointerup', function(pointer){
            var duration = pointer.getDuration();
            if (duration > 300){
                if(this.customize == false && this.wasDragging == false){
                    this.showButtons();
                }
            }
        },this);
    }
    showButtons(){
        this.alpha = 0.6;
        this.input.draggable = false;
        var btnX = this.x+(this.displayWidth/2);
        var btnY = this.y-this.displayHeight/2;

        for (var i=0; i< this.btnList.length; i++){
            this.btnList[i].x = btnX;
            this.btnList[i].y = btnY+i*this.btnList[i].displayHeight;
            this.btnList[i].visible = true;
        }
    }
    hideButtons(){
        this.alpha = 1;
        this.input.draggable = true;

        for (var i=0; i< this.btnList.length; i++){
            this.btnList[i].visible = false;
        }

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
    bringForward(){

    }
    bringBackward(){

    }
    toBackpack(){

    }
}
