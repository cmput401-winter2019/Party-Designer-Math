import { CST }            from "../CST"
import { ButtonAtMenu }   from "../components/buttonAtmenu";
import { ButtonAtBottom } from "../components/buttonAtBottom";
import { Guest }        from "../classes/guests";
import { Item }         from "../classes/item";
import { ImageToProperties } from "../classes/imageToProperties";
import { User } from "../classes/user";

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

    // Initiate ImageToProperties class
    this.imageToProp = new ImageToProperties();

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
                              "sofa",
                              "musicPlayer",
                              "rug",
                              "screen",
                              "shelf",
                              "sofa",
                              "table",
                              "wallShelf"];

    var food_assets       = [ "burger",
                              "burger_mult",
                              "cake",
                              "cherries",
                              "chips",
                              "juice",
                              "ketchup",
                              "milkshake",
                              "pizza",
                              "saladBowl",
                              "spaceWater"];

    var deco_assets       = [ "ballons",
                              "light",
                              "bunting",
                              "partyHat",
                              "hangingDeco",
                              "plantPot",
                              "sculpture",
                              "spacePlants",
                              "starBanner",
                              "wallHanging"];

    var kiddie_assets     = [ "alienShip",
                              "ball",
                              "earthBall",
                              "gift",
                              "icecream",
                              "rocket",
                              "rocket_2",
                              "spaceTeddy",
                              "sticker",
                              "telescope"];

    // all_assets = all assets to be shown in shopping list
    this.all_assets = [];
    var counter = 0;
    while (counter<5){
      var furniture = furniture_assets[Math.floor(Math.random() * furniture_assets.length)];
      if (this.all_assets.includes(furniture) == false){
        this.all_assets.push(furniture);
        counter++;
      }
    }
    var counter = 0;
    while (counter<5){
      var food = food_assets[Math.floor(Math.random() * food_assets.length)];
      if (this.all_assets.includes(food) == false){
        this.all_assets.push(food);
        counter++;
      }
    }
    var counter = 0;
    while (counter<5){
      var deco = deco_assets[Math.floor(Math.random() * deco_assets.length)];
      if (this.all_assets.includes(deco) == false){
        this.all_assets.push(deco);
        counter++;
      }
    }
    var counter = 0;
    while (counter<5){
      var kiddie = deco_assets[Math.floor(Math.random() * deco_assets.length)];
      if (this.all_assets.includes(kiddie) == false){
        this.all_assets.push(kiddie);
        counter++;
      }
    }
    // this.testImageToProp();
    
    // --------------------- Bottom Buttons ------------------------


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

     // --------------------- Bottom Buttons ------------------------

    // Furniture (first bottom menu button) is selected upon arriving at the room
    this.bottomBtn1.activateBtn();

     // --------------------- Tests ------------------------
    this.testUser();
    
  }
  testImageToProp(){
    var flag = true;
    for (var i = 0; i<this.all_assets.length; i++){
      //console.log(this.all_assets[i]);
      if(this.imageToProp.getProp(this.all_assets[i]) == undefined){
        console.log(this.all_assets[i] + " does not exit in imageToProperties.js");
        flag = false;
      } 
    }
    if (flag == true){
      console.log("All is OK");
    } 
  }
  testUser(){
    this.user = new User("Bob", 3, {"chair":2, "sofa":3}, 100, {});
    this.user.increaseCredits(20);
    console.log("increase credits test passed:", this.user.credits==120);
    this.user.decreaseCredits(50);
    console.log("decrease credits test passed:", this.user.credits==70);
    
    this.user.putIntoBackpack("chair");
    console.log("Backpack add existing item test passed:", this.user.backpack["chair"] == "3");
    this.user.putIntoBackpack("rug");
    console.log("Backpack add nonexisting item test passed", this.user.backpack["rug"] == "1");

    this.user.removeFromBackpack("sofa");
    console.log("Backpack Remove item test passed:", this.user.backpack["sofa"] == 2);
    this.user.removeFromBackpack("rug");
    console.log("Backpack Remove item test passed:", this.user.backpack["rug"] == 0);
    
    console.log("Backpack Remove 0-item test passed:", this.user.removeFromBackpack("rug") == false);
    console.log("Backpack Remove nonexisting item test passed:", this.user.removeFromBackpack("bob") == false);

  }
}
