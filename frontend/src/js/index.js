import config                 from './Config/config.js'
import { BootScene }          from './Scenes/BootScene.js';
import { ChooseTheme }        from './Scenes/ChooseTheme.js';
import { PreloaderScene }     from './Scenes/PreloaderScene.js';
import { LoginScene }         from './Scenes/LoginScene.js';
import { GameScene }          from './Scenes/GameScene.js';
import { PartyInvitation }    from "./Scenes/PartyInvitation.js";
import { ShoppingInterface }  from "./Scenes/ShoppingInterface.js";
import { BuyPopup }           from "./Scenes/BuyPopup.js";
import { BagPopup }           from "./Scenes/BagPopup.js";
import { LevelUpScene }       from "./Scenes/LevelUpScene.js";
import { Tutorial }           from "./Scenes/Tutorial.js";

class Game extends Phaser.Game{
  constructor(){
    super(config);
    //this.scene.add("LOGIN", LoginScene)
    this.scene.add("BOOT", BootScene);
    this.scene.add("CHOOSE_THEME", ChooseTheme);
    this.scene.add("PARTY_INVITATION", PartyInvitation);
    this.scene.add("PRELOADER", PreloaderScene);
    this.scene.add("GAME", GameScene);
    this.scene.add("SHOPPINT_INTERFACE", ShoppingInterface);
    this.scene.add("BUY_POPUP", BuyPopup);
    this.scene.add("BAG_POPUP", BagPopup);
    this.scene.add("LEVEL_UP", LevelUpScene);
    this.scene.add("TUTORIAL", Tutorial);
    this.scene.start("BOOT");
  }
}

window.game = new Game(config);
