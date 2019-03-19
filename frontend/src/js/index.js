import config             from './Config/config'
import { BootScene }      from './Scenes/BootScene';
import { PreloaderScene } from './Scenes/PreloaderScene';
import { LoginScene }     from './Scenes/LoginScene';
import { GameScene }      from './Scenes/GameScene';
import { PartyInvitation } from "./scenes/PartyInvitation";
import { ShoppingInterface } from "./scenes/ShoppingInterface";
import { BuyPopup } from "./scenes/BuyPopup";
import { BagPopup } from "./scenes/BagPopup";


class Game extends Phaser.Game{
  constructor(){
    super(config);
    this.scene.add("LOGIN", LoginScene)
    this.scene.add("BOOT", BootScene)
    this.scene.add("PRELOADER", PreloaderScene);
    this.scene.add("GAME", GameScene);
    this.scene.add("SHOPPINT_INTERFACE", ShoppingInterface);
    this.scene.add("BUY_POPUP", BuyPopup);
    this.scene.add("BAG_POPUP", BagPopup);
    this.scene.start("LOGIN");
  }
}

window.game = new Game();
