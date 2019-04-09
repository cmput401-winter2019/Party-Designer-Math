import {CST} from "../CST.js";

async function put(endpoint, body) {
	const headers = {
	  "Content-Type": "application/json",
	  "Authorization": "Bearer " + localStorage.getItem("access_token")
	};

	const request = {
	  method: "PUT",
	  mode: "cors",
	  headers: headers,
	  body: JSON.stringify(body)
	};

	const response = await fetch(endpoint, request);

	return response;
  }

async function updateTheme(scene, theme) {
	//Set the scene context
	const currentscene = scene;
	const currenttheme = theme;

	const body = {
		updateType: "theme",
		updateValue: currenttheme
	};

	const response = await put("https://cors-anywhere.herokuapp.com/http://162.246.157.181/gamestate/update", body);
	const data = await response.json();
	if (!response.ok) {
		console.log("Something went wrong")
	}
	else {
		console.log(data);
		currentscene.start(CST.SCENES.PARTY_INVITATION, data);
	}
}

export class ThemeButton extends Phaser.GameObjects.Container{
	constructor(config){
		if(!config.scene){ console.log("missing scene!"); return; }
		if (!config.key){  console.log("missing key"); 		return; }
		super(config.scene);

		this.scene 			= config.scene;
		this.image 			= config.key;
		this.gamestate 	= config.gamestate

    //this.back is the background image
		this.back = this.scene.add.image(0,0,this.image);
    this.back.displayWidth = this.scene.game.config.width*0.20;
    this.back.scaleY=this.back.scaleX;
		this.add(this.back);

    // If there is text, add text
    if(config.text){
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

		if (config.event){
			this.setInteractive ();
			this.on('pointerdown', this.pressed, this)
			this.on('pointerover', this.over, this);
			this.on('pointerout', this.out, this);
		}

  }
  pressed(){ updateTheme(this.scene.scene, this.image); }

	over(){ this.y+=5; }
	out(){  this.y-=5; }
}
