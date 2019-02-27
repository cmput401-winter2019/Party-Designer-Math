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
                  function(pointer) { this.alpha = 0.7; },
                  this);

    this.rect.on( "pointerout",
                  function(pointer) { this.alpha = 1; },
                  this);

    this.rect.on( "pointerdown",
                  this.activateBtn,
                  this);

    this.scene.add.existing(this);
  }

  activateBtn() {
    var index;
    var height = 300;
    var width  = 550;
    var offset = 0;


    if(this.text._text == "Furniture") {
      for(index = 0; index < this.assets.length; ++index) {
        this.scene.add.image( height+offset,
                              width,
                              this.assets[index]);
        offset += 100;
      }
    }

    else if(this.text._text == "Decoration") {
      for(index = 0; index < this.assets.length; ++index) {
        this.scene.add.image( height+offset,
                              width,
                              this.assets[index]);
        offset += 100;
      }
    }

    else if(this.text._text == "Snacks") {
      for(index = 0; index < this.assets.length; ++index) {
        this.scene.add.image( height+offset,
                              width,
                              this.assets[index]);
        offset += 100;
      }
    }

    else if(this.text._text == "Kiddie Bag") {
      for(index = 0; index < this.assets.length; ++index) {
        this.scene.add.image( height+offset,
                              width,
                              this.assets[index]);
        offset += 100;
      }
    }

  }

}
