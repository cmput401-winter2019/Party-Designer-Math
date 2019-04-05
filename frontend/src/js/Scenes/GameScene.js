import { guestImages }                  from "../Components/assets.js";
import { GetAllQuestionRequest, PostPlayThroughRequest, GetPlaythrough, GetAllShoppingList}        from "../Components/scripts.js";
import { GetUserStat }                  from "../Components/getUserStat.js";
import { RandomNumber }                 from "../Components/randint.js";
import { CreateShoppingList }           from "../Components/createShoppingList.js";
import { ImageToProperties }            from "../classes/imageToProperties.js";
import { User }                         from "../classes/user.js";
import { Guest }                        from "../classes/guests.js";
import { Item }                         from "../classes/item.js";
import { ButtonAtMenu }                 from "../Components/buttonAtMenu.js";
import { ButtonAtBottom }               from "../Components/buttonAtBottom.js";
import { CST }                          from "../CST.js";
import { ProgressBar }                  from '../Components/progressBar.js';
import { StartPartyBtn, RoundBtn }      from '../Components/roundBtn.js';
import { FormUtil }                     from '../util/formUtil.js';
import { LevelIndicator }               from '../Components/levelIndicator.js';

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

	const response = await post("http://162.246.157.181/shoppinglist", body);

	const data = await response.json();
	if (!response.ok) {
    console.log("Something went wrong");
    console.log(data);
	}
	else {
    for (const i of data) {
			console.log(i.itemName);
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

  currentContext.userntame = localStorage.getItem("username");
  currentContext.id       = localStorage.getItem("id");
  currentContext.money    = currentContext.gamestate.money;

	console.log(currentContext.gamestate);
	console.log(currentContext.background);

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

	var pt_url = "http://162.246.157.181/"+currentContext.player.id+"/getplaythrough";
	GetPlaythrough(pt_url).then(data => {
		//console.log(data)
		if(data.length == 0){
			var playthrough_url = "http://162.246.157.181/createplaythrough";
			PostPlayThroughRequest(currentContext.player.level, currentContext.player.id, playthrough_url).then(data => {
				currentContext.scene.restart();
			})
		}else{
			GetPlaythrough(pt_url).then(data => {
				console.log(data[0].level);
				currentContext.player.setPlaythroughId(data[0].id);
				currentContext.player.updateLevel(data[0].level);

				// Level indicator
			  var indicatorX = currentContext.game.config.width*0.45;
			  currentContext.levelIndicator = new LevelIndicator({scene:currentContext, text:currentContext.player.level, x:indicatorX, y:30});

			  // Initiate progress bar
			  currentContext.progressBar = new ProgressBar({scene:currentContext, width: 180, height:18, x: indicatorX+30, y:75/3, color: 0x0e4361});
			  // currentContext.progressBar.setPercent(0);

				var shop_url = "http://162.246.157.181/"+ currentContext.player.gamestateId + "/shoppinglist";
				var correct_count = 0;
				var attempt_count = 0;
				GetAllShoppingList(shop_url).then(ret => {
					for(var i=0; i<ret.length; i++){
						if(ret[i].completed == true){
							correct_count++;
						}
						attempt_count++;
					}
					console.log(correct_count + " / " + attempt_count);
					var total_count = correct_count/attempt_count;
					currentContext.progressBar.setPercent(total_count);
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
			                                currentContext.game.config.width*0.75,
			                                75/2,
			                                "START THE PARTY",
			                                150,
			                                50);

				currentContext.levelUpBtn.rect.on("pointerdown", ()=>{
			    var url = "http://162.246.157.181/"+ currentContext.player.gamestateId + "/question";
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

							var shop_url = "http://162.246.157.181/"+ currentContext.player.gamestateId + "/shoppinglist";

							GetAllShoppingList(shop_url).then(ret => {
								var complete_count = 0;
								for(var i=0; i<ret.length; i++){
									if(ret[i].completed == true){
										complete_count++;
									}
								}
								if(complete_count >= ret.length){
									currentContext.scene.start(CST.SCENES.LEVEL_UP, { player:currentContext.player,
				                                                  add_correct		: addition_correct,
				                                                  add_wrong  		: addition_wrong,
				                                                  sub_correct		: subtraction_correct,
				                                                  sub_wrong  		: subtraction_wrong,
				                                                  mult_correct	: mult_correct,
				                                                  mult_wrong  	: mult_wrong,
				                                                  div_correct 	: div_correct,
				                                                  div_wrong   	: div_wrong,
				                                                  mixed_correct	: mixed_correct,
				                                                  mixed_wrong   : mixed_wrong});
				        }else{
				          alert("Shopping List is not Complete\n\n Please check Shopping List");
				        }
							})

			    })
			  });
			})
		}
	})
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

  preload(){
    this.configButtons = ["RotateBtn", "RotateBtn2", "Right", "ScaleBtn", "ScaleSmaller", "Forward", "Backward", "Cross"];

    for(var i=0; i<this.configButtons.length; i++){
      this.load.image(this.configButtons[i], "assets/images/Interface/"+this.configButtons[i]+".svg");
    }
  }

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
    // console.log(itemDict, key);
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
                                        event : "button_pressed",
																				player      : this.player
                                    });

    this.profileBtn = new ButtonAtMenu({ scene  : this,
                                          key   : "Profile",
                                          text  : "Profile",
                                          x     : (startX+100),
                                          y     : 30,
                                          event : "button_pressed",
                                          params: "self_desturct",
																					player      : this.player
                                    });

    this.bagBtn = new ButtonAtMenu({  scene   : this,
                                        key   : "Bag",
                                        text  : "Bag",
                                        x     : (startX+200),
                                        y     : 30,
                                        event : "button_pressed",
																				player      : this.player
                                    });

    this.listBtn = new ButtonAtMenu({  scene  : this,
                                        key   : "List",
                                        text  : "List",
                                        x     : (startX+300),
                                        y     : 30,
                                        event : "button_pressed",
																				player      : this.player
                                    });

    this.creditBtn = new ButtonAtMenu({  scene  : this,
                                          key   : "Credit",
                                          text  : "Credits",
                                          x     : (this.game.config.width-(startX+100)),
                                          y     : 30,
                                          event : "button_pressed",
																					player      : this.player
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
