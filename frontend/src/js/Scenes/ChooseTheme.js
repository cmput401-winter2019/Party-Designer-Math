import {CST} from "../CST";
import { ThemeButton } from "../Components/themeButton";

export class ChooseTheme extends Phaser.Scene {

    constructor() {
        super(CST.SCENES.CHOOSE_THEME);
    }
    preload()
    {
        this.load.image("theme1", "assets/images/Interface/theme1.svg");
        this.load.image("theme2", "assets/images/Interface/theme2.svg");
    }
    create(){
        this.themes = ["theme1","theme1","theme1","theme1","theme1","theme1","theme2","theme2","theme2","theme2","theme2"];


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
        var offset = this.game.config.width*0.25;
        var page=0;
        var min = this.themesInPage;

        this.setPage();
        this.showCurrentPage();
        
    }
    flipLeft(){
        this.hideCurrentPage();
    }
    pressed(){
        this.scene.start(CST.SCENES.PRELOADER);
    }
    showCurrentPage(){
        var min = this.themesInPage;
        if (this.currentPage+1==this.numOfPages && this.themesInLastPage!=0){
            min = this.themesInLastPage;
        }
        console.log(min, this.currentPage+1, this.numOfPages);
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
            let theme = new ThemeButton({scene:this, key:this.themes[i], x:newXPos*(1+(i%3)), y:newYPos, event:"pressed"});
            theme.visible = false;
            this.themeBtns.push(theme);
        }
    }
}
