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
        // Drag logic
	    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
	      gameObject.wasDragging = true;
	      gameObject.x = dragX;
	      gameObject.y = dragY;
	    });
	
	    this.input.on("dragend", function(pointer, gameObject, dragX, dragY) {
	      if(gameObject.y < (76+(gameObject.height/2)) || gameObject.y > this.scene.background.displayHeight || gameObject.x < 0 || gameObject.x > gameObject.scene.game.config.width) {
	        gameObject.x = gameObject.input.dragStartX;
	        gameObject.y = gameObject.input.dragStartY;
	      } else {
	        if(gameObject.input.dragStartY < gameObject.input.dragStartY < (76+(gameObject.height/2)) || gameObject.input.dragStartY > this.scene.background.displayHeight) {
	          gameObject.inRoom = true;
	          gameObject.scene.createItem(gameObject.image, gameObject.input.dragStartX, gameObject.input.dragStartY, gameObject.name, gameObject.pluralName, gameObject.category, gameObject.unit);
	        }
	      }
	    });

       
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
    createItem(image, x, y, name, pluralName, category, unit) {
	    this.newItem = this.add.existing(new Item(this, image, x, y, name, pluralName, category, unit));
	}

}
