export class Alert extends Phaser.GameObjects.Container{
    constructor(scene, purpose){
        super(scene);
        this.scene = scene;
        this.purpose = purpose;

        //Screen center
        var centerX = this.scene.game.config.width/2;
        var centerY = this.scene.game.config.height/2;

        this.textConfig = {fontFamily:'Muli', color:'#000000', fontSize:'16px'};

        //Create a rectangle background where everything for the prompt will be displayed on and add the text
        this.background = this.scene.add.rectangle(0, 0, this.scene.game.config.width*0.4, 90, 0xffffff);
        this.background.setStrokeStyle(1.5, 0x000000);
        if(this.purpose == "start"){
            this.text = "Shopping List is not Complete\n\n Please complete the Shopping List";
        } else if (this.purpose == "logout"){
            this.text = "";
        }
        this.popUpText = this.scene.add.text(0, 0-20, this.text, this.textConfig);
        this.popUpText.setOrigin(0.5,0.5);

        //OK button
        this.confirmButton = this.scene.add.rectangle(0+45, 0+25, 35, 15, 0x02C2FF);
        this.confirmButton.setStrokeStyle(1.5, 0xB2B3B4);
        this.confirmButtonText = this.scene.add.text(0+33, 0+17, "OK", {fontFamily:'Muli', color:'#ffffff', fontSize:'12px'});
        this.confirmButton.setInteractive();

        //Add all objects to container
        this.add(this.background);
        this.add(this.popUpText);
        this.add(this.confirmButton);
        this.add(this.confirmButtonText);
        this.scene.add.existing(this);

        this.setSize(this.scene.game.config.width*0.3, 90);//.setOrigin(0,0);
        this.x = centerX;
        this.y = centerY;
        this.setInteractive();
        this.scene.input.setDraggable(this);

        this.confirmButton.on('pointerdown', this.destroyContainer, this);
    }

    destroyContainer(){ this.destroy(); }
}
