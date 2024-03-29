import {CST} from "../CST.js";
import { ThemeButton } from "../Components/themeButton.js";

export class ChooseTheme extends Phaser.Scene {

    constructor() {
        super(CST.SCENES.CHOOSE_THEME);
    }

    init (gamestate) {
        this.gamestate = gamestate;
    }
    preload()
    {
        // Load all themes
        this.themes = ["theme1","theme2","theme3"];
        for (var i=0; i<this.themes.length; i++){
            this.load.image(this.themes[i], "assets/images/Interface/"+this.themes[i]+".svg");
        }
        this.load.image("back", "assets/images/Interface/themeBack.svg" )
    }
    create(){
        // Background
        this.pinkBackground = this.add.image(0,0, "back").setOrigin(0,0);
        this.pinkBackground.displayWidth = this.game.config.width;
        this.pinkBackground.displayHeight = this.game.config.height;

        // Tranparent background
        this.rect = this.add.rectangle(this.game.config.width/2,
                                    this.game.config.height/2,
                                    this.game.config.width*0.8,
                                    this.game.config.height*0.75,
                                    0xffffff);
        this.rect.alpha = 0.3;
        this.rect.setOrigin(0.5,0.5);



        // Title
        this.textConfig = { fontFamily  : "Muli",
                        color       : "#ffffff",
                        fontSize    : "40px"
                        };

        this.title = this.add.text(this.game.config.width/2,
                                        45,
                                        "Choose a Party Theme!",
                                        this.textConfig).setOrigin(0.5,0.5);

        //Page setups & initialization of page variables
        this.themesInPage = 6
        this.themesInLastPage = this.themes.length%this.themesInPage;
        this.numOfPages = Math.ceil(this.themes.length/this.themesInPage);
        this.currentPage = 0;

        this.themeBtns = [];


        this.leftBtn = this.add.text(10,this.game.config.height/2,"<", {fontFamily:'Muli', color:'#ffffff', fontSize:'50px'});
        this.rightBtn = this.add.text(this.game.config.width-50,this.game.config.height/2,">", {fontFamily:'Muli', color:'#ffffff', fontSize:'50px'});
        this.leftBtn.setInteractive();
        this.rightBtn.setInteractive();
        this.leftBtn.on("pointerdown", ()=>{
            if (this.currentPage>0){
                this.hideCurrentPage();
                this.currentPage -=1;
                this.showCurrentPage();
            }
        });
        this.rightBtn.on("pointerdown", ()=>{
            if (this.currentPage+1<this.numOfPages){
                this.hideCurrentPage();
                this.currentPage +=1;
                this.showCurrentPage();
            }
        });

        this.yPos = this.game.config.height*0.3;
        this.xPos = this.game.config.width*0.25;

        this.setPage();
        this.showCurrentPage();

    }
    flipLeft(){
        this.hideCurrentPage();
    }

    showCurrentPage(){
        var min = this.themesInPage;
        if (this.currentPage+1==this.numOfPages && this.themesInLastPage!=0){
            min = this.themesInLastPage;
        }
        //console.log(min, this.currentPage+1, this.numOfPages);
        for(var i = this.currentPage*this.themesInPage; i < this.currentPage*this.themesInPage+min; i++){
            this.themeBtns[i].visible = true;
        }
    }
    hideCurrentPage(){
        var min = this.themesInPage;
        if (this.currentPage+1==this.numOfPages && this.themesInLastPage!=0){
            min = this.themesInLastPage;
        }
        for(var i = this.currentPage*this.themesInPage; i < this.currentPage*this.themesInPage+min; i++){
            this.themeBtns[i].visible = false;
        }
    }

    setPage(){
        for(var i=0; i<this.themes.length; i++){
            if (i==0 || (i%6==0)){       // if index is 0 or is divisble by 6
                var newXPos = this.xPos;
                var newYPos = this.yPos;
            } else if (i%3==0){              // if index is divisible by 3 (& not divisible by 6)
                var newXPos = this.xPos;
                var newYPos = this.yPos*2;
            }
            let theme = new ThemeButton({scene:this, key:this.themes[i], x:newXPos*(1+(i%3)), y:newYPos, event:"pressed", gamestate:this.gamestate});
            theme.visible = false;
            this.themeBtns.push(theme);
        }
    }
}
