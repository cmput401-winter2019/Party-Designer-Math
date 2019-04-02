import {CST} from "../CST";
import { AlignGrid } from "../util/alignGrid";
import { ImageToProperties } from "../classes/imageToProperties";
export class ShoppingInterface extends Phaser.Scene{

        constructor(){
            super({ key: CST.SCENES.SHOPPING_LIST })
        }

        //Checks if objectives are met.
        init( data){
            this.number = data.n;
            this.assets = data.assets;
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
            var fontConfig  = { font: '16px Muli', fill: '0xFFFFF' };

            // Initiate ImageToProperties class
            this.imageToProp = new ImageToProperties();
            // First column
            for(var i = 0; i < 10; i++){
                var text = this.add.text(this.game.config.width*0.1, (centerXY.y-200)+(i*30), 'Buy '+ this.number[i] + " " + this.imageToProp.getProp(this.assets[i]).pluralName, fontConfig);
                var asset = this.add.image(this.game.config.width*0.35, (centerXY.y-200)+(i*30), this.assets[i]);
                text.setOrigin(0,0.5);
                asset.displayWidth = 30;
                asset.scaleY = asset.scaleX;
                if (asset.displayHeight > 30){
                    asset.displayHeight = 30;
                    asset.scaleX = asset.scaleY;
                }
            }
            // Second column
            for(var i = 10; i < 20; i++){
                var text = this.add.text(this.game.config.width*0.5, (centerXY.y-200)+((i-10)*30), 'Buy '+ this.number[i] + " " + this.imageToProp.getProp(this.assets[i]).pluralName, fontConfig);
                var asset = this.add.image(this.game.config.width*0.75, (centerXY.y-200)+((i-10)*30), this.assets[i]);
                text.setOrigin(0,0.5);
                asset.displayWidth = 30;
                asset.scaleY = asset.scaleX;
                if (asset.displayHeight > 30){
                    asset.displayHeight = 30;
                    asset.scaleX = asset.scaleY;
                }
            }
            this.add.text(this.game.config.width*0.1, centerXY.y-250, 'Shopping List', { font: '20px Muli', fill: '0xFFFFF' });
            this.returnBtn = this.add.text(this.game.config.width*0.75, centerXY.y+220, 'Click Here to Return', fontConfig);
            this.returnBtn.setInteractive();
            this.returnBtn.on('pointerdown', function () {
                this.scene.sleep(CST.SCENES.SHOPPING_LIST);
            }, this);


        }
}
