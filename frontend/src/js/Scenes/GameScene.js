import { guestImages }  from '../Components/assets';
import { RandomNumber }                                                                 from "../Components/randint";
import { CreateShoppingList }                                                           from "../Components/createShoppingList";
import { ImageToProperties }                                                            from "../classes/imageToProperties";
import { User }                                                                         from "../classes/user";
import { Guest }                                                                        from "../classes/guests";
import { Item }                                                                         from "../classes/item";
import { ButtonAtMenu }                                                                 from "../Components/buttonAtMenu";
import { ButtonAtBottom }                                                               from "../Components/buttonAtBottom";
import { CST }                                                                          from "../CST";
import { ProgressBar }                                                                  from '../Components/progressBar';
import { StartPartyBtn, RoundBtn } from '../Components/roundBtn';
import { FormUtil } from '../util/formUtil';
import { LevelIndicator } from '../Components/levelIndicator';

async function post(endpoint, body) {
	const headers = {
	  "Content-Type": "application/json",
	  "Authorization": "Bearer " + localStorage.getItem("access_token")
	};
	  
	const request = {
	  method: "POST",
	  mode: "cors",
	  headers: headers,
	  body: JSON.stringify(body)
	};
  
	const response = await fetch(endpoint, request);
  
	return response;
}
  
async function generateShoppingList(scene, theme) {
	//Set the scene context
	const currentscene = scene;

	const body = {
		theme: theme
	};

	const response = await post("http://127.0.0.1:5001/shoppinglist", body);
	const data = await response.json();
	if (!response.ok) {
    console.log("Something went wrong");
    console.log(data);
	} 
	else {
    console.log(data);
	}
}


export class GameScene extends Phaser.Scene{

  constructor(){ super({key: CST.SCENES.GAME}); }
  init(data){
    this.firstColor = data.firstColor;
    this.secondColor = data.secondColor;
    this.background = data.theme;
    this.furnitures = data.furnitures;
    this.food = data.food;
    this.deco = data.deco;
    this.kiddie = data.kiddie;
    this.guests = data.guests;

    this.gamestate = data.gamestate;
  }
  preload(){

  }

