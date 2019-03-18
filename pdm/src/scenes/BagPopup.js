import {CST} from "../CST";
import { AlignGrid } from "../util/alignGrid";
import { ImageToProperties } from "../classes/imageToProperties";

export class BagPopup extends Phaser.Scene{

    constructor(){
        super({
                key: CST.SCENES.BAG_POPUP
        })
    }
    init(data)
    {
        // this.objName = data.objName;
        this.player = data.player;
    }
    preload()
    {
    }
    create(){
        // Drag logic
        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
        });
        
        this.alignGrid = new AlignGrid({
            scene: this,
            rows: 21,
            cols: 21
        });
        //this.alignGrid.showNumbers();
        var fontConfig = { font: '16px Muli', fill: '0x000000' };
         
        // Main rectangle of the scene
        this.popupHeight = 540;
        this.rect = this.add.rectangle(0, 0, this.game.config.width*0.9, this.popupHeight, 0xffffff);
        this.rect.setOrigin(0.5,0.5);
        this.rect.setStrokeStyle(2, 0x000000);
        this.alignGrid.placeAtIndex(220, this.rect);

        for (var key in this.player.backpack){
            console.log(key, this.player.backpack[key]);
        }

        // Configs
        var centerXY = this.alignGrid.getPosByIndex(220);
        var fontConfig = { font: '16px Muli', fill: '0xFFFFF' };

        // Initiate ImageToProperties class
        this.imageToProp = new ImageToProperties();
        // List item (key-value pairs) in player's backpack
        var i = 0;
        for(var key in this.player.backpack){
            var text = this.add.text(this.game.config.width*0.1, (centerXY.y-150)+(i*30), this.imageToProp.getProp(key).name, fontConfig);
            var text2 = this.add.text(this.game.config.width*0.1+150, (centerXY.y-150)+(i*30), this.player.backpack[key], fontConfig);
            var asset = this.add.image(this.game.config.width*0.35, (centerXY.y-150)+(i*30), key);
            text.setOrigin(0,0.5);
            text2.setOrigin(0,0.5);
            asset.displayWidth = 30;
            asset.scaleY = asset.scaleX;
            if (asset.displayHeight > 30){
                asset.displayHeight = 30;
                asset.scaleX = asset.scaleY;
            }
            i++;
        }

        this.add.text(this.game.config.width*0.1, centerXY.y-250, 'Backpack', { font: '20px Muli', fill: '0xFFFFF' });
        this.add.text(this.game.config.width*0.1, centerXY.y-200, 'ITEM NAME' + '           '+ 'OWNED', { font: '17px Muli', fill: '0xFFFFF' });
        this.returnBtn = this.add.text(this.game.config.width*0.75, centerXY.y+220, 'Click Here to Return', fontConfig);
        this.returnBtn.setInteractive();
        this.returnBtn.on('pointerdown', function () {
            this.scene.sleep(CST.SCENES.BAG_POPUP);
        }, this);
    }

}