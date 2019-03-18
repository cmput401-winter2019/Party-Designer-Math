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

    var spaceGuestImages = [ "char1",
                             "char2",
                             "char3",
                             "char4",
                             "char5",
                             "char6",
                             "char1",
                             "char2",
                             "char3",]

    // Initiate ImageToProperties class
    this.imageToProp = new ImageToProperties();

    // --------- Should only be created if player is new to current level/session -------
    // Generate new random numbers 
    this.numbers = []
    for(var number =0; number < 20; number ++){
				this.numbers[number] = Phaser.Math.Between(2,9);
		}
    // Create new shopping list
    this.createShoppingList(furniture_assets,food_assets,deco_assets,kiddie_assets);
    console.log(this.numbers);
    console.log(this.all_assets);

    // -----------------------------------------------------------------------------------
    

    // Initiate User class
    this.player = new User("John", 3, {"chair":1, "sofa":2}, 100, {"chair":2, "cherries":3}, this.numbers, this.all_assets);         //userName, currentLevel, backpack, credits, itemsOnScreen
    this.createBackground("background");
    this.createGuests(spaceGuestImages);
    this.loadItemsToScreen(this.player.screenItems, "load"); // true to indicate we are loading
    this.createDragLogics();
    this.createTopMenuButtons();
    this.createBottomButtons(furniture_assets,food_assets,deco_assets,kiddie_assets);
    
  


    // --------------------- Tests ------------------------
    //this.testImageToProp();
    //this.testUser();
  }
  loadItemsToScreen(itemDictionary, purpose){
    var property;
    for (var key in itemDictionary){
      var cap = itemDictionary[key]
      for (var i = 0; i < cap; i++){
        property = this.imageToProp.getProp(key);
        this.add.existing(new Item(this, key, 100, 200, property.name, property.pluralName, property.category, property.cost, property.unit, purpose));
      }
    }
    console.log(this.player);
  }
  createBackground(background){
    this.topMenuHeight = 75;
    // Background
    this.background = this.add.image(0, this.topMenuHeight, background);
    this.background.setOrigin(0,0);
    this.background.displayWidth  = this.game.config.width;
    this.background.scaleY        = this.background.scaleX;
    if((this.game.config.height - (this.background.displayHeight + this.topMenuHeight))<130){
        console.log('Warning, distorted background');
        this.background.displayHeight = this.game.config.height-this.topMenuHeight-130;
        this.background.displayWidth = this.game.config.width;
    }

  }
  createGuests(guestImageNames){
    // Guests
    var originalY = this.game.config.height/3;
    var originalX = 100;
    var maxGuest = 0;
    var minGuest = 0;


    if (this.player.level<=3){
      minGuest = 3;
      maxGuest = 5;
    } else if (this.player.level<=6){
      minGuest = 5; 
      maxGuest = 7;
    } else {
      minGuest = 7;
      maxGuest = 9;
    } 

    var randomInt = Math.floor(Math.random() * (maxGuest - minGuest + 1)) + minGuest;
    
    for(var i = 0; i<randomInt; i++){
      this.add.existing(new Guest(this, guestImageNames[i], originalX*(i+1) , originalY, "Sammy"));
    }


    //

    // this.guest1 = this.add.existing(new Guest(this, "char1", 100,200, "Sammy"));
    // this.guest2 = this.add.existing(new Guest(this, "char2", 200,200, "Tom"));
    // this.guest3 = this.add.existing(new Guest(this, "char3", 300,200, "Kevin"));
    // this.guest4 = this.add.existing(new Guest(this, "char4", 400,200, "Sally"));
    // this.guest5 = this.add.existing(new Guest(this, "char5", 500,200, "Jason"));
    // this.guest6 = this.add.existing(new Guest(this, "char6", 600,200, "Brad"));
  }
  createDragLogics(){
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
  }
  createTopMenuButtons(){
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
  }
  createBottomButtons(furniture_assets,food_assets,deco_assets,kiddie_assets){
    // Bottom menu

    // --------------------- Initiation of variables ------------------------
    var startHeight1  = this.background.displayHeight + this.topMenuHeight;
    var menuHeight    = (this.game.config.height - startHeight1);
    var itemY = startHeight1 + (menuHeight/2);
    var btnHeight     = menuHeight/4
    var btnWidth      = (this.game.config.width*0.2);
    var startHeight2  = startHeight1 + btnHeight;
    var startHeight3  = startHeight2 + btnHeight;
    var startHeight4  = startHeight3 + btnHeight;
    var btnColor      = 0x0e4361;

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

     // --------------------------------------------------------------

    // Furniture (first bottom menu button) is selected upon arriving at the room
    this.bottomBtn1.activateBtn();
  }
  createShoppingList(furniture_assets,food_assets,deco_assets,kiddie_assets){
    // this.all_assets[] contains all assets to be shown in shopping list
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
      var kiddie = kiddie_assets[Math.floor(Math.random() * kiddie_assets.length)];
      if (this.all_assets.includes(kiddie) == false){
        this.all_assets.push(kiddie);
        counter++;
      }
    }
  }



  // --------------------- Test Functions ------------------------
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

    this.user = new User("Bob", 3, {"chair":2, "sofa":3}, 100, {"light":1});
    // Test increase & decrease levels
    this.user.decreaseLevel();
    console.log("decrease level test passed:", this.user.level==2);
    this.user.increaseLevel()
    console.log("increase level test passed:", this.user.level==3);

    // Test increase & decrease credits
    this.user.increaseCredits(20);
    console.log("increase credits test passed:", this.user.credits==120);
    this.user.decreaseCredits(50);
    console.log("decrease credits test passed:", this.user.credits==70);
    
    // Test putting item into backpack
    this.user.putIntoBackpack("chair");
    console.log("Backpack add existing item test passed:", this.user.backpack["chair"] == "3");
    this.user.putIntoBackpack("rug");
    console.log("Backpack add nonexisting item test passed", this.user.backpack["rug"] == "1");

    // Test removing item from backpack
    this.user.removeFromBackpack("sofa");
    console.log("Backpack Remove item test passed:", this.user.backpack["sofa"] == 2);
    this.user.removeFromBackpack("rug");
    console.log("Backpack Remove item test passed:", this.user.backpack["rug"] == 0);
    console.log("Backpack Remove 0-item test passed:", this.user.removeFromBackpack("rug") == false);
    console.log("Backpack Remove nonexisting item test passed:", this.user.removeFromBackpack("bob") == false);

    // Test putting item into screenItems list
    this.user.putIntoScreenItems("light");
    console.log("screenItem add existing item test passed:", this.user.screenItems["light"]==2);
    this.user.putIntoScreenItems("icecream");
    console.log("screenItem add nonexisting item test passed:", this.user.screenItems["icecream"]==1);

    // Test remove item from screenItems list
    this.user.removeFromScreenItems("light");
    console.log("Backpack Remove item test passed:", this.user.screenItems["light"]== 1 );
    this.user.removeFromScreenItems("icecream");
    console.log("Backpack Remove item test passed:", this.user.screenItems["icecream"] == 0);
    console.log("screenItem list remove 0-item test passed:", this.user.removeFromScreenItems("icecream")==false);
    console.log("screenItem list remove 0-item test passed:", this.user.removeFromScreenItems("hello")==false);

    //console.log(this.user.screenItems);
  }
}
