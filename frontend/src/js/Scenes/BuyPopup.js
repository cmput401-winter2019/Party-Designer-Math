import {CST} from "../CST.js";
import { AlignGrid } from "../util/alignGrid.js";
import { BuyItem } from "../Components/BuyItem.js";

export class BuyPopup extends Phaser.Scene{

    constructor(){
        super({
                key: CST.SCENES.BUY_POPUP
        })
    }
    init(data)
    {
        this.objName = data.objName;
        this.originalS = data.originalS;
        this.player = data.player;
        this.credit_text = data.credit_text;
        this.progressBar = data.progressBar;
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

        this.buyItemPopup = new BuyItem(this, this.objName, this.player, this.credit_text, this.progressBar);

        // this.question = new Question(this, "chair", 2);

        this.buyItemPopup.setInteractive();
        this.input.setDraggable(this.buyItemPopup);
    }
}
