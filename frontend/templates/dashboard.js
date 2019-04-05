import config                       from '../src/js/Config/config'
import { DashboardScene }           from '../src/js/Scenes/DashboardScene';


class Game extends Phaser.Game{
  constructor(){
    super(config);
    this.scene.add("DASHBOARD", DashboardScene );

    this.scene.start("DASHBOARD");
  }
}

window.game = new Game(config);
