import {CST} from "../CST";
export class ThemeButton extends Phaser.GameObjects.Container{ 
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

		this.scene = config.scene;
		this.image = config.key;
		
		this.gamestate = config.gamestate
		console.log("WE MADE IT HERE " + this.gamestate["money"]);

        //this.back is the background image
		this.back = this.scene.add.image(0,0,this.image);
        this.back.displayWidth = this.scene.game.config.width*0.20;
        this.back.scaleY=this.back.scaleX;
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

		this.setSize(this.back.displayWidth, this.back.displayHeight);
      
		this.scene.add.existing(this);

		if (config.event)
		{
			this.setInteractive ();
			this.on('pointerdown', this.pressed, this)
			this.on('pointerover', this.over, this);
			this.on('pointerout', this.out, this);
		}

    }
    pressed(){
        this.scene.scene.start(CST.SCENES.PARTY_INVITATION, {imageChoice:this.image, gamestate: this.gamestate});
    }
	over(){
		//this.alpha = 0.8;
		this.y+=5;
	}
	out(){
		//this.alpha = 1;
		this.y-=5;
	}

}