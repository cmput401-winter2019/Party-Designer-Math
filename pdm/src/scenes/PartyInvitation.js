import { CST }            from "../CST";
import { ButtonAtBottom } from "../components/buttonAtBottom";

export class PartyInvitation extends Phaser.Scene {

    constructor() {
        super(CST.SCENES.PARTY_INVITATION);
    }
    preload()
    {
        this.load.image("blueBtn", "assets/blueBtn.png");
    }
    create(){
       
        this.btn = new ButtonAtBottom({     scene       : this,
                                            text        : "Send Invitations",
                                            startHeight : 100,
                                            btnHeight   : 50,
                                            btnWidth    : 200,
                                            btnColor    : 0x8B4513,
                                            assets      : [],
                                            itemY       : 0
                                          });
        this.btn.rect.setInteractive();
        this.btn.rect.on('pointerdown', this.pressed, this);
    }
    pressed(){
        this.scene.start(CST.SCENES.PARTY_LOAD);
    }

}
