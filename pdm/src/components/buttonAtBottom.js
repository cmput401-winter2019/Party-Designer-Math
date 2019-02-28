import { BuyItem } from "./BuyItem";
import { Question } from "./Question";
export class ButtonAtBottom extends Phaser.GameObjects.Container {

  constructor(config) {
    if(!config.scene || !config.text) {
      console.log("Missing scene or text");
      return;
    }

    super(config.scene);

    this.scene        = config.scene;
    this.startHeight  = config.startHeight;
    this.btnHeight    = config.btnHeight;
    this.btnWidth     = config.btnWidth;
    this.btnColor     = config.btnColor;
    this.assets       = config.assets;
    this.clicked = false;
    this.loadedassets = []

    // Draw Rectangle
    this.rect = this.scene.add.rectangle(0,
                                        this.startHeight,
                                        this.btnWidth,
                                        this.btnHeight,
                                        this.btnColor);

    this.rect.setOrigin(0,0);
    this.rect.setStrokeStyle(0.75, 0xffffff);
    this.add(this.rect);

    // Add Text
    this.textConfig = { fontFamily  : "Muli",
                        color       : "#ffffff",
                        fontSize    : "20px"
                      };

    this.text = this.scene.add.text(this.btnWidth*0.25,
                                    this.startHeight+(this.btnHeight/2),
                                    config.text,
                                    this.textConfig);

    this.text.setOrigin(0,0.5);
    this.add(this.text);

    // mouse over Button effect
    this.setSize( this.btnWidth,
                  this.btnHeight);

    this.rect.setInteractive();

    this.rect.on( "pointerover",
                  function(pointer) { this.alpha = 0.7; console.log(this.clicked)},
                  this);

    this.rect.on( "pointerout",
                  function(pointer) { if (this.clicked == false) this.alpha = 1; },
                  this);



    var index;
    var height = 250;
    var width  = 550;
    var offset = 0;
    for(index = 0; index < this.assets.length; ++index) {
        let asset1 = this.scene.add.image(height+offset,width,this.assets[index]);
        asset1.visible = false
        asset1.displayHeight = 40;
        asset1.displayWidth = 40;
        asset1.setInteractive();
        asset1.name = this.assets[index];
        asset1.on("pointerup", ()=> {
            this.buyItem = new BuyItem(this.scene, this.assets[index]);
            this.buyItem.buyButton.setInteractive();
            this.buyItem.buyButton.on("pointerup", ()=> {
              this.question = new Question(this.scene, asset1.name, this.buyItem.buyAmount);
              this.question.questionSubmitBackground.setInteractive();
              this.question.questionSubmitBackground.on("pointerup", ()=> {
                this.question.destroy();

              });
              //console.log(this.question.name + " " + this.question.amount);
              this.buyItem.destroy();
            });
        });
        offset += 100;
        this.loadedassets.push(asset1);
    }

    this.rect.on( "pointerdown",
                  this.activateBtn,
                  this);

    this.scene.add.existing(this);
  }

  activateBtn() {
    var index;
    var height = 250;
    var width  = 550;
    var offset = 0;


    if(this.text._text == "Furniture") {
      /*this.clicked = true;
      this.alpha = 0.7;
      for(index = 0; index < this.assets.length; ++index) {
        let asset = this.scene.add.image(height+offset,width,this.assets[index]);
        asset.displayHeight = 40;
        asset.displayWidth = 40;
        asset.setInteractive();
        asset.on("pointerup", ()=> {
            let buyItem = new BuyItem(this.scene, this.assets[index]);
            buyItem.buyButton.setInteractive();
            buyItem.buyButton.on("pointerup", ()=> {
                buyItem.destroy();
            });
        });
        this.loadedassets.push(asset);
        offset += 100;
      }*/
      this.clicked = true;
      this.alpha = 0.7;
    }

    if(this.text._text == "Decoration") {
      /*this.clicked = true;
      this.alpha = 0.7;
      for(index = 0; index < this.assets.length; ++index) {
        let asset = this.scene.add.image(height+offset,width,this.assets[index]);
        asset.displayHeight = 40;
        asset.displayWidth = 40;
        asset.setInteractive();
        asset.on("pointerup", ()=> {
            let buyItem = new BuyItem(this.scene, this.assets[index]);
            buyItem.buyButton.setInteractive();
            buyItem.buyButton.on("pointerup", ()=> {
                buyItem.destroy();
            });
        });
        this.loadedassets.push(asset);
        offset += 100;
      }*/
      this.clicked = true;
      this.alpha = 0.7;
    }

    else if(this.text._text == "Snacks") {
      /*this.clicked = true;
      this.alpha = 0.7;
      for(index = 0; index < this.assets.length; ++index) {
        let asset = this.scene.add.image(height+offset,width,this.assets[index]);
        asset.displayHeight = 40;
        asset.displayWidth = 40;
        asset.setInteractive();
        asset.on("pointerup", ()=> {
            let buyItem = new BuyItem(this.scene, this.assets[index]);
            buyItem.buyButton.setInteractive();
            buyItem.buyButton.on("pointerup", ()=> {
                buyItem.destroy();
            });
        });
        this.loadedassets.push(asset);
        offset += 100;
      }*/
      this.clicked = true;
      this.alpha = 0.7;
    }

    else if(this.text._text == "Kiddie Bag") {
      /*this.clicked = true;
      this.alpha = 0.7;
      for(index = 0; index < this.assets.length; ++index) {
        let asset = this.scene.add.image(height+offset,width,this.assets[index]);
        asset.displayHeight = 40;
        asset.displayWidth = 40;
        asset.setInteractive();
        asset.on("pointerup", ()=> {
            let buyItem = new BuyItem(this.scene, this.assets[index]);
            buyItem.buyButton.setInteractive();
            buyItem.buyButton.on("pointerup", ()=> {
                buyItem.destroy();
            });
        });
        this.loadedassets.push(asset);
        offset += 100;
      }*/
      this.clicked = true;
      this.alpha = 0.7;
    }

  }

}
