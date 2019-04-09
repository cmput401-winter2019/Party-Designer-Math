import {CST} from "../CST.js";
import { RoundBtn } from "../Components/roundBtn.js";

export class Tutorial extends Phaser.Scene {

    constructor() {
        super(CST.SCENES.TUTORIAL);
    }

    preload()
    {
        this.load.image("p1",    "assets/images/p1.svg");
        this.load.image("p2",    "assets/images/p2.svg");
        this.load.image("p3",    "assets/images/p3.svg");

    }
    create(){
        
        // // background
        // this.rect = this.add.rectangle(this.game.config.width/2, this.game.config.height/2,
        //                             this.game.config.width*0.8,
        //                             this.game.config.height*0.75,
        //                             0xffffff);
        // this.rect.alpha = 0.5;
        // this.rect.setOrigin(0.5,0.5);


        // Page Images
        this.p1 = this.add.image(this.game.config.width/2, this.game.config.height/2, "p1");
        this.p2 = this.add.image(this.game.config.width/2, this.game.config.height/2, "p2");
        this.p3 = this.add.image(this.game.config.width/2, this.game.config.height/2, "p3");

        // Set dimensions
        this.p1.displayWidth = this.game.config.width*0.75;
        this.p2.displayWidth = this.game.config.width*0.75;
        this.p3.displayWidth = this.game.config.width*0.75;
        this.p1.scaleY = this.p1.scaleX;
        this.p2.scaleY = this.p2.scaleX;
        this.p3.scaleY = this.p3.scaleX;

        // Set origin
        this.p1.setOrigin(0.5,0.5);
        this.p2.setOrigin(0.5,0.5);
        this.p3.setOrigin(0.5,0.5);

        // Set visibility
        this.p2.alpha = 0;
        this.p3.alpha = 0;

        // Set Continue Button
        // Continue Button
        this.click = 0;
        this.continueBtn = new RoundBtn(this,
                                        this.p1.x+this.p1.displayWidth*0.375,
                                        this.p1.y-this.p1.displayHeight/2+60,
                                        "Next Page",
                                        100,
                                        35);
        this.continueBtn.rect.on("pointerdown", ()=>{
            this.click +=1;
            if (this.click == 1){
                this.p1.alpha = 0; 
                this.p2.alpha = 1;
            }
            else if (this.click==2){
                this.p2.alpha = 0;
                this.p3.alpha = 1;
            }
            else{
                this.p3.alpha = 0;
                this.scene.sleep(CST.SCENES.TUTORIAL);
            }
            
        });

    }
}
