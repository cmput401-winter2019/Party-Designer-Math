import { CST }            from "../CST"
import { ButtonAtMenu }   from "../components/buttonAtmenu";
import { ButtonAtBottom } from "../components/buttonAtBottom";
import { Guest }        from "../classes/guests";
import { Item }         from "../classes/item";


export class PartyInterface extends Phaser.Scene {

  constructor() {
    super({
      key: CST.SCENES.PARTY_INTERFACE
    });
  }

  init() {

  }

  preload() {

  }

  create() {
    this.topMenuHeight = 75;
    // Background
    this.background = this.add.image(0, this.topMenuHeight, "background");
    this.background.setOrigin(0,0);
    this.background.displayWidth  = this.game.config.width;
    this.background.scaleY        = this.background.scaleX;
    if((this.game.config.height - (this.background.displayHeight + this.topMenuHeight))<130){
        console.log('Warning, distorted background');
        this.background.displayHeight = this.game.config.height-this.topMenuHeight-130;
        this.background.displayWidth = this.game.config.width;
    }

    // Guests
    this.guest1 = this.add.existing(new Guest(this, "char1", 100,200, "Sammy"));
    this.guest2 = this.add.existing(new Guest(this, "char2", 200,200, "Tom"));
    this.guest3 = this.add.existing(new Guest(this, "char3", 300,200, "Kevin"));
    this.guest4 = this.add.existing(new Guest(this, "char4", 400,200, "Sally"));
    this.guest5 = this.add.existing(new Guest(this, "char5", 500,200, "Jason"));
    this.guest6 = this.add.existing(new Guest(this, "char6", 600,200, "Brad"));

    // Top menu
    this.exitBtn = new ButtonAtMenu({ scene   : this,
                                        key   : "exitBtn",
                                        text  : "Exit Game",
                                        x     : (this.game.config.width*0.05),
                                        y     : 30,
                                        event : "button_pressed",
                                        params: "self_desturct"
                                    });

    this.themeBtn = new ButtonAtMenu({ scene  : this,
                                        key   : "themeBtn",
                                        text  : "Themes",
                                        x     : (this.game.config.width*0.12),
                                        y     : 30,
                                        event : "button_pressed",
                                        params: "self_desturct"
                                    });

    this.saveBtn = new ButtonAtMenu({ scene   : this,
                                        key   : "saveBtn",
                                        text  : "Save",
                                        x     : (this.game.config.width*0.19),
                                        y     : 30,
                                        event : "button_pressed",
                                        params: "self_desturct"
                                    });

    this.profileBtn = new ButtonAtMenu({ scene  : this,
                                          key   : "profileBtn",
                                          text  : "Profile",
                                          x     : (this.game.config.width*0.26),
                                          y     : 30,
                                          event : "button_pressed",
                                          params: "self_desturct"
                                    });

    this.bagBtn = new ButtonAtMenu({  scene   : this,
                                        key   : "bagBtn",
                                        text  : "Bag",
                                        x     : (this.game.config.width*(1-0.26)),
                                        y     : 30,
                                        event : "button_pressed",
                                        params: "self_desturct"
                                    });

    this.listBtn = new ButtonAtMenu({  scene  : this,
                                        key   : "listBtn",
                                        text  : "List",
                                        x     : (this.game.config.width*(1-0.19)),
                                        y     : 30,
                                        event : "button_pressed",
                                        params: "self_desturct"
                                    });

    this.creditBtn = new ButtonAtMenu({  scene  : this,
                                          key   : "creditBtn",
                                          text  : "Credits",
                                          x     : (this.game.config.width*(1-0.12)),
                                          y     : 30,
                                          event : "button_pressed",
                                          params: "self_desturct"
                                    });
                                    

    // Drag logic
    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.wasDragging = true;
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", function(pointer, gameObject, dragX, dragY) {
      if(gameObject.y < (76+(gameObject.displayHeight/2)) || gameObject.y > (this.scene.background.displayHeight+76)-(gameObject.displayHeight/2) || gameObject.x < 0 || gameObject.x > gameObject.scene.game.config.width) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      } 
    });

    // Bottom menu
    var startHeight1  = this.background.displayHeight + this.topMenuHeight;
    var menuHeight    = (this.game.config.height - startHeight1);
    var itemY = startHeight1 + (menuHeight/2);
    var btnHeight     = menuHeight/4
    var btnWidth      = (this.game.config.width*0.2);
    var startHeight2  = startHeight1 + btnHeight;
    var startHeight3  = startHeight2 + btnHeight;
    var startHeight4  = startHeight3 + btnHeight;
    var btnColor      = 0x0e4361;

    var furniture_assets  = [ "chair",
                              "dinnerTable",
                              "sofa"];

    var food_assets       = [ "burger",
                              "chips",
                              "ketchup"];

    var deco_assets       = [ "ballons",
                              "light",
                              "partyHat"];

    var kiddie_assets     = [ "alienShip",
                              "ball",
                              "gift"];

    var all_assets = { furniture: ["chair" ,"dinnerTable", "sofa"] ,
                      food: ["burger", "chips", "ketchup"] ,
                      deco: ["ballons", "light", "partyHat"] ,
                      kiddie: ["alienShip", "ball", "gift"] };


    this.bottomBtn1 = new ButtonAtBottom({  scene       : this,
                                            text        : "Furniture",
                                            startHeight : startHeight1,
                                            btnHeight   : btnHeight,
                                            btnWidth    : btnWidth,
                                            btnColor    : btnColor,
                                            assets      : furniture_assets,
                                            itemY       : itemY
                                          });

    this.bottomBtn2 = new ButtonAtBottom({  scene       : this,
                                            text        : "Decoration",
                                            startHeight : startHeight2,
                                            btnHeight   : btnHeight,
                                            btnWidth    : btnWidth,
                                            btnColor    : btnColor,
                                            assets      : deco_assets,
                                            itemY       : itemY
                                          });

    this.bottomBtn3 = new ButtonAtBottom({  scene       : this,
                                            text        : "Snacks",
                                            startHeight : startHeight3,
                                            btnHeight   : btnHeight,
                                            btnWidth    : btnWidth,
                                            btnColor    : btnColor,
                                            assets      : food_assets,
                                            itemY       : itemY
                                          });

    this.bottomBtn4 = new ButtonAtBottom({  scene       : this,
                                            text        : "Kiddie Bag",
                                            startHeight : startHeight4,
                                            btnHeight   : btnHeight,
                                            btnWidth    : btnWidth,
                                            btnColor    : btnColor,
                                            assets      : kiddie_assets,
                                            itemY       : itemY
                                          });

    //---------------------------------
    //THIS WILL BE REFACTORED : START
    //---------------------------------

    this.bottomBtn1.rect.setInteractive();
    this.bottomBtn1.rect.on("pointerup", ()=> {
      this.bottomBtn2.clicked = false; this.bottomBtn2.alpha = 1;
      this.bottomBtn3.clicked = false; this.bottomBtn3.alpha = 1;
      this.bottomBtn4.clicked = false; this.bottomBtn4.alpha = 1;
      for(var key in all_assets) {
        if (key != "furniture") {
          //console.log(all_assets[key]);
          
        }
      }
      var index;
      
      for(index = 0; index < this.bottomBtn2.loadedassets.length; ++index) {
        this.bottomBtn2.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn2.loadedassets[index].name);
      }
      for(index = 0; index < this.bottomBtn3.loadedassets.length; ++index) {
        this.bottomBtn3.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn3.loadedassets[index].name);
      }
      for(index = 0; index < this.bottomBtn4.loadedassets.length; ++index) {
        this.bottomBtn4.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn4.loadedassets[index].name);
      }
      for(index = 0; index < this.bottomBtn1.loadedassets.length; ++index) {
        this.bottomBtn1.loadedassets[index].visible = true;
        console.log("turning invisible: " + this.bottomBtn1.loadedassets[index].name);
      }
    });

    this.bottomBtn2.rect.setInteractive();
    this.bottomBtn2.rect.on("pointerup", ()=> {
      this.bottomBtn1.clicked = false; this.bottomBtn1.alpha = 1;
      this.bottomBtn3.clicked = false; this.bottomBtn3.alpha = 1;
      this.bottomBtn4.clicked = false; this.bottomBtn4.alpha = 1;

      var index;
      for(index = 0; index < this.bottomBtn1.loadedassets.length; ++index) {
        this.bottomBtn1.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn1.loadedassets[index].name);
      }
      
      for(index = 0; index < this.bottomBtn3.loadedassets.length; ++index) {
        this.bottomBtn3.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn3.loadedassets[index].name);
      }
      for(index = 0; index < this.bottomBtn4.loadedassets.length; ++index) {
        this.bottomBtn4.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn4.loadedassets[index].name);
      }
      for(index = 0; index < this.bottomBtn2.loadedassets.length; ++index) {
        this.bottomBtn2.loadedassets[index].visible = true;
        console.log("turning invisible: " + this.bottomBtn2.loadedassets[index].name);
      }
    });

    this.bottomBtn3.rect.setInteractive();
    this.bottomBtn3.rect.on("pointerup", ()=> {
      this.bottomBtn1.clicked = false; this.bottomBtn1.alpha = 1;
      this.bottomBtn2.clicked = false; this.bottomBtn2.alpha = 1;
      this.bottomBtn4.clicked = false; this.bottomBtn4.alpha = 1;

      var index;
      for(index = 0; index < this.bottomBtn1.loadedassets.length; ++index) {
        this.bottomBtn1.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn1.loadedassets[index].name);
      }
      for(index = 0; index < this.bottomBtn2.loadedassets.length; ++index) {
        this.bottomBtn2.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn2.loadedassets[index].name);
      }
      
      for(index = 0; index < this.bottomBtn4.loadedassets.length; ++index) {
        this.bottomBtn4.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn4.loadedassets[index].name);
      }
      for(index = 0; index < this.bottomBtn3.loadedassets.length; ++index) {
        this.bottomBtn3.loadedassets[index].visible = true;
        console.log("turning invisible: " + this.bottomBtn3.loadedassets[index].name);
      }
    });

    this.bottomBtn4.rect.setInteractive();
    this.bottomBtn4.rect.on("pointerup", ()=> {
      this.bottomBtn1.clicked = false; this.bottomBtn1.alpha = 1;
      this.bottomBtn2.clicked = false; this.bottomBtn2.alpha = 1;
      this.bottomBtn3.clicked = false; this.bottomBtn3.alpha = 1;

      var index;
      for(index = 0; index < this.bottomBtn1.loadedassets.length; ++index) {
        this.bottomBtn1.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn1.loadedassets[index].name);
      }
      for(index = 0; index < this.bottomBtn3.loadedassets.length; ++index) {
        this.bottomBtn3.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn3.loadedassets[index].name);
      }
      for(index = 0; index < this.bottomBtn3.loadedassets.length; ++index) {
        this.bottomBtn3.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.bottomBtn3.loadedassets[index].name);
      }
      for(index = 0; index < this.bottomBtn4.loadedassets.length; ++index) {
        this.bottomBtn4.loadedassets[index].visible = true;
        console.log("turning invisible: " + this.bottomBtn4.loadedassets[index].name);
      }
    });

    //---------------------------------
    //THIS WILL BE REFACTORED : END
    //---------------------------------


    
  }

  createItem(image, x, y, name, pluralName, category, unit) {
    this.newItem = this.add.existing(new Item(this, image, x, y, name, pluralName, category, unit));
  }

}
