import {CST} from "../CST";
import { ButtonAtBottom } from "../Components/buttonAtBottom";
import { Item } from "../classes/item";
import { ButtonAtMenu } from "../Components/buttonAtMenu";

export class PartyInvitation extends Phaser.Scene {

    constructor(){
        super(CST.SCENES.PARTY_INVITATION);
    }

    init(data){
        this.setDragLogic();
        this.imageChoice = data.imageChoice;
        this.iter        = data.iter;
        this.player      = data.player;
    }

    preload(){
      this.load.image("rotateBtn",      "assets/images/Interface/RotateBtn.svg");
      this.load.image("rightBtn",       "assets/images/Interface/Right.svg");
      this.load.image("scaleBtn",       "assets/images/Interface/ScaleBtn.svg");
      this.load.image("smallerBtn",     "assets/images/Interface/ScaleSmaller.svg");
      this.load.image("forwardBtn",     "assets/images/Interface/Forward.svg");
      this.load.image("backwardBtn",    "assets/images/Interface/Backward.svg");
      this.load.image("crossBtn",       "assets/images/Interface/Cross.svg");

      if(this.imageChoice == "theme1"){
        this.pathToInvite     = "assets/images/Invitations/spaceroom/";
        this.pathToStickers   = "assets/images/Invitations/spaceStickers/";
        this.firstColor       = 0x0e4361;
        this.secondColor      = 0x53d7d3;
      } else if (this.imageChoice == "theme2"){
        this.pathToInvite     = "assets/images/Invitations/playground/";
        this.pathToStickers   = "assets/images/Invitations/playStickers/";
        this.firstColor       = 0x026633;
        this.secondColor      = 0xaebc4a;
      } else if (this.imageChoice == "theme3"){
        this.pathToInvite     = "assets/images/Invitations/beach/";
        this.pathToStickers   = "assets/images/Invitations/beachStickers/";
        this.firstColor       = 0xb7873e;
        this.secondColor      = 0xf7ce7a;
      }

      // Load invitation page and sendButton of chosen theme
      this.inviteAssets = ["invite", "sendButton"];
      for (var i=0; i<this.inviteAssets.length; i++){
         this.load.image(this.inviteAssets[i], this.pathToInvite+this.inviteAssets[i]+".png");
      }

      // Load all stickers of chosen theme
      this.numOfStickers=13;
      for (var i=1; i<this.numOfStickers+1; i++){
        this.load.image("sticker"+i, this.pathToStickers+"sticker"+i+".svg");
      }
    }

