import { BuyItem } from "./BuyItem";
import { Question} from "./Question";
import { Item    } from "../classes/Item";


export class ButtonAtBottom extends Phaser.GameObjects.Container {

  constructor(config) {
    if(!config.scene || !config.text) {
      console.log("Missing Scene or Text");
      return;
    }

    super(config.scene);

    this.scene        = config.scene;
    this.startHeight  = config.startHeight;
    this.btnHeight    = config.btnHeight;
    this.itemY        = config.itemY;
    this.btnWidth     = config.btnWidth;
    this.btnColor     = config.btnColor;
    this.assets       = config.assets;
    this.text         = config.text;
    this.clicked      = false;
    this.loadedassets = [];
    this.boughtList   = [];

    this.draw_rectangle();
    this.add_text();
    this.mouse_over();

    this.create_items();

    this.rect.on("pointerdown", this.activateBtn, this);
    this.scene.add.existing(this);
  }

  activateBtn() {
    var index;
    var height  = 250;
    var width   = 550;
    var offset  = 0;

    if(this.text._text == "Furniture") {
      this.clicked  = true;
      this.alpha    = 0.7;
    }
    if(this.text._text == "Snacks") {
      this.clicked  = true;
      this.alpha    = 0.7;
    }
    if(this.text._text == "Kiddie Bag") {
      this.clicked  = true;
      this.alpha    = 0.7;
    }
    if(this.text._text == "Decoration") {
      this.clicked  = true;
      this.alpha    = 0.7;
    }

  }

  create_items() {
    var index;
    var offset = 50;

    for(index = 0; index < this.assets.length; ++index) {
      let asset1 = this.scene.add.image(this.btnWidth+offset,
                                        this.itemY,
                                        this.assets[index]);
      asset1.visible      = false;
      asset1.displayWidth = 40;
      asset1.scaleY       = asset1.scaleX;
      asset1.setInteractive();
      asset1.name         = this.assets[index];

      asset1.on("pointerup", () => {
        this.buyItem = new BuyItem(this.scene, this.assets[index]);
        this.buyItem.buyButton.setInteractive();
        this.buyItem.buyButton.on("pointerup", () => {
          this.question = new Question(this.scene, asset1.name, this.buyItem.buyAmount);
          this.question.questionSubmitBackground.setInteractive();
          this.question.questionSubmitBackground.on("pointerup", () => {
            this.question.destroy();

            var myindex;
            var counter = 50;
            for(myindex = 0; myindex < this.buyItem.buyAmount; myindex++) {
              let asset2 = this.scene.add.image(300+counter, 200, asset1.name);
              asset2.displayWidth = 60;
              asset2.scaleY       = asset2.scaleX;
              asset2.setInteractive();
              this.scene.input.setDraggable(asset2);
              counter += 50;

              this.boughtList.push(asset1.name);
              
            }
            this.item = new Item(this.scene, this.text, this.boughtList);
          });
          this.buyItem.destroy();
        });
      });
      offset += 100;
      this.loadedassets.push(asset1);
    }
  }

  mouse_over() {
    this.setSize( this.btnWidth,
                  this.btnHeight);

    this.rect.setInteractive();

    this.rect.on( "pointerover",
                  function(pointer) { this.alpha = 0.7; console.log(this.clicked)},
                  this);

    this.rect.on( "pointerout",
                  function(pointer) { if (this.clicked == false) this.alpha = 1; },
                  this);
  }

  add_text() {
    this.textConfig = { fontFamily  : "Muli",
                        color       : "#ffffff",
                        fontSize    : "20px"
                      };

    this.text1 = this.scene.add.text(this.btnWidth*0.25,
                                    this.startHeight+(this.btnHeight/2),
                                    this.text,
                                    this.textConfig);

    this.text1.setOrigin(0, 0.5);
    this.add(this.text1);
  }

  draw_rectangle() {
    this.rect = this.scene.add.rectangle( 0,
                                          this.startHeight,
                                          this.btnWidth,
                                          this.btnHeight,
                                          this.btnColor );
    this.rect.setOrigin(0, 0);
    this.rect.setStrokeStyle(0.75, 0xffffff);
    this.add(this.rect);
  }
}
