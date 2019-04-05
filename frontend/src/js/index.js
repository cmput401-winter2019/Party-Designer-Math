import config                 from './Config/config'
import { BootScene }          from './Scenes/BootScene.js';
import { ChooseTheme }        from './Scenes/ChooseTheme';
import { PreloaderScene }     from './Scenes/PreloaderScene';
import { LoginScene }         from './Scenes/LoginScene';
import { GameScene }          from './Scenes/GameScene';
import { PartyInvitation }    from "./Scenes/PartyInvitation";
import { ShoppingInterface }  from "./Scenes/ShoppingInterface";
import { BuyPopup }           from "./Scenes/BuyPopup";
import { BagPopup }           from "./Scenes/BagPopup";
import { LevelUpScene }       from "./Scenes/LevelUpScene";


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
    this.scene.start("BOOT");
  }
}

window.game = new Game(config);
