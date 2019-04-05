import { ProgressBar } from "../Components/progressBar";
import {CST} from "../CST";
import { RoundBtn } from "../Components/roundBtn";
import { UpdatePlaythrough, DropQuestionRequest } from "../Components/scripts";
import { User } from "../classes/user";

export class LevelUpScene extends Phaser.Scene {

    constructor() {
        super(CST.SCENES.LEVEL_UP);
    }
    init(data)
    {
        this.player         = data.player;
        this.add_correct    = data.add_correct;
        this.add_wrong      = data.add_wrong;
        this.sub_correct    = data.sub_correct;
        this.sub_wrong      = data.sub_wrong;
        this.mult_correct   = data.mult_correct;
        this.mult_wrong     = data.mult_wrong;
        this.div_correct    = data.div_correct;
        this.div_wrong      = data.div_wrong;
        this.mixed_correct  = data.mixed_correct;
        this.mixed_wrong    = data.mixed_wrong;
    }
    preload(){
        this.load.image("mountain",    "assets/images/Interface/mountain.png");
    }
    create(){

        this.player.increaseLevel();

        const url = "http://127.0.0.1:5001/updateplaythrough";

        UpdatePlaythrough(this.player.id, this.player.level, url).then(data => {
          console.log(data);
        })

        this.centerX=this.game.config.width/2;
        this.centerY=this.game.config.height/2;
        this.setBackground();

        // --------------------- Set scores from API ----------------------
        // Scores in THIS LEVEL
        this.addCorrect   = this.add_correct.length;
        this.addAnswered  = this.add_correct.length + this.add_wrong.length;

        this.subCorrect   = this.sub_correct.length;
        this.subAnswered  = this.sub_correct.length + this.sub_wrong.length;

        this.multCorrect  = this.mult_correct.length;
        this.multAnswered = this.mult_correct.length + this.mult_wrong.length;

        this.divCorrect   = this.div_correct.length;
        this.divAnswered  = this.div_correct.length + this.div_wrong.length;

        this.mixCorrect   = this.mixed_correct.length;
        this.mixAnswered  = this.mixed_correct.length + this.mixed_wrong.length;

        this.currentLevel = (this.addCorrect+this.subCorrect+this.multCorrect+this.divCorrect+this.mixCorrect)/(this.addAnswered+this.subAnswered+this.multAnswered+this.divAnswered+this.mixAnswered);

        // Percentages OVERALL (from all play throughs)
        this.addOverall     = this.addCorrect  / this.addAnswered;
        this.subOverall     = this.subCorrect  / this.subAnswered;
        this.multOverall    = this.multCorrect / this.multAnswered;
        this.divOverall     = this.divCorrect  / this.divAnswered;
        this.mixOverall     = this.mixCorrect  / this.mixAnswered;
        this.overallOverall = (this.addOverall+this.subOverall+this.multOverall+this.divOverall+this.mixOverall)/5;
        // --------------------------------------------------------------

        this.setTitles();
        this.setBars();
        this.showTags(this.centerX-60);
        this.showCurrentLevelScores(this.centerX+50);

        // Continue Button
        this.click = 0;
        this.continueBtn = new RoundBtn(this,
                                        this.centerX,
                                        this.barY+6*40,
                                        "Continue",
                                        100,
                                        35);
        this.continueBtn.rect.on("pointerdown", ()=>{
            this.click +=1;
            if (this.click == 1){
                this.showOverallReport();
            }
            else {
                const drop_url = "http://127.0.0.1:5001/dropquestion";
                DropQuestionRequest(this.player.gs_id, drop_url).then(data => {})

                this.scene.start(CST.SCENES.CHOOSE_THEME);
            }
        });
    }