  create(){
    generateShoppingList(this.scene, this.gamestate.theme);


    this.formUtil = new FormUtil({
                    scene: this,
                    rows: 5,
                    cols: 11
                });
    // this.formUtil.showNumbers();

    // Initiate ImageToProperites class
    this.imageToProp = new ImageToProperties();

    // --------- Should only be created if player is new to current level/session -------
    // Generate new random numbers
    this.numbers = RandomNumber();
    console.log(this.numbers);

    // Create new Shooping list
    this.all_assets = CreateShoppingList(this.furnitures, this.food, this.deco, this.kiddie);
    //

    this.username = localStorage.getItem("username");
    this.id       = localStorage.getItem("id");
    this.money    = 1000;

    this.player = new User({  username      : this.username,
                              id            : this.id,
                              gamestateId   : this.gamestate.id,
                              money         : this.gamestate.money,
                              guestNumber   : this.gamestate.numOfGuests,
                              currentLevel  : 1,
                              backpack      : {}, //{"Chair":1, "Sofa":2},
                              credits       : 100,
                              itemsOnSceen  : {}, //{"Chair":2, "cherries":3},
                              inShopList    : this.numbers,
                              itemList      : this.all_assets});


    // Level indicator
    var indicatorX = this.game.config.width*0.45;
    this.levelIndicator = new LevelIndicator({scene:this, text:this.player.level, x:indicatorX, y:30});

    // Initiate progress bar
    this.progressBar = new ProgressBar({scene:this, width: 180, height:18, x: indicatorX+30, y:75/3, color: 0x0e4361});
    this.progressBar.setPercent(0);

    // Show credits
    this.showCredits();

    // Call scene functions
    this.updateProgressBar();
    this.createBackground(this.background);
    this.createGuests(this.guests, this.player.guestNumber);

    this.loadItemsToScreen(this.player.screenItems, "load");
    this.createDragLogics();
    this.createTopMenuButtons();
    this.createBottomButtons();

    // Level up button
    this.levelUpBtn = new RoundBtn(this,
                                  this.game.config.width-(this.game.config.width*0.05+400),
                                  75/2,
                                  "START THE PARTY",
                                  150,
                                  50);

    this.levelUpBtn.rect.on("pointerdown", ()=>{
      console.log(this.player.correct_addition,         this.player.wrong_addition);
      console.log(this.player.correct_subtraction,      this.player.wrong_subtraction);
      console.log(this.player.correct_multiplication,   this.player.wrong_multiplication);
      console.log(this.player.correct_division,         this.player.wrong_division);
      console.log(this.player.correct_mixed,            this.player.wrong_mixed);


      if(this.player.correct_addition >= 0 && this.player.correct_subtraction >= 0 && this.player.correct_multiplication >= 0 && this.player.correct_division >= 0 && this.player.correct_mixed >= 0){
        this.scene.start(CST.SCENES.LEVEL_UP, {player:this.player});
      }else{
        alert("Shopping List is not Complete\n\n Please check Shopping List");
      }
    });


  }
  showCredits(){
    this.credits = this.add.text(this.game.config.width-(this.game.config.width*0.05+100)+20,
                                                        30,
                                                        this.player.money.toFixed(2),
                                                        {fontFamily:'Muli', color:'#ffffff', fontSize:'23px'}).setOrigin(0,0.5);
  }
  updateProgressBar(){
    this.progressBar.setPercent(this.player.checkProgress());
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

  createGuests(guestImgNames, numOfGuests){
    var originalY = this.game.config.height/3;
    var originalX = 100;
    for(var i=0; i<numOfGuests; i++){
        this.add.existing(new Guest(this, guestImgNames[i], originalX*(i+1), originalY, "Sammy"));
    }
  }

  loadItemsToScreen(itemDict, type){
    console.log(itemDict, key);
    var property;
    for(var key in itemDict){
      var cap = itemDict[key]
      for(var k=0; k<cap; k++){
        property = this.imageToProp.getProp(key);
        this.add.existing(new Item(this, key, 100, 200, property.name, property.pluralName, property.category, property.cost, type));
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
    var startX = this.game.config.width*0.05;
    this.exitBtn = new ButtonAtMenu({ scene   : this,
                                        key   : "ExitGame",
                                        text  : "Exit Game",
                                        x     : (startX),
                                        y     : 30,
                                        event : "button_pressed"
                                    });

    this.profileBtn = new ButtonAtMenu({ scene  : this,
                                          key   : "Profile",
                                          text  : "Profile",
                                          x     : (startX+100),
                                          y     : 30,
                                          event : "button_pressed",
                                          params: "self_desturct"
                                    });

    this.bagBtn = new ButtonAtMenu({  scene   : this,
                                        key   : "Bag",
                                        text  : "Bag",
                                        x     : (startX+200),
                                        y     : 30,
                                        event : "button_pressed"
                                    });

    this.listBtn = new ButtonAtMenu({  scene  : this,
                                        key   : "List",
                                        text  : "List",
                                        x     : (this.game.config.width-(startX+200)),
                                        y     : 30,
                                        event : "button_pressed"
                                    });

    this.creditBtn = new ButtonAtMenu({  scene  : this,
                                          key   : "Credit",
                                          text  : "Credits",
                                          x     : (this.game.config.width-(startX+100)),
                                          y     : 30,
                                          event : "button_pressed"
                                    });
  }

  createBottomButtons(){
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
                                            btnColor    : this.firstColor,
                                            btnColor2   : this.secondColor,
                                            assets      : this.furnitures,
                                            itemY       : itemY,
                                            player      : this.player,
                                            credit_text : this.credits,
                                            progressBar : this.progressBar
                                          });

    this.bottomBtn2 = new ButtonAtBottom({  scene       : this,
                                            text        : "Decoration",
                                            startHeight : startHeight2,
                                            btnHeight   : btnHeight,
                                            btnWidth    : btnWidth,
                                            btnColor    : this.firstColor,
                                            btnColor2   : this.secondColor,
                                            assets      : this.deco,
                                            itemY       : itemY,
                                            player      : this.player,
                                            credit_text : this.credits,
                                            progressBar : this.progressBar
                                          });

    this.bottomBtn3 = new ButtonAtBottom({  scene       : this,
                                            text        : "Snacks",
                                            startHeight : startHeight3,
                                            btnHeight   : btnHeight,
                                            btnWidth    : btnWidth,
                                            btnColor    : this.firstColor,
                                            btnColor2   : this.secondColor,
                                            assets      : this.food,
                                            itemY       : itemY,
                                            player      : this.player,
                                            credit_text : this.credits,
                                            progressBar : this.progressBar
                                          });

    this.bottomBtn4 = new ButtonAtBottom({  scene       : this,
                                            text        : "Kiddie Bag",
                                            startHeight : startHeight4,
                                            btnHeight   : btnHeight,
                                            btnWidth    : btnWidth,
                                            btnColor    : this.firstColor,
                                            btnColor2   : this.secondColor,
                                            assets      : this.kiddie,
                                            itemY       : itemY,
                                            player      : this.player,
                                            credit_text : this.credits,
                                            progressBar : this.progressBar
                                          });

     // --------------------------------------------------------------

    // Furniture (first bottom menu button) is selected upon arriving at the room
    this.bottomBtn1.activateBtn();
  }


}
