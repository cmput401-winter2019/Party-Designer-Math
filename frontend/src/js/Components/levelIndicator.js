export class LevelIndicator extends Phaser.GameObjects.Container{
    // Need scene
	constructor(config)
	{
        super(config.scene);
		this.scene=config.scene;

         // Circle
        this.circle = this.scene.add.graphics();
        this.circle.fillStyle(0xffffff, 1);
        this.circle.fillCircle(0, 0, 19);
        this.add(this.circle);

        // Texts
        this.textConfig1 = {fontFamily:'Muli', color:'#000000', fontSize:'25px'};
        this.textConfig2 = {fontFamily:'Muli', color:'#ffffff', fontSize:'12px'};
		this.text=this.scene.add.text(0,0,config.text, this.textConfig1);
        this.text2=this.scene.add.text(0,30,"Level", this.textConfig2);
		this.text.setOrigin(0.5,0.5);
        this.text2.setOrigin(0.5,0.5);
		this.add(this.text);
        this.add(this.text2);


        // If there is x and/or y place it at its x/y
        if(config.x){
			this.x=config.x;
		}
		if(config.y){
			this.y=config.y;
		}
        

        this.setSize(20, 60);
		this.scene.add.existing(this);

    }
}