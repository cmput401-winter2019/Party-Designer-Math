import { ItemToRoomPopup } from "./itemToRoomPopup";

export class Button extends Phaser.GameObjects.Container{ 
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
		this.params = config.params;
		this.params2 = config.params2;

        //this.back=this.scene.add.image(0,0,config.key);
		this.back = this.scene.add.rectangle(0, 0, 100, 20, 0xffffff);
		this.back.setStrokeStyle(1.5, 0xB2B3B4).setOrigin(0.5,0.5);
		this.add(this.back);
		
        // If there is text, add text
        if(config.text)
		{
			this.text = config.text;
			this.textConfig = {fontFamily:'Muli', color:'#000000', fontSize:'12px'};
			
			this.text1=this.scene.add.text(0,0,config.text, this.textConfig);
			
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
		if (this.text == "Move to Room"){
			//console.log(this.params2);
			if (this.scene.popupOpen == false){
				this.scene.popup = new ItemToRoomPopup(this.scene, this.params, this.params2);
				this.scene.popupOpen = true;
			} else {
				this.scene.popup.destroyContainer();
				this.scene.popupOpen = true;
				this.scene.popup = new ItemToRoomPopup(this.scene, this.params, this.params2);
				//this.scene.add.text(this.scene.game.config.width/2,this.scene.game.config.height/2, "!", {fontFamily:'Muli', color:'#ff0000', fontSize:'24px'})
			}
		}
	}
}