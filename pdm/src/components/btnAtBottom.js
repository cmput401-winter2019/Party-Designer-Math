export class BtnAtBottom extends Phaser.GameObjects.Container{ 
    constructor(config)
	{
        if(!config.scene || !config.text)
		{
			console.log("missing scene or text!");
			return;
		}
        super(config.scene);
		this.scene=config.scene;

        this.startHeight = config.startHeight;
        this.btnHeight = config.btnHeight;
        this.btnWidth = config.btnWidth;

        // Draw Rectangle
        this.rect = this.scene.add.rectangle(0, this.startHeight, this.btnWidth, this.btnHeight, 0x0e4361); // x, y, width, height
        this.rect.setOrigin(0,0);
        this.rect.setStrokeStyle(0.75, 0xffffff);
        this.add(this.rect);
        
        // Add text
		this.textConfig = {fontFamily:'Muli', color:'#ffffff', fontSize:'20px'};
		this.text1=this.scene.add.text(this.btnWidth*0.25,this.startHeight+(this.btnHeight/2), config.text, this.textConfig);
		this.text1.setOrigin(0,0.5);
		this.add(this.text1);

		// Button has mouse over effect on desktop computers
        this.setSize(this.btnWidth, this.btnHeight);
        this.rect.setInteractive();
        this.rect.on('pointerover', function(pointer){
            this.alpha = 0.7;
        }, this);
        this.rect.on('pointerout', function(pointer){
            this.alpha = 1;
        }, this);

        this.scene.add.existing(this);
    
    }



}