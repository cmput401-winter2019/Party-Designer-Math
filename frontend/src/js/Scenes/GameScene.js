import { guestImages }                  from "../Components/assets";
import { GetAllQuestionRequest, PostPlayThroughRequest, GetPlaythrough}        from "../Components/scripts";
import { GetUserStat }                  from "../Components/getUserStat";
import { RandomNumber }                 from "../Components/randint";
import { CreateShoppingList }           from "../Components/createShoppingList";
import { ImageToProperties }            from "../classes/imageToProperties";
import { User }                         from "../classes/user";
import { Guest }                        from "../classes/guests";
import { Item }                         from "../classes/item";
import { ButtonAtMenu }                 from "../Components/buttonAtMenu";
import { ButtonAtBottom }               from "../Components/buttonAtBottom";
import { CST }                          from "../CST";
import { ProgressBar }                  from '../Components/progressBar';
import { StartPartyBtn, RoundBtn }      from '../Components/roundBtn';
import { FormUtil }                     from '../util/formUtil';
import { LevelIndicator }               from '../Components/levelIndicator';

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

async function main(context, theme) {
  //Set the scene context
  const currentContext = context;
  currentContext.itemsList = []
  currentContext.itemAmounts = []


	const body = {
		theme: currentContext.gamestate.theme
	};

	const response = await post("http://127.0.0.1:5001/shoppinglist", body);
	const data = await response.json();
	if (!response.ok) {
    console.log("Something went wrong");
    console.log(data);
	}
	else {
    for (const i of data) {
      currentContext.itemsList.push(i.itemName);
      currentContext.itemAmounts.push(i.itemAmount);
    }
  }


  currentContext.formUtil = new FormUtil({
                  scene: currentContext,
                  rows: 5,
                  cols: 11
              });
  // currentContext.formUtil.showNumbers();

  // Initiate ImageToProperites class
  currentContext.imageToProp = new ImageToProperties();

  currentContext.username = localStorage.getItem("username");
  currentContext.id       = localStorage.getItem("id");
  currentContext.money    = 1000;

  currentContext.player = new User({  username      : currentContext.username,
                            id            : currentContext.id,
                            gamestateId   : currentContext.gamestate.id,
                            money         : currentContext.gamestate.money,
                            guestNumber   : currentContext.gamestate.numOfGuests,
                            currentLevel  : 1,
                            backpack      : {}, //{"Chair":1, "Sofa":2},
                            credits       : 100,
                            itemsOnSceen  : {}, //{"Chair":2, "cherries":3},
                            inShopList    : currentContext.itemAmounts,
                            itemList      : currentContext.itemsList});

	var pt_url = "http://127.0.0.1:5001/"+currentContext.player.id+"/getplaythrough";
	GetPlaythrough(pt_url).then(data => {
		//console.log(data)
		if(data.length == 0){
			var playthrough_url = "http://127.0.0.1:5001/createplaythrough";
			PostPlayThroughRequest(currentContext.player.level, currentContext.player.id, playthrough_url).then(data => {
			})
		}
	})

	GetPlaythrough(pt_url).then(data => {
		currentContext.player.setPlaythroughId(data[0].id);
	})


  // Level indicator
  var indicatorX = currentContext.game.config.width*0.45;
  currentContext.levelIndicator = new LevelIndicator({scene:currentContext, text:currentContext.player.level, x:indicatorX, y:30});

  // Initiate progress bar
  currentContext.progressBar = new ProgressBar({scene:currentContext, width: 180, height:18, x: indicatorX+30, y:75/3, color: 0x0e4361});
  // currentContext.progressBar.setPercent(0);

	var q_url = "http://127.0.0.1:5001/"+ currentContext.player.gamestateId + "/question";
	GetAllQuestionRequest(q_url).then(data => {
		var stat_data = GetUserStat(data);
		var addition_correct      = stat_data.add_cor;
		var subtraction_correct   = stat_data.sub_cor;
		var mult_correct          = stat_data.mul_cor;
		var div_correct           = stat_data.div_cor;
		var mixed_correct         = stat_data.mix_cor;

		var add_count = 0;
		var sub_count = 0;
		var mul_count = 0;
		var div_count = 0;
		var mix_count = 0;

		for(var i=0; i<addition_correct.length;     i++){ if(i < 4){ add_count += 1; } }
		for(var i=0; i<subtraction_correct.length;  i++){ if(i < 4){ sub_count += 1; } }
		for(var i=0; i<mult_correct.length;         i++){ if(i < 4){ mul_count += 1; } }
		for(var i=0; i<div_correct.length;          i++){ if(i < 4){ div_count += 1; } }
		for(var i=0; i<mixed_correct.length;        i++){ if(i < 4){ mix_count += 1; } }
		var total_count = add_count + sub_count + mul_count + div_count + mix_count;

		currentContext.progressBar.setPercent(total_count / 20);
	})

  // Show credits
  currentContext.showCredits();

  // Call scene functions
  currentContext.updateProgressBar();
  currentContext.createBackground(currentContext.background);
  currentContext.createGuests(currentContext.guests, currentContext.player.guestNumber);

  currentContext.loadItemsToScreen(currentContext.player.screenItems, "load");
  currentContext.createDragLogics();
  currentContext.createTopMenuButtons();
  currentContext.createBottomButtons();

  // Level up button
  currentContext.levelUpBtn = new RoundBtn(currentContext,
                                currentContext.game.config.width-(currentContext.game.config.width*0.05+400),
                                75/2,
                                "START THE PARTY",
                                150,
                                50);

	currentContext.levelUpBtn.rect.on("pointerdown", ()=>{
    var url = "http://127.0.0.1:5001/"+ currentContext.player.gamestateId + "/question";
    GetAllQuestionRequest(url).then(data => {

        var stat_data = GetUserStat(data);

        var addition_correct      = stat_data.add_cor;
        var addition_wrong        = stat_data.add_wrn;
        var subtraction_correct   = stat_data.sub_cor;
        var subtraction_wrong     = stat_data.sub_wrn;
        var mult_correct          = stat_data.mul_cor;
        var mult_wrong            = stat_data.mul_wrn;
        var div_correct           = stat_data.div_cor;
        var div_wrong             = stat_data.div_wrn;
        var mixed_correct         = stat_data.mix_cor;
        var mixed_wrong           = stat_data.mix_wrn;

        if(addition_correct.length >= 0 && subtraction_correct.length >= 0 && mult_correct.length >= 0 && div_correct.length >= 0 && mixed_correct.length >= 0){
          currentContext.scene.start(CST.SCENES.LEVEL_UP, { player:currentContext.player,
                                                  add_correct: addition_correct,
                                                  add_wrong  : addition_wrong,
                                                  sub_correct: subtraction_correct,
                                                  sub_wrong  : subtraction_wrong,
                                                  mult_correct: mult_correct,
                                                  mult_wrong  : mult_wrong,
                                                  div_correct : div_correct,
                                                  div_wrong   : div_wrong,
                                                  mixed_correct: mixed_correct,
                                                  mixed_wrong   : mixed_wrong});
        }else{
          alert("Shopping List is not Complete\n\n Please check Shopping List");
        }
    })
  });

}

export class GameScene extends Phaser.Scene{

  constructor(){ super({key: CST.SCENES.GAME}); }
  init(data){
    this.firstColor     = data.firstColor;
    this.secondColor    = data.secondColor;
    this.background     = data.theme;
    this.furnitures     = data.furnitures;
    this.food           = data.food;
    this.deco           = data.deco;
    this.kiddie         = data.kiddie;
    this.guests         = data.guests;
    this.gamestate      = data.gamestate;
  }

  preload(){}

  create(){
		main(this);
  }

  showCredits(){
    this.credits = this.add.text( this.game.config.width-(this.game.config.width*0.05+100)+20,
                                  30,
                                  this.player.money.toFixed(2),
                                  {fontFamily:'Muli', color:'#ffffff', fontSize:'23px'}).setOrigin(0,0.5);
  }

  updateProgressBar(){ this.progressBar.setPercent(this.player.checkProgress()); }

  createBackground(background){
    // White background
     this.whiteBackground = this.add.rectangle(0,
	                                              75,
	                                              this.game.config.width,
	                                              this.game.config.height,
	                                              0xffffff).setOrigin(0,0);
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

    // Furniture (first bottom menu button) is selected upon arriving at the room
    this.bottomBtn1.activateBtn();
  }
}
