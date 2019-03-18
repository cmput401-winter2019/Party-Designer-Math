import { ImageToProperties } from "../classes/imageToProperties";

export class ItemToRoomPopup extends Phaser.GameObjects.Container{ 
    constructor(scene, imageName, maxNum){
        super(scene);
        this.scene = scene;
        this.imageName = imageName;
        this.max = maxNum;
        console.log(imageName, "can have a max of",this.max);
       

        // Initiate ImageToProperties class
        this.imageToProp = new ImageToProperties();

        //Screen center
        var centerX = this.scene.game.config.width/2;
        var centerY = this.scene.game.config.height/2;

        this.textConfig = {fontFamily:'Muli', color:'#000000', fontSize:'12px'};

        //Create a rectangle background where everything for the prompt will be displayed on and add the text
        this.background = this.scene.add.rectangle(0, 0, this.scene.game.config.width*0.4, 90, 0xffffff);
        this.background.setStrokeStyle(1.5, 0x000000);
        this.askText = this.scene.add.text(0, 0-20, "How many "+ this.imageToProp.getProp(this.imageName).pluralName +
         " do you want to move into your room?", this.textConfig);
        this.askText.setOrigin(0.5,0.5);

        //Confirm and cancel buttons
        this.confirmButton = this.scene.add.rectangle(0+45, 0+25, 35, 15, 0x02C2FF);
        this.confirmButton.setStrokeStyle(1.5, 0xB2B3B4);
        this.confirmButtonText = this.scene.add.text(0+33, 0+17, "OK", {fontFamily:'Muli', color:'#ffffff', fontSize:'12px'});
        this.confirmButton.setInteractive();

        this.cancelButton = this.scene.add.rectangle(0-45, 0+25, 35, 15, 0xffffff);
        this.cancelButton.setStrokeStyle(1.5, 0xB2B3B4);
        this.cancelButtonText = this.scene.add.text(0-55, 0+17, "No", {fontFamily:'Muli', color:'#B2B3B4', fontSize:'12px'});
        this.cancelButton.setInteractive();

        //Add all objects to container
        this.add(this.background);
        this.add(this.askText);
        this.add(this.confirmButton);
        this.add(this.confirmButtonText);
        this.add(this.cancelButton);
        this.add(this.cancelButtonText);
        this.scene.add.existing(this);

        this.setSize(this.scene.game.config.width*0.3, 90);//.setOrigin(0,0);
        this.x = centerX;
        this.y = centerY;
        this.setInteractive();
        this.scene.input.setDraggable(this);

        this.cancelButton.on('pointerdown', this.destroyContainer, this);
        this.confirmButton.on('pointerdown', this.itemtoRoom, this);
    }
    destroyContainer(){
        this.scene.popupOpen = false;
        this.destroy();
    }
    itemtoRoom(){

    }
}