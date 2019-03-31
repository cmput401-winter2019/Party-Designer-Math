import {CST} from "../CST";
import { ButtonAtBottom } from "../Components/buttonAtBottom";
import { Item } from "../classes/item";
import { ButtonAtMenu } from "../Components/buttonAtMenu";

export class PartyInvitation extends Phaser.Scene {

    constructor() {
        super(CST.SCENES.PARTY_INVITATION);
    }
    init(data)
    {
        this.setDragLogic();
        this.imageChoice = data.imageChoice;
    }
    preload()
    {
      this.load.image("rotateBtn",    "assets/images/Interface/RotateBtn.svg");
      this.load.image("rightBtn",     "assets/images/Interface/Right.svg");
      this.load.image("scaleBtn",     "assets/images/Interface/ScaleBtn.svg");
      this.load.image("smallerBtn",   "assets/images/Interface/ScaleSmaller.svg");
      this.load.image("forwardBtn",     "assets/images/Interface/Forward.svg");
      this.load.image("backwardBtn",     "assets/images/Interface/Backward.svg");

      console.log(this.imageChoice);
      if(this.imageChoice == "theme1"){
        this.pathToInvite = "assets/images/Invitations/spaceroom/";
        this.pathToStickers = "assets/images/Invitations/spaceStickers/"
      } else if (this.imageChoice == "theme2"){
        this.pathToInvite = "assets/images/Invitations/playground/";
        this.pathToStickers = "assets/images/Invitations/playStickers/"
      } else if (this.imageChoice == "theme3"){
        this.pathToInvite = "assets/images/Invitations/beach/";
        this.pathToStickers = "assets/images/Invitations/beachStickers/"
      }

      // Load invitation page and sendButton of chosen theme
      this.inviteAssets = ["invite", "sendButton"];
      for (var i=0; i<this.inviteAssets.length; i++){
         this.load.image(this.inviteAssets[i], this.pathToInvite+this.inviteAssets[i]+".png");
      }

      // Load all stickers of chosen theme
      for (var i=1; i<14; i++){
        this.load.image("sticker"+i, this.pathToStickers+"sticker"+i+".svg");
      }


    }
    create(){
      
      // Set background 
      this.background = this.add.image(0, 75, "invite");
      this.background.setOrigin(0,0);
      this.background.displayWidth  = this.game.config.width;
      this.background.scaleY        = this.background.scaleX;
      if((this.game.config.height - (this.background.displayHeight + 75)) < 130){
        console.log('Warning, distorted background');
        this.background.displayHeight = this.game.config.height - 75 - 130;
        this.background.displayWidth  = this.game.config.width;
      }

      this.sendButton = new ButtonAtMenu({scene:this, key: "sendButton", x:this.game.config.width*0.75, y: this.background.displayHeight});
      this.sendButton.on('pointerup', this.pressed, this);

      // Set items
      this.itemY = this.background.displayHeight+75+(this.game.config.height - (this.background.displayHeight+75))/2
      this.sticker1 = new Item(this, "sticker1", 30, this.itemY, "sticker1", "n/a", "n/a", "n/a", "n/a", "n/a");

    }
    pressed(){
        this.scene.start(CST.SCENES.PRELOADER);
    }
    createItem(image, x, y, name, pluralName, category, unit) {
      this.newItem = this.add.existing(new Item(this, image, x, y, name, pluralName, category, unit, "n/a"));
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
              gameObject.scene.add.existing(new Item(gameObject.scene, gameObject.imageName, gameObject.input.dragStartX, gameObject.input.dragStartY, gameObject.name, "n/a", "n/a", "n/a", "n/a", "n/a"));
            }
	        }
	      }
	    });
    }
}
