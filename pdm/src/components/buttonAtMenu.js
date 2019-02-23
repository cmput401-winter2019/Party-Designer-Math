export class ButtonAtMenu{ 
    constructor(config)
	{
        if(!config.scene)
		{
			console.log("missing scene!");
			return;
		}
		if (!config.key)
		{
			console.log("missing key");
			return;
		}
        //super(config.scene);
		this.scene=config.scene;


        this.name = config.key;
        this.back=this.scene.add.image(0,0,config.key);
        //this.add(this.back);

        // If there is text, add text
        if(config.text)
		{
			if (config.textConfig)
			{
				this.text1=this.scene.add.text(0,0,config.text, config.textConfig);
			}
			else 
			{
				this.text1=this.scene.add.text(0,0,config.text);
			}
			
			this.text1.setOrigin(0.5,0.5);
			//this.add(this.text1);
		}

        // If there is x and/or y place it at its x/y
        if(config.x){
			this.x=config.x;
		}
		if(config.y){
			this.y=config.y;
		}

		this.scene.add.existing(this);


		if (config.event)
		{
			this.back.setInteractive ();
			this.back.on('pointerdown', this.pressed, this);
		}

		// if(model.isMobile==-1)
		// {
		// 	this.back.on("pointerover", this.over, this);
		// 	this.back.on("pointerout", this.out, this);
		// }
    }
    over()
	{
		this.y-=5;
	}
	out()
	{
		this.y+=5;
	}

	pressed()
	{	
		console.log(this.name);
	}


}