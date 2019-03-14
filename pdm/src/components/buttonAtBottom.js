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
    this.numItemPerPage = Math.floor((this.scene.game.config.width*0.7)/100);
    this.numItemLastPage = this.assets.length%this.numItemPerPage;
    this.numOfPages = Math.ceil(this.assets.length/this.numItemPerPage);

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

    // Draw page turner
    this.rectLeft = this.scene.add.rectangle(this.btnWidth,
                                        this.itemY,
                                        this.btnWidth*0.25,
                                        this.btnHeight*4,
                                        0xffffff);
    this.rectLeft.setOrigin(0,0.5);
    this.rectRight = this.scene.add.rectangle(this.scene.game.config.width-this.btnWidth*0.25,
                                        this.itemY,
                                        this.btnWidth*0.25,
                                        this.btnHeight*4,
                                        0xffffff);
    this.rectRight.setOrigin(0,0.5);
    this.rectLeft.setInteractive();
    this.rectRight.setInteractive();
    this.rectLeft.on("pointerdown", ()=>{
      if (this.currentPage>0){
        this.hideCurrentPage(this.text._text);
        this.currentPage -=1;  
        this.showCurrentPage(this.text._text);      
        console.log("Current Page of",this.text._text, this.currentPage);
      }
    });
    this.rectRight.on("pointerdown", ()=>{
      if (this.currentPage<this.numOfPages-1){
        this.hideCurrentPage(this.text._text);
        this.currentPage +=1;
        this.showCurrentPage(this.text._text);
        console.log("Current Page of",this.text._text, this.currentPage);
      }
    });
    
    // Set images associated with the button
    var page=0;
    while(page<this.numOfPages){
      var offset=100;
      var min = this.numItemPerPage;
      if (page+1==this.numOfPages && this.numItemLastPage!=0){
        min = this.numItemLastPage;
        
      }
      console.log("Page",page);
      console.log("Min",min);
      for(var i=page*this.numItemPerPage; i<page*this.numItemPerPage+min; i++){
        console.log(i);
        let asset1 = this.scene.add.image(this.btnWidth+offset,this.itemY,this.assets[i]).setOrigin(0,0.5);
        asset1.visible = false
        asset1.displayWidth = 40;
        asset1.scaleY = asset1.scaleX;
        asset1.setInteractive();
        asset1.name = this.assets[i];
        asset1.on("pointerup", ()=> {
            this.scene.scene.launch(CST.SCENES.BUY_POPUP, {objName: asset1.name, originalS:this.scene});
        });
        offset+=100;
        this.loadedassets.push(asset1);
      }
      page++;
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

    // Makeing Page turning button invisble
    this.scene.bottomBtn1.rectLeft.visible=false;
    this.scene.bottomBtn1.rectRight.visible=false;
    this.scene.bottomBtn2.rectLeft.visible=false;
    this.scene.bottomBtn2.rectRight.visible=false;
    this.scene.bottomBtn3.rectLeft.visible=false;
    this.scene.bottomBtn3.rectRight.visible=false;
    this.scene.bottomBtn4.rectLeft.visible=false;
    this.scene.bottomBtn4.rectRight.visible=false;

    // ----- Furniture ----
    if(buttonName == "Furniture"){
      this.scene.bottomBtn1.rectLeft.visible=true;
      this.scene.bottomBtn1.rectRight.visible=true;
      this.showCurrentPage("Furniture");

    } else{
      this.hideCurrentPage("Furniture");
    }
    // ----- Decoration ----
    if(buttonName == "Decoration"){
      this.scene.bottomBtn2.rectLeft.visible=true;
      this.scene.bottomBtn2.rectRight.visible=true;
      this.showCurrentPage("Decoration");
    } else {
      this.hideCurrentPage("Decoration");
    }
    // ----- Snacks -----
    if(buttonName == "Snacks"){
      this.scene.bottomBtn3.rectLeft.visible=true;
      this.scene.bottomBtn3.rectRight.visible=true;
      this.showCurrentPage("Snacks");
    } else {
      this.hideCurrentPage("Snacks");
    }
    // ----- Kiddie Bag -----
    if (buttonName == "Kiddie Bag"){
      this.scene.bottomBtn4.rectLeft.visible=true;
      this.scene.bottomBtn4.rectRight.visible=true;
      this.showCurrentPage("Kiddie Bag");
    } else {
      this.hideCurrentPage("Kiddie Bag");
    }
  }

  hideCurrentPage(buttonName){
    var index;
    var currentBtn;
    if(buttonName == "Furniture"){
      currentBtn = this.scene.bottomBtn1;
    } else if (buttonName == "Decoration"){
      currentBtn = this.scene.bottomBtn2;
    } else if (buttonName == "Snacks"){
      currentBtn = this.scene.bottomBtn3;
    } else if (buttonName == "Kiddie Bag"){
      currentBtn = this.scene.bottomBtn4;
    }
    for(index = 0; index < currentBtn.loadedassets.length; ++index) {
        currentBtn.loadedassets[index].visible = false;
        //console.log("turning invisible: " + this.scene.bottomBtn1.loadedassets[index].name);
      }
  }

  showCurrentPage(buttonName){
    var currentBtn;
    var min;
    if(buttonName == "Furniture"){
      currentBtn = this.scene.bottomBtn1;
    } else if (buttonName == "Decoration"){
      currentBtn = this.scene.bottomBtn2;
    } else if (buttonName == "Snacks"){
      currentBtn = this.scene.bottomBtn3;
    } else if (buttonName == "Kiddie Bag"){
      currentBtn = this.scene.bottomBtn4;
    }

    if (currentBtn.currentPage+1==currentBtn.numOfPages && currentBtn.numItemLastPage!=0){
        min = currentBtn.numItemLastPage;
    } else {
        min = currentBtn.numItemPerPage;
    }
    for(var index = currentBtn.currentPage*currentBtn.numItemPerPage; index < min+currentBtn.currentPage*currentBtn.numItemPerPage; index++) {
      currentBtn.loadedassets[index].visible = true;
    }
  }

  activateBtn() {
    console.log("Num in list", this.assets.length);
    console.log("Num per page:", this.numItemPerPage);
    console.log("Num of pages", this.numOfPages, "=", this.assets.length, "/", this.numItemPerPage);
    console.log("Num of last page item:", this.numItemLastPage);
    
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
