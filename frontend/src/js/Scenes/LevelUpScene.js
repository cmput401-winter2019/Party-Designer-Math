import { ProgressBar } from "../Components/progressBar";
import {CST} from "../CST";
import { RoundBtn } from "../Components/roundBtn";

export class LevelUpScene extends Phaser.Scene {

    constructor() {
        super(CST.SCENES.LEVEL_UP);
    }
    preload(){
        this.load.image("mountain",    "assets/images/Interface/mountain.png");
    }
    create(){
        // Background
        this.background = this.add.image(0, 0, "mountain");
        this.background.setOrigin(0,0);
        this.background.displayWidth  = this.game.config.width;
        this.background.scaleY        = this.background.scaleX;
        if(this.background.displayHeight< this.game.config.height){
            this.background.displayHeight = this.game.config.height;
            this.background.scaleX        = this.background.scaleY;
        }

        // Pecentages in this level
        var add = 0.5;
        var sub = 0.8;
        var mult = 0.9;
        var div = 0.7;
        var mix = 0.4;
        var overAll = (add+sub+mult+div+mix)/5;

        // Tranparent background
        var centerX=this.game.config.width/2;
        var centerY=this.game.config.height/2;
        this.rect = this.add.rectangle(centerX,
                                    centerY,
                                    this.game.config.width*0.8,
                                    this.game.config.height*0.75,
                                    0xffffff);
        this.rect.alpha = 0.3;
        this.rect.setOrigin(0.5,0.5);    

        // Text
        if (overAll<0.8){
            this.text = "Better Luck Next Time!";
        } else {
            this.text = "Congratulations!"
        }
        this.response = this.add.text(centerX, centerY-100, this.text, { fontFamily: "Muli",color: "#000000",fontSize: "40px"}).setOrigin(0.5,0.5);
        this.overallScore = this.add.text(centerX, centerY-50, "Your overall score is "+overAll*100+"%", { fontFamily: "Muli",color: "#000000",fontSize: "20px"}).setOrigin(0.5,0.5);
        

        // Bar
        var width = this.game.config.width/2;
        var height = 30; 
        var x = this.game.config.width/3;
        var y = this.game.config.height/2;    

        this.addBar = new ProgressBar({scene:this, width: width, height:height, x:x, y:y, color: 0x58D68D});
        this.subBar = new ProgressBar({scene:this, width: width, height:height, x:x, y:y+40, color: 0x58D68D});
        this.multBar = new ProgressBar({scene:this, width: width, height:height, x:x, y:y+80, color: 0x58D68D});
        this.divBar = new ProgressBar({scene:this, width: width, height:height, x:x, y:y+120, color: 0x58D68D});
        this.mixBar =new ProgressBar({scene:this, width: width, height:height, x:x, y:y+160, color: 0x58D68D});
        //this.overAllBar = new ProgressBar({scene:this, width: width, height:height, x:x, y:y+200, color: 0x58D68D});

        // Set values to bars
        this.addBar.setPercent(add);
        this.subBar.setPercent(sub);
        this.multBar.setPercent(mult);
        this.divBar.setPercent(div);
        this.mixBar.setPercent(mix);
        //this.overAllBar.setPercent(overAll);

        // Bar Tags
        this.textConfig = { fontFamily  : "Muli",
                            color       : "#000000",
                            fontSize    : "15px",
                            };

        this.texts = ["Addtion", "Subtraction", "Multiplication", "Division", "Mixed"];
        var textX = x - 100;
        for (var i=0; i<5; i++){
            this.add.text(textX, y+i*40, this.texts[i], this.textConfig);
        }

        // Continue Button
        this.continueBtn = new RoundBtn(this, 
                                        centerX, 
                                        y+6*40,
                                        "Continue",
                                        100,
                                        35);
        
    }
}