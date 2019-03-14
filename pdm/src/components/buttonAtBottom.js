import {CST} from "../CST";
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
    this.itemY        = config.itemY;
    this.btnWidth     = config.btnWidth;
    this.btnColor     = config.btnColor;
    this.assets       = config.assets;
    this.clicked      = false;
    this.loadedassets = [];
    this.currentPage  = 0;

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

    // Set images associated with the button
    var index;
    var offset = 50;
    for(index = 0; index < this.assets.length; ++index) {
        let asset1 = this.scene.add.image(this.btnWidth+offset,this.itemY,this.assets[index]);
        asset1.visible = false
        asset1.displayWidth = 40;
        asset1.scaleY = asset1.scaleX;
        asset1.setInteractive();
        asset1.name = this.assets[index];
        asset1.on("pointerup", ()=> {
            this.scene.scene.launch(CST.SCENES.BUY_POPUP, {objName: asset1.name, originalS:this.scene});
        });
        offset += 100;
        this.loadedassets.push(asset1);
    }

    this.rect.on( "pointerdown",
                  this.activateBtn,
                  this);

    this.scene.add.existing(this);
  }
  visibleAndInvisible(buttonName){
    // Turning on the visibility of items in category of depicted by the button name
    // Turning off the visibility of items in other categories

    // Making buttons visible at full opacity again
    this.scene.bottomBtn1.clicked = false; this.scene.bottomBtn1.alpha = 1;
    this.scene.bottomBtn2.clicked = false; this.scene.bottomBtn2.alpha = 1;
    this.scene.bottomBtn3.clicked = false; this.scene.bottomBtn3.alpha = 1;
    this.scene.bottomBtn4.clicked = false; this.scene.bottomBtn4.alpha = 1;

    var index;
    // ----- Furniture ----
    if(buttonName == "Furniture"){
      for(index = 0; index < this.scene.bottomBtn1.loadedassets.length; ++index) {
        this.scene.bottomBtn1.loadedassets[index].visible = true;
        console.log("turning visible: " + this.scene.bottomBtn1.loadedassets[index].name);
      }
    } else{
      for(index = 0; index < this.scene.bottomBtn1.loadedassets.length; ++index) {
        this.scene.bottomBtn1.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.scene.bottomBtn1.loadedassets[index].name);
      }
    }
    // ----- Decoration ----
    if(buttonName == "Decoration"){
      for(index = 0; index < this.scene.bottomBtn2.loadedassets.length; ++index) {
        this.scene.bottomBtn2.loadedassets[index].visible = true;
        console.log("turning visible: " + this.scene.bottomBtn2.loadedassets[index].name);
      }
    } else {
      for(index = 0; index < this.scene.bottomBtn2.loadedassets.length; ++index) {
        this.scene.bottomBtn2.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.scene.bottomBtn2.loadedassets[index].name);
      }
    }
    // ----- Snacks -----
    if(buttonName == "Snacks"){
      for(index = 0; index < this.scene.bottomBtn3.loadedassets.length; ++index) {
        this.scene.bottomBtn3.loadedassets[index].visible = true;
        console.log("turning visible: " + this.scene.bottomBtn3.loadedassets[index].name);
      }
    } else {
      for(index = 0; index < this.scene.bottomBtn3.loadedassets.length; ++index) {
        this.scene.bottomBtn3.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.scene.bottomBtn3.loadedassets[index].name);
      }
    }
    // ----- Kiddie Bag -----
    if (buttonName == "Kiddie Bag"){
      for(index = 0; index < this.scene.bottomBtn4.loadedassets.length; ++index) {
        this.scene.bottomBtn4.loadedassets[index].visible = true;
        console.log("turning iisible: " + this.scene.bottomBtn4.loadedassets[index].name);
      }
    } else {
      for(index = 0; index < this.scene.bottomBtn4.loadedassets.length; ++index) {
        this.scene.bottomBtn4.loadedassets[index].visible = false;
        console.log("turning invisible: " + this.scene.bottomBtn4.loadedassets[index].name);
    }
    }
    

  }
  activateBtn() {
    if(this.text._text == "Furniture") {
      this.visibleAndInvisible(this.text._text);

      this.clicked = true;
      this.alpha = 0.7;
    }

    if(this.text._text == "Decoration") {
      this.visibleAndInvisible(this.text._text);
      
      this.clicked = true;
      this.alpha = 0.7;
    }

    else if(this.text._text == "Snacks") {
      this.visibleAndInvisible(this.text._text);
      
      this.clicked = true;
      this.alpha = 0.7;
    }

    else if(this.text._text == "Kiddie Bag") {
      this.visibleAndInvisible(this.text._text);

      this.clicked = true;
      this.alpha = 0.7;
    }

  }

}
