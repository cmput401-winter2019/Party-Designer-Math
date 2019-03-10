import { ImageToProperties } from "../classes/imageToProperties";

export class Question extends Phaser.GameObjects.Container{ 
    constructor(scene, name, amount){
        super(scene);
        //Initialize members
        this.scene = scene;
        this.name = name;
        this.imageToProp = new ImageToProperties();
        this.pluralName = this.imageToProp.getProp(this.name).pluralName;
        this.amount = amount;

        //Configurations for text
        this.textConfig = {fontFamily:'Muli', color:'#000000', fontSize:'12px'};

        this.questionBackground = this.scene.add.rectangle(0, 0, this.scene.game.config.width*0.4, 90, 0xffffff);
        this.questionBackground.setOrigin(0.5,0.5);
        this.questionBackground.setStrokeStyle(1.5, 0x000000);
        this.questionText = this.scene.add.text(0, 0-20, "How much would it cost to buy " + this.amount + " " + this.pluralName + "?", this.textConfig);
        this.questionText.setOrigin(0.5, 0.5);

        this.questionSubmitBackground = this.scene.add.rectangle(0, 0+25, 55, 15, 0x02C2FF);
        this.questionSubmitBackground.setStrokeStyle(1.5, 0xB2B3B4).setOrigin(0.5,0.5);
        this.questionSubmitText = this.scene.add.text(0, 0+25, "SUBMIT", {fontFamily:'Muli', color:'#ffffff', fontSize:'12px'});
        this.questionSubmitText.setOrigin(0.5,0.5);

        this.add(this.questionBackground);
        this.add(this.questionText);
        this.add(this.questionSubmitBackground);
        this.add(this.questionSubmitText);
        this.scene.add.existing(this);
        //this.scene.setOrigin(0,0);
        this.setSize(300, 90);//.setOrigin(0,0);
        this.x = 350;
        this.y = 350;

        //this.scene.game.debug.body(this);
        //Phaser.Actions.setOrigin([this.questionBackground], 0, 0);

        this.setInteractive();      
        
        this.scene.input.setDraggable(this);
        
    }
}