    create(){

      console.log(this.imageChoice, this.iter);

      this.itemWidth = 80;

      this.currentPage      = 0;
      this.numItemPerPage   = Math.floor((this.game.config.width*0.8)/(this.itemWidth*1.05));
      this.numItemLastPage  = this.numOfStickers%this.numItemPerPage;
      this.numOfPages       = Math.ceil(this.numOfStickers/this.numItemPerPage);

      console.log(this.currentPage, this.numItemPerPage, this.numItemLastPage, this.numOfPages);

      this.setBackground();
      this.setSendButton();
      this.setPageTurners();
      this.setItems();

    }
    pressed(){
        this.scene.start(CST.SCENES.PRELOADER, {firstColor: this.firstColor, secondColor:this.secondColor, imageChoice:this.imageChoice, iter:this.iter, player:this.player});
    }
    createItem(image, x, y, name, pluralName, category) {
      this.newItem = this.add.existing(new Item(this, image, x, y, name, pluralName, category, unit));
    }
    setBackground(){
      // Set background Image
      this.background = this.add.image(0, 75, "invite");
      this.background.setOrigin(0,0);
      this.background.displayWidth  = this.game.config.width;
      this.background.scaleY        = this.background.scaleX;
      if((this.game.config.height - (this.background.displayHeight + 75)) < 130){
        console.log('Warning, distorted background');
        this.background.displayHeight = this.game.config.height - 75 - 130;
        this.background.displayWidth  = this.game.config.width;
      }
      // Set header
      this.header = this.add.rectangle(0,
                                        0,
                                        this.game.config.width,
                                        75,
                                        this.secondColor).setOrigin(0,0);
      this.header.setStrokeStyle(2, 0xffffff);
    }
    setSendButton(){
      // Set sendButton
      this.sendButton = new ButtonAtMenu({scene:this, key: "sendButton", x:this.game.config.width*0.75, y: this.background.displayHeight});
      this.sendButton.on('pointerup', this.pressed, this);
    }
    showCurrentPage(){
      var min = this.numItemPerPage;
      if (this.currentPage+1==this.numOfPages && this.numItemLastPage!=0){
        min = this.numItemLastPage;
      }
      for(var i=this.currentPage*this.numItemPerPage; i<this.currentPage*this.numItemPerPage+min; i++){
        this.stickers[i].alpha=1;
      }
    }
    hideCurrentPage(){
      var min = this.numItemPerPage;
      if (this.currentPage+1==this.numOfPages && this.numItemLastPage!=0){
        min = this.numItemLastPage;
      }
      for(var i=this.currentPage*this.numItemPerPage; i<this.currentPage*this.numItemPerPage+min; i++){
        this.stickers[i].alpha=0;
      }
    }
    setPageTurners(){
      // Draw page turner
      this.rectLeft = this.add.rectangle(0,
                                        75+this.background.displayHeight,
                                        this.background.displayWidth*0.1,
                                        this.game.config.height - (this.background.displayHeight + 75),
                                        this.secondColor);
      this.rectLeft.setOrigin(0,0);
      this.rectLeft.setStrokeStyle(1, this.firstColor);
      this.rectRight = this.add.rectangle(this.game.config.width-this.background.displayWidth*0.1,
                                          75+this.background.displayHeight,
                                          this.background.displayWidth*0.1,
                                          this.game.config.height - (this.background.displayHeight + 75),
                                          this.secondColor);
      this.rectRight.setStrokeStyle(1, this.firstColor);
      this.rectRight.setOrigin(0,0);
      this.rectLeft.setInteractive();
      this.rectRight.setInteractive();

      // Title
        this.textConfig = { fontFamily  : "Muli",
                        color       : "#ffffff",
                        fontSize    : "40px"
                        };

        this.title = this.add.text(this.game.config.width/2,
                                        45,
                                        "Make a Party Invitation!",
                                        this.textConfig).setOrigin(0.5,0.5);
      // Arrows of Buttons
      this.textConfig = { fontFamily  : "Muli",
                        color       : "#ffffff",
                        fontSize    : "40px"
                        };

      this.text = this.add.text(this.rectLeft.width/2,
                                75+this.background.displayHeight+this.rectLeft.displayHeight/2,
                                "<",
                                this.textConfig).setOrigin(0.5,0.5);
      this.text2 = this.add.text(this.game.config.width-this.rectRight.width/2,
                                75+this.background.displayHeight+this.rectRight.displayHeight/2,
                                ">",
                                this.textConfig).setOrigin(0.5,0.5);



      this.rectLeft.on("pointerdown", ()=>{
        if (this.currentPage>0){
          this.hideCurrentPage();
          this.currentPage -=1;
          this.showCurrentPage();
          console.log("Current Page", this.currentPage);
        }
      });
      this.rectRight.on("pointerdown", ()=>{
          if (this.currentPage+1<this.numOfPages){
              this.hideCurrentPage();
              this.currentPage +=1;
              this.showCurrentPage();
              console.log("Current Page", this.currentPage);
          }
      });
    }
    setItems(){
      // Set items
      this.stickers = [];
      var page=0;
      this.itemY = this.background.displayHeight+75+(this.game.config.height - (this.background.displayHeight+75))/2;
      this.startX = this.rectLeft.displayWidth+this.itemWidth/2;
      while(page<this.numOfPages){
        var min = this.numItemPerPage;
        if (page+1==this.numOfPages && this.numItemLastPage!=0){
          min = this.numItemLastPage;
        }
        var position = 0;
        for(var i=page*this.numItemPerPage+1; i<page*this.numItemPerPage+min+1; i++){
          this.item = this.add.existing(new Item(this, "sticker"+i, this.startX+position*this.background.displayWidth*0.8/this.numItemPerPage, this.itemY, "sticker"+i, "n/a", "n/a", "n/a", "n/a", "n/a"));
          this.item.displayWidth = this.itemWidth;
          this.item.scaleY = this.item.scaleX;
          this.item.alpha = 0;
          this.stickers.push(this.item);
          position++;
        }
        page++;
      }
      this.showCurrentPage();
    }

    setDragLogic(){
      // Drag logic
	    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
	      gameObject.wasDragging = true;
	      gameObject.x = dragX;
	      gameObject.y = dragY;
	    });

	    this.input.on("dragend", function(pointer, gameObject, dragX, dragY) {
        // If object is dragged outside of the invitation, return it to original spot
	      if(gameObject.y < (75) || gameObject.y > this.scene.background.displayHeight+75 || gameObject.x < 0 || gameObject.x > gameObject.scene.game.config.width) {
	        gameObject.x = gameObject.input.dragStartX;
	        gameObject.y = gameObject.input.dragStartY;
	      }
        // If object is dragged inside of the invitation
        else {
	        if(gameObject.input.dragStartY < gameObject.input.dragStartY < (76+(gameObject.height/2)) || gameObject.input.dragStartY > this.scene.background.displayHeight) {
            if(gameObject.inRoom != true){
              // If object is dragged from outside of the room, create copy of the object in its original spot
              gameObject.inRoom = true;
              var obj = new Item(gameObject.scene, gameObject.imageName, gameObject.input.dragStartX, gameObject.input.dragStartY, gameObject.name, "n/a", "n/a", "n/a", "n/a", "n/a");
              // Replace sticker object with new sticker in the array
              var index = gameObject.scene.stickers.indexOf(gameObject);
              gameObject.scene.stickers[index] = obj;
              gameObject.scene.add.existing(obj);
            }
	        }
	      }
	    });
    }
}
