import {CST} from "../CST";
import { AlignGrid } from "../util/alignGrid";
import { ImageToProperties } from "../classes/imageToProperties";
import { GetAllShoppingList}        from "../Components/scripts";

export class ShoppingInterface extends Phaser.Scene{

        constructor(){
            super({ key: CST.SCENES.SHOPPING_LIST })
        }

        //Checks if objectives are met.
        init( data){
            this.number = data.n;
            this.assets = data.assets;
            this.player = data.player;
        }

        preload(){ this.load.image("exitBtn", "assets/images/Interface/ExitGame.svg"); }

        create(){
            // make and show grids
            this.alignGrid = new AlignGrid({
                scene: this,
                rows: 21,
                cols: 21
             });
            // this.alignGrid.showNumbers();
            // console.log(this.assets);

            // Main rectangle of the scene
            this.popupHeight = 540;
            this.rect = this.add.rectangle(0, 0, this.game.config.width*0.9, this.popupHeight, 0xffffff);
            this.rect.setOrigin(0.5,0.5);
            this.rect.setStrokeStyle(2, 0x000000);
            this.alignGrid.placeAtIndex(220, this.rect);

            //
            var centerXY    = this.alignGrid.getPosByIndex(220);
            var fontConfig  = { font: '16px Muli', fill: '0xFFFFF'};

            // Initiate ImageToProperties class
            this.imageToProp = new ImageToProperties();
            // First column

            var shop_url = "http://127.0.0.1:5001/"+ this.player.gamestateId + "/shoppinglist";
    				var correct_count = 0;
    				var attempt_count = 0;
    				GetAllShoppingList(shop_url).then(ret => {
              var fontConfig  = { font: '16px Muli', fill: '0xFFFFF' };
    					for(var i=0; i<ret.length; i++){
                  for(var k=0; k<10; k++){
                    if(ret[i].completed != true && ret[i].itemName == this.assets[k]){
                      var text = this.add.text(this.game.config.width*0.1, (centerXY.y-200)+(k*30), 'Buy ' + this.imageToProp.getProp(this.assets[k]).pluralName, fontConfig);
                      var asset = this.add.image(this.game.config.width*0.35, (centerXY.y-200)+(k*30), this.assets[k]);
                      text.setOrigin(0,0.5);
                      asset.displayWidth = 30;
                      asset.scaleY = asset.scaleX;
                      if (asset.displayHeight > 30){
                          asset.displayHeight = 30;
                          asset.scaleX = asset.scaleY;
                      }
                    }
                  }

                  for(var k=10; k<20; k++){
                    if(ret[i].completed != true &&ret[i].itemName == this.assets[k]){
                      var text = this.add.text(this.game.config.width*0.5, (centerXY.y-200)+((k-10)*30), 'Buy ' + this.imageToProp.getProp(this.assets[k]).pluralName, fontConfig);
                      var asset = this.add.image(this.game.config.width*0.75, (centerXY.y-200)+((k-10)*30), this.assets[k]);
                      text.setOrigin(0,0.5);
                      asset.displayWidth = 30;
                      asset.scaleY = asset.scaleX;
                      if (asset.displayHeight > 30){
                          asset.displayHeight = 30;
                          asset.scaleX = asset.scaleY;
                      }
                    }
                  }
    					}
    				})

            this.add.text(this.game.config.width*0.1, centerXY.y-250, 'Shopping List', { font: '20px Muli', fill: '0xFFFFF' });
            this.returnBtn = this.add.text(this.game.config.width*0.75, centerXY.y+220, 'Click Here to Return', fontConfig);
            this.returnBtn.setInteractive();
            this.returnBtn.on('pointerdown', function () {
                this.scene.sleep(CST.SCENES.SHOPPING_LIST);
            }, this);


        }
}
