import {CST} from "../CST.js";

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
		this.player = config.player;
		this.add(this.back);

			// If there is text, add text
			if(config.text)
			{
				this.text = config.text;
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
		this.firstgeneration = true;
		this.numbers = [];

		this.setInteractive ();
		if (config.event)
		{
			this.on('pointerdown', this.pressed, this);
		}
		if (this.name=="sendButton"){
			this.on('pointerover', this.over, this);
			this.on('pointerout', this.out, this);
		}
  }
  over()
	{
		this.y+=5;
	}
	out()
	{
		this.y-=5;
	}


	pressed()
	{
		if(this.name == "ExitGame"){
			const body = {
				access_token: localStorage.getItem("access_token"),
				refresh_token: localStorage.getItem("refresh_token")
			};
			return fetch("http://162.246.157.181/logout", {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				body: JSON.stringify(body),
				headers: {
				  "Content-Type": "application/json",
				  "Authorization": "Bearer " + localStorage.getItem("access_token"),
				}
			  })
			  .then(
				function(response) {
				  // Examine the text in the response
				  response.json().then(function(data) {
					if (response.status !== 200) {
						alert(response.status + " Error"+ " : " + data["message"]);
						return;
					}
					alert(response.status + " Success"+ " : " + data["message"]);
					let url = window.location.href.split("/");
					url = url[0] + "//" + url[2];
					window.location = url + "/Party-Designer-Math/frontend/templates/login.html";
				  });
				}
			  )
		}
		// else if (this.name == "themeBtn"){
		// 	console.log(this.name + ": go to Choose Theme");
		// }
		// else if (this.name == "saveBtn"){
		// 	console.log(this.name + ": save all objects on screen");
		// }
// 		else if (this.name == "Profile"){
// 			console.log(this.name + ": go to Profile");
// 		}
		else if (this.name == "Help"){
 			console.log(this.name + ": go to Tutorial");
			this.scene.scene.launch(CST.SCENES.TUTORIAL);
 		}
		
		else if (this.name == "Bag"){
			console.log(this.name + ": go to bag");
			//this.config = {player:this.scene.player, originalS:this.scene}
			this.scene.scene.launch(CST.SCENES.BAG_POPUP, {player:this.scene.player, originalS:this.scene});
		}
		else if (this.name == "List"){
			this.config = {n:this.scene.player.numbersInShopList, assets:this.scene.player.itemsInShopList, player:this.player}
			this.scene.scene.launch(CST.SCENES.SHOPPING_LIST,this.config);
			console.log(this.name + ": go to shopping list");
		}
		else if (this.name == "Credit"){
			console.log(this.name + ": shows credits (?)");
		}
	}
}
