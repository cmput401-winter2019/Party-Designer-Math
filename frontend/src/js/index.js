import config             from './Config/config'
import { BootScene }      from './Scenes/BootScene';
import { PreloaderScene } from './Scenes/PreloaderScene';
import { LoginScene }     from './Scenes/LoginScene';
import { GameScene }      from './Scenes/GameScene';


class Game extends Phaser.Game{
  constructor(){
    super(config);
    this.scene.add("Login", LoginScene)
    this.scene.add("Boot", BootScene)
    this.scene.add("Preloader", PreloaderScene);
    this.scene.add("Game", GameScene);
    this.scene.start("Login");
  }
}

window.game = new Game();
