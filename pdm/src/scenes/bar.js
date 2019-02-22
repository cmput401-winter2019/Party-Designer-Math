class Bar extends Phaser.GameObjects.Container {
	constructor(config){
		super(config.scene);
		this.scene=config.scene;
		if(!config.color){
			config.color= 0xff0000;
		}
		if(!config.backColor){
			config.backColor= 0xd3d3d3;
		}
		if(!config.width)
		{
			config.width=200;
		}
		if(!config.height){
			config.height = config.width/4;
		}

		// draw the bar
		// 
		this.graphics = this.scene.add.graphics();
		this.graphics.fillStyle(config.color,2);
		this.graphics.fillRect(0,0, config.width, config.height);

		this.add(this.graphics);
		this.graphics.x=-config.width/2;
		this.graphics.y=-config.width/2;

		this.graphics2 = this.scene.add.graphics();
		this.graphics2.lineStyle(1, config.backColor);
		this.graphics2.strokeRect(0, 0, config.width, config.height);
		this.add(this.graphics2);
		this.graphics2.x=this.graphics.x;
		this.graphics2.y=this.graphics.y;

		if (config.x){
			this.x=config.x;
		}
		if (config.y){
			this.y=config.y;
		}

		

		this.scene.add.existing(this);
	}
	setPercent(per)
	{
		this.graphics.scaleX = per;
	}
}