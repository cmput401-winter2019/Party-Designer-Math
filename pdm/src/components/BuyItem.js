import {CST} from "../CST";
import { ImageToProperties } from "../classes/imageToProperties";
import { Question } from "./Question";
export class BuyItem extends Phaser.GameObjects.Container{ 
    constructor(scene, name, originalS){
        super(scene);
        //Initialize members
        this.scene = scene;
        this.name = name;
        this.originalS = originalS;

        // Initiate ImageToProperties class
        this.imageToProp = new ImageToProperties();

        //Screen center
        var centerX = this.scene.game.config.width/2;
        var centerY = this.scene.game.config.height/2;

        //Configurations for text
        this.textConfig = {fontFamily:'Muli', color:'#000000', fontSize:'12px'};
        this.textConfigForAmount = {fontFamily:'Muli', color:'#000000', fontSize:'12px'};
        this.textConfigForNumBtn = {fontFamily:'Muli', color:'#000000', fontSize:'18px'};

        //Create a rectangle background where everything for the prompt will be displayed on and add the text
        this.buyItemBackground = this.scene.add.rectangle(0, 0, this.scene.game.config.width*0.4, 90, 0xffffff);
        // this.buyItemBackground.setOrigin(0.5,0.5);
        this.buyItemBackground.setStrokeStyle(1.5, 0x000000);
        this.buyText = this.scene.add.text(0, 0-20, "How many "+ this.imageToProp.getProp(this.name).pluralName + " would you like to buy?", this.textConfig);
        this.buyText.setOrigin(0.5,0.5);

        //Create a rectangle background where the buy amount will be displayed on and add the buy amount
        this.buyAmountBackground = this.scene.add.rectangle(0, 0, 25, 15, 0xffffff);
        this.buyAmountBackground.setStrokeStyle(1.5, 0x000000);
        this.buyAmount = "1";
        this.buyAmountText= this.scene.add.text(0, 0, this.buyAmount, this.textConfigForAmount);
        this.buyAmountText.setOrigin(0.5,0.5);

        //Add a plus image to increase the buy amount and make it interactive
        this.buyAmountIncreaseButton = this.scene.add.text(0+25, 0, "+", this.textConfigForNumBtn).setOrigin(0.5,0.5);
        this.buyAmountIncreaseButton.setInteractive();
        this.buyAmountIncreaseButton.on("pointerup", ()=> {
            if (this.buyAmount < 9)
                this.buyAmount++;
            this.buyAmountText.text = this.buyAmount;
        });

        this.buyAmountDecreaseButton = this.scene.add.text(0-25, 0, "-", this.textConfigForNumBtn).setOrigin(0.5,0.5);
        this.buyAmountDecreaseButton.setInteractive();
        this.buyAmountDecreaseButton.on("pointerup", ()=> {
            if (this.buyAmount > 1)
                this.buyAmount--;
            this.buyAmountText.text = this.buyAmount;
        });

        //Create a rectangle background where the buy button text will be displayed on and add the text
        this.buyButton = this.scene.add.rectangle(0+45, 0+25, 35, 15, 0x02C2FF);
        this.buyButton.setStrokeStyle(1.5, 0xB2B3B4);
        this.buyButtonText = this.scene.add.text(0+33, 0+17, "BUY", {fontFamily:'Muli', color:'#ffffff', fontSize:'12px'});
        this.buyButton.setInteractive();

        this.cancelButton = this.scene.add.rectangle(0-45, 0+25, 35, 15, 0xffffff);
        this.cancelButton.setStrokeStyle(1.5, 0xB2B3B4);
        this.cancelButtonText = this.scene.add.text(0-55, 0+17, "NO", {fontFamily:'Muli', color:'#B2B3B4', fontSize:'12px'});
        this.cancelButton.setInteractive();

        //Add all objects to container
        this.add(this.buyItemBackground);
        this.add(this.buyText);
        this.add(this.buyAmountBackground);
        this.add(this.buyAmountText);
        this.add(this.buyAmountIncreaseButton);
        this.add(this.buyAmountDecreaseButton);
        this.add(this.buyButton);
        this.add(this.buyButtonText);
        this.add(this.cancelButton);
        this.add(this.cancelButtonText);
        this.scene.add.existing(this);

        this.setSize(this.scene.game.config.width*0.3, 90);//.setOrigin(0,0);
        this.x = centerX;
        this.y = centerY;
        this.setInteractive();
        this.scene.input.setDraggable(this);

        this.cancelButton.on('pointerdown', this.destroyContainer, this);
        this.buyButton.on('pointerdown', this.goToQuestion, this);
    }
    destroyContainer(){
        var scene = this.scene;     // must be here as this.scene is destroyed when container is destroyed
        this.destroy();
        scene.scene.sleep(CST.SCENES.BUY_POPUP);
    }
    goToQuestion(){
        var question = new Question(this.scene, this.name, this.buyAmount, this.originalS);
        this.destroy();
    }
}
