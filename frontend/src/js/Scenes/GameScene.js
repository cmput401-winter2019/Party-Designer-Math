import { furniture_assets, food_assets, deco_assets, kiddie_assets, spaceGuestImages }  from '../Components/assets';
import { RandomNumber }                                                                 from "../Components/randint";
import { CreateShoppingList }                                                           from "../Components/createShoppingList";
import { ImageToProperties }                                                            from "../classes/imageToProperties";
import { User }                                                                         from "../classes/user";
import { Guest }                                                                        from "../classes/guests";
import { Item }                                                                         from "../classes/item";
import { ButtonAtMenu }                                                                 from "../Components/buttonAtMenu";
import { ButtonAtBottom }                                                               from "../Components/buttonAtBottom";
import {CST} from "../CST";

export class GameScene extends Phaser.Scene{
  constructor(){ super({key: CST.SCENES.GAME}); }

  preload(){}

  create(){

    // Initiate ImageToProperites class
    this.imageToProp = new ImageToProperties();

    // --------- Should only be created if player is new to current level/session -------
    // Generate new random numbers
    this.numbers = RandomNumber();

    // Create new Shooping list
    this.all_assets = CreateShoppingList(furniture_assets, food_assets, deco_assets, kiddie_assets);
    //

    this.username = localStorage.getItem("username");
    this.id       = localStorage.getItem("id");
    this.money    = 1000;
    var url = "http://127.0.0.1:5001/" + this.id + "/gamestate";

    this.player = new User(this.username,
                            this.id,
                            this.money,
                            5,
                            3,
                            {"chair":1, "sofa":2},
                            100,
                            {"chair":2, "cherries":3},
                            this.numbers,
                            this.all_assets);


    this.createBackground("background");
    this.createGuests(spaceGuestImages);

    this.post_gamestate(this.id, this.money, this.randomInt, url);

    this.loadItemsToScreen(this.player.screenItems, "load");
    this.createDragLogics();
    this.createTopMenuButtons();
    this.createBottomButtons(furniture_assets,food_assets,deco_assets,kiddie_assets);
  }

  post_gamestate(id, money, guests, url){
      const body = {
          studentId: id,
          money: money,
          numOfGuests: guests
      };

      return fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
          }
        })
        .then(
          function(response) {
            console.log(response.status);
            // Examine the text in the response
            response.json().then(function(data) {
              if (response.status !== 200) {
                  alert(response.status + " Error"+ " : " + data["message"]);
                  return;
              }
              return;
            });
          }
        )
    }

  createBackground(background){
    this.topMenuHeight  = 75;
    // Background
    this.background     = this.add.image(0, this.topMenuHeight, background);
    this.background.setOrigin(0,0);
    this.background.displayWidth  = this.game.config.width;
    this.background.scaleY        = this.background.scaleX;
    if((this.game.config.height - (this.background.displayHeight + this.topMenuHeight)) < 130){
        console.log('Warning, distorted background');
        this.background.displayHeight = this.game.config.height - this.topMenuHeight - 130;
        this.background.displayWidth  = this.game.config.width;
    }
  }

  createGuests(guestImgNames){
    var originalY = this.game.config.height/3;
    var originalX = 100;
    var maxGuest  = 0;
    var minGuest  = 0;
    if(this.player.level <= 3){
      minGuest = 3;
      maxGuest = 5;
    }else if(this.player.level <=6){
      minGuest = 5;
      maxGuest = 7;
    }else{
      minGuest = 7;
      maxGuest = 9;
    }
    this.randomInt = Math.floor(Math.random() * (maxGuest - minGuest +1)) + minGuest;
    for(var i=0; i<this.randomInt; i++){
        this.add.existing(new Guest(this, guestImgNames[i], originalX*(i+1), originalY, "Sammy"));
    }
  }

  loadItemsToScreen(itemDict, type){
    var property;
    for(var key in itemDict){
      var cap = itemDict[key]
      for(var k=0; k<cap; k++){
        property = this.imageToProp.getProp(key);
        this.add.existing(new Item(this, key, 100, 200, property.name, property.pluralName, property.category, property.cost, property.unit, type));
      }
    }
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
                                            itemY       : itemY,
                                            player      : this.player
                                          });

    this.bottomBtn2 = new ButtonAtBottom({  scene       : this,
                                            text        : "Decoration",
                                            startHeight : startHeight2,
                                            btnHeight   : btnHeight,
                                            btnWidth    : btnWidth,
                                            btnColor    : btnColor,
                                            assets      : deco_assets,
                                            itemY       : itemY,
                                            player      : this.player
                                          });

    this.bottomBtn3 = new ButtonAtBottom({  scene       : this,
                                            text        : "Snacks",
                                            startHeight : startHeight3,
                                            btnHeight   : btnHeight,
                                            btnWidth    : btnWidth,
                                            btnColor    : btnColor,
                                            assets      : food_assets,
                                            itemY       : itemY,
                                            player      : this.player
                                          });

    this.bottomBtn4 = new ButtonAtBottom({  scene       : this,
                                            text        : "Kiddie Bag",
                                            startHeight : startHeight4,
                                            btnHeight   : btnHeight,
                                            btnWidth    : btnWidth,
                                            btnColor    : btnColor,
                                            assets      : kiddie_assets,
                                            itemY       : itemY,
                                            player      : this.player
                                          });

     // --------------------------------------------------------------

    // Furniture (first bottom menu button) is selected upon arriving at the room
    this.bottomBtn1.activateBtn();
  }

}
