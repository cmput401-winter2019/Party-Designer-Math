import { ImageToProperties } from "../classes/imageToProperties";
import { Item } from "../classes/item";
import {CST} from "../CST";

export class Question extends Phaser.GameObjects.Container{ 
    constructor(scene, iName, amount){
        super(scene);
        //Initialize members
        this.scene = scene;
        this.imageName = iName;
        this.imageToProp = new ImageToProperties();
        this.properties = this.imageToProp.getProp(this.imageName);
        this.amount = amount;

        //Screen center
        var centerX = this.scene.game.config.width/2;
        var centerY = this.scene.game.config.height/2;

        //Configurations for text
        this.textConfig = {fontFamily:'Muli', color:'#000000', fontSize:'12px'};

        this.questionBackground = this.scene.add.rectangle(0, 0, this.scene.game.config.width*0.4, 90, 0xffffff);
        this.questionBackground.setOrigin(0.5,0.5);
        this.questionBackground.setStrokeStyle(1.5, 0x000000);
        this.questionText = this.scene.add.text(0, 0-20, "How much would it cost to buy " + this.amount + " " + this.properties.pluralName + "?", this.textConfig);
        this.questionText.setOrigin(0.5, 0.5);

        this.questionSubmitBackground = this.scene.add.rectangle(0, 0+25, 55, 15, 0x02C2FF);
        this.questionSubmitBackground.setStrokeStyle(1.5, 0xB2B3B4).setOrigin(0.5,0.5);
        this.questionSubmitText = this.scene.add.text(0, 0+25, "SUBMIT", {fontFamily:'Muli', color:'#ffffff', fontSize:'12px'});
        this.questionSubmitText.setOrigin(0.5,0.5);

        this.questionSubmitBackground.setInteractive();
        this.questionSubmitBackground.on('pointerdown', this.checkCreateObject, this);

        this.add(this.questionBackground);
        this.add(this.questionText);
        this.add(this.questionSubmitBackground);
        this.add(this.questionSubmitText);
        this.scene.add.existing(this);
        //this.scene.setOrigin(0,0);
        this.setSize(300, 90);//.setOrigin(0,0);
        this.x = centerX;
        this.y = centerY;

        //this.scene.game.debug.body(this);
        //Phaser.Actions.setOrigin([this.questionBackground], 0, 0);

        this.setInteractive();      
        
        this.scene.input.setDraggable(this);
    }
    checkCreateObject(){
        
        for (var i=0; i<this.amount; i++){
            //console.log("hi");
            var item = new Item(this.scene.originalS, this.imageName, this.x, this.y/2, this.properties.name, this.properties.pluralName, this.properties.category, this.properties.cost, this.properties.unit);
            
        }
        var scene = this.scene;     // must be here as this.scene is destroyed when container is destroyed
        this.destroy();
        scene.scene.sleep(CST.SCENES.BUY_POPUP);
    }
}
