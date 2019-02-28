export class Question extends Phaser.GameObjects.Container{ 
    constructor(scene, name, amount){
        super(scene);
        //Initialize members
        this.scene = scene;
        this.name = name;
        this.amount = amount;

        //Configurations for text
        this.textConfig = {fontFamily:'Muli', color:'#ffffff', fontSize:'12px'};

        this.questionBackground = this.scene.add.rectangle(1, 1, 300, 90, 0x0e4361);
        //this.questionBackground.setOrigin(0, 0);
        this.questionBackground.setStrokeStyle(1.5, 0xffffff);
        this.questionText = this.scene.add.text(65-145, 20-45, "How much would it cost to buy\n" + this.amount + " " + this.name + "?", this.textConfig);
        //this.questionText.setOrigin(0, 0);

        this.questionSubmitBackground = this.scene.add.rectangle(150-145, 65-45, 55, 15, 0x0e4361);
        //this.questionSubmitBackground.setOrigin(0,0)
        this.questionSubmitBackground.setStrokeStyle(1.5, 0xffffff);
        this.questionSubmitText = this.scene.add.text(127-145, 57-45, "SUBMIT", this.textConfig);
        //this.questionSubmitText.setOrigin(0,0);

        this.add(this.questionBackground);
        this.add(this.questionText);
        this.add(this.questionSubmitBackground);
        this.add(this.questionSubmitText);
        this.scene.add.existing(this);
        //this.scene.setOrigin(0,0);
        this.setSize(300, 90);//.setOrigin(0,0);
        this.x = 350;
        this.y = 350;

        //this.scene.game.debug.body(this);
        //Phaser.Actions.setOrigin([this.questionBackground], 0, 0);

        this.setInteractive();      
        
        this.scene.input.setDraggable(this);
        
        this.scene.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
        });


    
    }
}
