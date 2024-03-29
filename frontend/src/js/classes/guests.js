export class Guest extends Phaser.GameObjects.Sprite{
    constructor(scene, image, x, y, name){
        super(scene);

    		this.scene = scene;

    		this.scene.add.existing(this);
    		this.setTexture(image);
    		this.setPosition(x,y);
    		this.setInteractive();

    		this.scene.input.setDraggable(this);

        this.image        = image;
       	this.name         = name;
        this.type         = "guest";
        this.customize    = false;
        this.angle        = 0;

        this.displayWidth = this.scene.game.config.width*0.07;
        this.scaleY       = this.scaleX;

        // ---- guest buttons -----
        this.rotateBtn    = this.scene.add.image(0, 0, 'RotateBtn'  );
        this.rotateBtn2   = this.scene.add.image(0, 0, 'RotateBtn2'  );
        this.scaleBtn     = this.scene.add.image(0, 0, 'ScaleBtn'   );
        this.smallerBtn   = this.scene.add.image(0, 0, 'ScaleSmaller' );
        this.forwardBtn   = this.scene.add.image(0, 0, 'Forward' ).setOrigin(0.5, 0);
        this.rightBtn     = this.scene.add.image(0, 0, 'Right'   ).setOrigin(0.5, -0.5);

        this.btnList = [this.rotateBtn, this.rotateBtn2, this.smallerBtn, this.scaleBtn, this.forwardBtn, this.rightBtn];

        // Tranparent background
        this.rect = this.scene.add.rectangle(0,
                                             0,
                                             this.rotateBtn.displayWidth+10,
                                             this.rotateBtn.displayHeight*7,
                                             0x3498DB);
        this.rect.setOrigin(0.5,0);
        this.hideButtons();

        // ---- Set item buttons functions -----
        this.rightBtn   .setInteractive();
        this.rotateBtn  .setInteractive();
        this.rotateBtn2 .setInteractive();
        this.scaleBtn   .setInteractive();
        this.smallerBtn .setInteractive();
        this.forwardBtn .setInteractive();

        this.rightBtn   .on('pointerdown', this.hideButtons,   this);
        this.rotateBtn  .on('pointerdown', this.rotateGuest,   this);
        this.rotateBtn2 .on('pointerdown', this.rotateGuest2,  this);
        this.scaleBtn   .on('pointerdown', this.biggerGuest,   this);
        this.smallerBtn .on('pointerdown', this.smallerGuest,  this);
        this.forwardBtn .on('pointerdown', this.bringForward,  this);

        // ---- Guest button only shows if hold was not caused by dragging ------
        this.on('pointerdown', function(pointer){ this.wasDragging = false; },this);

        this.on('pointerup', function(pointer){
            var duration = pointer.getDuration();
            if (duration > 300){
                if(this.customize == false && this.wasDragging == false){
                    this.showButtons();
                }
            }
        },this);

    }

    showButtons(){
        this.alpha            = 0.6;
        this.input.draggable  = false;
        var btnX              = this.x+(this.displayWidth/2);
        var btnY              = this.y-this.displayHeight/2;

        this.rect.depth = 3;

        for (var i=0; i< this.btnList.length; i++){
            this.btnList[i].x         = btnX;
            this.btnList[i].y         = btnY+i*this.btnList[i].displayHeight;
            this.btnList[i].visible   = true;
            this.btnList[i].setDepth(this.rect.depth+1);
        }

        // Transparent rectangle position
        this.rect.x = this.rotateBtn.x;
        this.rect.y = this.rotateBtn.y-this.rotateBtn.displayHeight;
        this.rect.alpha=0.7;
    }

    hideButtons(){
        this.alpha            = 1;
        this.input.draggable  = true;

        for (var i=0; i< this.btnList.length; i++){
            this.btnList[i].visible = false;
        }
        this.customize  = false;
        this.rect.alpha = 0;
    }
    destroyButtons(){
        this.rect.destroy();
        for (var i=0; i< this.btnList.length; i++){
            this.btnList[i].destroy();
        }
    }

    rotateGuest(){
        this.angle += 20;
        this.scene.tweens.add({targets: this,duration: 100,y:this.y, angle:this.angle});
    }

    rotateGuest2(){
        this.angle -= 20;
        this.scene.tweens.add({targets: this,duration: 100,y:this.y, angle:this.angle});
    }

    biggerGuest(){
        this.displayWidth += 20;
        this.scaleY        = this.scaleX;
    }

    smallerGuest(){
        if(this.displayWidth > 21){
            this.displayWidth -= 20;
            this.scaleY        = this.scaleX;
        }
    }

    bringForward(){
        this.newGuest = this.scene.add.existing(new Guest(this.scene, this.image, this.x, this.y, "Sammy"));
        this.newGuest.showButtons();
        this.destroyButtons();
        this.destroy();
    }
    bringBackward(){}
}
