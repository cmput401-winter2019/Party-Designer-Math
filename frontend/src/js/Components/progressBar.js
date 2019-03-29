export class ProgressBar extends Phaser.GameObjects.Container{ 
    constructor(config){
        super(config.scene);
        // If there is x and/or y place it at its x/y
        this.scene=config.scene;

        if(!config.width)
		{
			config.width=200;
		}
		if(!config.height){
			config.height = config.width/10;
        }

        // White background
        this.back = this.scene.add.graphics();
        this.back.fillStyle(0xffffff,1);
        this.back.fillRoundedRect(0, 0, config.width, config.height, 10);
        this.add(this.back);

        // Progress rectangle
        this.bar = this.scene.add.graphics();
        this.bar.fillStyle(config.color,1);
        this.bar.fillRoundedRect(0, 0, config.width, config.height, 10);
		this.add(this.bar);

        // White outline
        this.backOutline = this.scene.add.graphics();
        this.backOutline.lineStyle(3, 0xffffff);
        this.backOutline.strokeRoundedRect(0, 0, config.width, config.height, 10);
		this.add(this.backOutline);
        
        this.scene.add.existing(this);
        
        if (config.x){
			this.x=config.x;
		}
		if (config.y){
			this.y=config.y;
		}


        this.scene.add.existing(this);

    }
    setPercent(per) // Takes in a number from 0 to 1
	{
		this.bar.scaleX = per;
	}

    
    
}