    showOverallReport(){
        // Hide current Level Scores
        for(var i=0; i<this.textObjects.length; i++){
            this.textObjects[i].alpha = 0;
        }
        // Move tags
        for(var i=0; i<this.textObjects.length; i++){
            this.tags[i].x = this.barX-100;
        }
        // Show Bars
        for(var i=0; i<this.bars.length; i++){
            this.bars[i].alpha=1;
        }
        // Change subtitle
        this.subtitle.text = "Your OVERALL SCORE is "+(this.overallOverall*100).toFixed(2)+"%";
    }
    setTitles(){
        // Title & Subtitle Text
        if (this.currentLevel<0.8){
            this.text = "Better Luck Next Time!";
        } else {
            this.text = "Congratulations!"
        }
        this.title = this.add.text(this.centerX, this.centerY-100, this.text, { fontFamily: "Muli",color: "#000000",fontSize: "40px"}).setOrigin(0.5,0.5);
        this.subtitle = this.add.text(this.centerX, this.centerY-50, "Your score in this level is "+(this.currentLevel*100).toFixed(2)+"%", { fontFamily: "Muli",color: "#000000",fontSize: "20px"}).setOrigin(0.5,0.5);
    }
    setBars(){
        // Overall Bar
        var width = this.game.config.width/2;
        var height = 30;
        this.barX = this.game.config.width/3;
        this.barY = this.game.config.height/2;

        this.addBar   = new ProgressBar({scene:this, width: width, height:height, x:this.barX, y:this.barY,     color: 0x58D68D});
        this.subBar   = new ProgressBar({scene:this, width: width, height:height, x:this.barX, y:this.barY+40,  color: 0x58D68D});
        this.multBar  = new ProgressBar({scene:this, width: width, height:height, x:this.barX, y:this.barY+80,  color: 0x58D68D});
        this.divBar   = new ProgressBar({scene:this, width: width, height:height, x:this.barX, y:this.barY+120, color: 0x58D68D});
        this.mixBar   = new ProgressBar({scene:this, width: width, height:height, x:this.barX, y:this.barY+160, color: 0x58D68D});

        // Set values to bars
        this.addBar.setPercent(this.addOverall);
        this.subBar.setPercent(this.subOverall);
        this.multBar.setPercent(this.multOverall);
        this.divBar.setPercent(this.divOverall);
        this.mixBar.setPercent(this.mixOverall);

        // Hide all bars
        this.bars = [this.addBar, this.subBar, this.multBar, this.divBar, this.mixBar];
        for(var i=0; i<this.bars.length; i++){
            this.bars[i].alpha=0;
        }
    }
    showCurrentLevelScores(textX){
        // Show Current Level Scores
        this.currentLevelScores = [this.addCorrect, this.subCorrect, this.multCorrect, this.divCorrect, this.mixCorrect];
        this.currentLevelAnswered = [this.addAnswered, this.subAnswered, this.multAnswered, this.divAnswered, this.mixAnswered];
        this.textObjects = []
        for (var i=0; i<this.texts.length; i++){
            var text = this.add.text(textX, this.barY+i*40, this.currentLevelScores[i]+"/"+this.currentLevelAnswered[i], this.textConfig);
            this.textObjects.push(text);
        }
    }
    showTags(textX){
        // Tags
        this.textConfig = { fontFamily  : "Muli",
                            color       : "#000000",
                            fontSize    : "15px",
                            };

        this.texts = ["Addtion", "Subtraction", "Multiplication", "Division", "Mixed"];
        this.tags = [];
        for (var i=0; i<this.texts.length; i++){
            var text = this.add.text(textX, this.barY+i*40, this.texts[i], this.textConfig);
            this.tags.push(text);
        }
    }
    setBackground(){
        // Set background
        this.background = this.add.image(0, 0, "mountain");
        this.background.setOrigin(0,0);
        this.background.displayWidth  = this.game.config.width;
        this.background.scaleY        = this.background.scaleX;
        if(this.background.displayHeight< this.game.config.height){
            this.background.displayHeight = this.game.config.height;
            this.background.scaleX        = this.background.scaleY;
        }

        // Tranparent background
        this.rect = this.add.rectangle(this.centerX,
                                    this.centerY,
                                    this.game.config.width*0.8,
                                    this.game.config.height*0.75,
                                    0xffffff);
        this.rect.alpha = 0.3;
        this.rect.setOrigin(0.5,0.5);
    }

}
