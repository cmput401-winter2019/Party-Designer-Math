import { CheckToBackpack } from "../Components/checkToBackpack";

export class Item extends Phaser.GameObjects.Sprite{
    constructor(scene, image, x, y, name, pluralName, category, cost, purpose){
        super(scene);

      	this.scene = scene;
      	this.scene.add.existing(this);

      	this.setTexture(image);
      	this.setPosition(x,y);
      	this.setInteractive();

      	this.scene.input.setDraggable(this);

        // Item properties
      	this.name         = name;
        this.imageName    = image;
        this.type         = "item";
        this.angle        = 0;
        this.pluralName   = pluralName;
        this.category     = category;
        this.cost         = cost;
        this.purpose      = purpose;

        this.displayWidth = this.scene.game.config.width*0.07;
        this.scaleY       = this.scaleX;
        if (this.displayHeight > this.scene.background.displayHeight*0.5){
            this.displayHeight = this.scene.background.displayHeight*0.5;
            this.scaleX = this.scaleY;
        }

        // ---- Item buttons -----
        this.crossBtn = this.scene.add.image(0,0, 'crossBtn');
        this.rotateBtn = this.scene.add.image(0, 0,'rotateBtn');
        this.rotateBtn2 = this.scene.add.image(0, 0,'rotateBtn');
        this.scaleBtn = this.scene.add.image(0,0,'scaleBtn');
        this.smallerBtn = this.scene.add.image(0,0,'smallerBtn');
        this.forwardBtn = this.scene.add.image(0,0, 'forwardBtn').setOrigin(0.5,0);
        this.backwardBtn = this.scene.add.image(0,0, 'Bag').setOrigin(0.5,0);
        this.rightBtn = this.scene.add.image(0,0,'rightBtn').setOrigin(0.5,-0.5);


        this.btnList = [this.crossBtn, this.rotateBtn, this.rotateBtn2, this.smallerBtn, this.scaleBtn, this.forwardBtn, this.backwardBtn, this.rightBtn];

        // Tranparent background
        this.rect = this.scene.add.rectangle(0,
                                             0,
                                             this.crossBtn.displayWidth+10,
                                             this.crossBtn.displayHeight*13,
                                             0x3498DB);
        this.rect.alpha=0.3;
        this.rect.setOrigin(0.5,0);
        this.hideButtons();

        // ---- Set item buttons functions -----
        for (var i=0; i<this.btnList.length; i++){ this.btnList[i].setInteractive(); }

        this.rightBtn   .on('pointerdown', this.hideButtons,  this);
        this.rotateBtn  .on('pointerdown', this.rotateGuest,  this);
        this.rotateBtn2 .on('pointerdown', this.rotateGuest2, this);
        this.scaleBtn   .on('pointerdown', this.biggerGuest,  this);
        this.smallerBtn .on('pointerdown', this.smallerGuest, this);
        this.forwardBtn .on('pointerdown', this.bringForward, this);
        this.backwardBtn.on('pointerdown', this.toBackpack,   this);

        // ---- Item button only shows if hold was not caused by dragging ------
        this.on('pointerdown', function(pointer){
            this.wasDragging = false;
        }, this);

        this.on('pointerup', function(pointer){
            var duration = pointer.getDuration();
            if (duration > 300){
                if(this.inRoom == true && this.wasDragging == false){
                    this.showButtons();
                }
            }
        },this);

        if(this.purpose == "load"){

        }else if(this.purpose == "show") {
            this.toScreen(this.imageName);
        }else if(this.purpose == "moveFromBackpack") {
            this.moveFromBackpack(this.imageName);
        }

        // If item is for the inivitation page, remove backpack button
        if(category == "n/a"){
            // Allow destroying of item
            this.crossBtn.on('pointerdown', this.deleteItem, this);
            // No backpack button
            this.backwardBtn.destroy();
            var index = this.btnList.indexOf(this.backwardBtn);
            if(index > -1){
                this.btnList.splice(index, 1);
            }
        }else{
            // If item is not in the invitation page, then it is an 'inRoom' item;
            this.inRoom = true;
        }
    }

    showButtons(){
        this.alpha            = 0.6;
        this.input.draggable  = false;
        this.btnX             = this.x+(this.displayWidth/2);
        this.btnY             = this.y-this.displayHeight/2;

        this.rect.depth = 3;

        for (var i=0; i< this.btnList.length; i++){
            this.btnList[i].x       = this.btnX;
            this.btnList[i].y       = this.btnY+i*this.btnList[i].displayHeight;
            this.btnList[i].visible = true;
            this.btnList[i].setDepth(this.rect.depth+1);
        }

        // Transparent rectangle position
        this.rect.x = this.crossBtn.x;
        this.rect.y = this.crossBtn.y-this.crossBtn.displayHeight;
        this.rect.alpha=0.3;

    }

    hideButtons(){
        this.alpha            = 1;
        this.input.draggable  = true;

        for (var i=0; i< this.btnList.length; i++){
            this.btnList[i].visible = false;
        }
        this.rect.alpha = 0;
    }

    destroyButtons(){
        this.rect.destroy();
        for (var i=0; i< this.btnList.length; i++){
            this.btnList[i].destroy();
        }
    }

    rotateGuest(){
        this.angle += 20;
        this.scene.tweens.add({targets: this,duration: 100,y:this.y, angle:this.angle});
    }
    rotateGuest2(){
        this.angle -= 20;
        this.scene.tweens.add({targets: this,duration: 100,y:this.y, angle:this.angle});
    }
    biggerGuest(){
        this.displayWidth += 20;
        this.scaleY       = this.scaleX;
    }
    smallerGuest(){
        this.displayWidth -= 20;
        this.scaleY       = this.scaleX;
    }

    bringForward(){
        this.newItem = this.scene.add.existing(new Item(this.scene, this.imageName, this.x, this.y, this.name, this.pluralName, this.category, this.cost, "load"));
        this.newItem.showButtons();
        this.destroyButtons();
        this.destroy();
    }

    bringBackward(){}

    toScreen(imageName){
        this.scene.player.putIntoScreenItems(imageName);
        //console.log(this.scene.player);
    }
    moveFromBackpack(imageName){
        this.scene.player.putItemFromBackpackToScreen(imageName);
    }
    toBackpack(){
        this.popup = new CheckToBackpack(this.scene, this);
        this.popup.depth+=1;
    }
    deleteItem(){
        this.destroyButtons();
        this.destroy();
    }

}
