export class ButtonAtMenu extends Phaser.GameObjects.Container{ 
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
        super(config.scene);
		this.scene=config.scene;


        this.name = config.key;
        this.back=this.scene.add.image(0,0,config.key);
        this.add(this.back);

        // If there is text, add text
        if(config.text)
		{
			this.textConfig = {fontFamily:'Muli', color:'#ffffff', fontSize:'12px'};
			
			this.text1=this.scene.add.text(0,30,config.text, this.textConfig);
			
			this.text1.setOrigin(0.5,0.5);
			this.add(this.text1);
		}

        // If there is x and/or y place it at its x/y
        if(config.x){
			this.x=config.x;
		}
		if(config.y){
			this.y=config.y;
		}

		this.setSize(this.back.width, 60);
		this.scene.add.existing(this);



		if (config.event)
		{
			this.setInteractive ();
			this.on('pointerdown', this.pressed, this);
		
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
		
		if(this.name == "exitBtn"){
			console.log(this.name + ": go to login");
		} 
		else if (this.name == "themeBtn"){
			console.log(this.name + ": go to Choose Theme");
		}
		else if (this.name == "saveBtn"){
			console.log(this.name + ": save all objects on screen");
		}
		else if (this.name == "profileBtn"){
			console.log(this.name + ": go to Profile");
		}
		else if (this.name == "bagBtn"){
			console.log(this.name + ": go to bag");
		}
		else if (this.name == "listBtn"){
			console.log(this.name + ": go to shopping list");
		}
		else if (this.name == "creditBtn"){
			console.log(this.name + ": shows credits (?)");
		}

	}


}