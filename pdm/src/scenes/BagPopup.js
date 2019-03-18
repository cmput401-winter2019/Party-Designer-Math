import {CST} from "../CST";
import { AlignGrid } from "../util/alignGrid";
import { ImageToProperties } from "../classes/imageToProperties";
import { Button } from "../components/button";


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
        this.originalS = data.originalS;
    }
    preload()
    {
    }
    create(){
        this.popupOpen=false;
        this.popup;
    
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

        // Configs
        var centerXY = this.alignGrid.getPosByIndex(220);
        var fontConfig = { font: '16px Muli', fill: '0xFFFFF' };

        // Initiate ImageToProperties class
        this.imageToProp = new ImageToProperties();
        // List item (key-value pairs) in player's backpack
        var keys = [];
        this.btnList = {};
        var i = 0;
        for(var key in this.player.backpack){
            keys.push(key);
            i++;
        }
        for(var i=0; i<keys.length; i++){
            var currentY = (centerXY.y-150)+(i*40)
            var text = this.add.text(this.game.config.width*0.1, currentY, this.imageToProp.getProp(keys[i]).name, fontConfig);
            var text2 = this.add.text(this.game.config.width*0.1+150, currentY, this.player.backpack[keys[i]], fontConfig);
            var asset = this.add.image(this.game.config.width*0.35, currentY, keys[i]);
            
            let btn = new Button({  scene   : this,
                                    key   : "blueBtn",
                                    text  : "Move to Room",
                                    x     : this.game.config.width*0.45,
                                    y     : currentY,
                                    event : "button_pressed",
                                    params: keys[i],
                                    params2: this.player.backpack[keys[i]]
                                });

            text.setOrigin(0,0.5);
            text2.setOrigin(0,0.5);
            asset.displayWidth = 30;
            asset.scaleY = asset.scaleX;
            if (asset.displayHeight > 30){
                asset.displayHeight = 30;
                asset.scaleX = asset.scaleY;
            }
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