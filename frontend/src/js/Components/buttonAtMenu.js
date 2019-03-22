import {CST} from "../CST";

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
		if(this.name == "exitBtn"){
			const body = {
				access_token: localStorage.getItem("access_token"),
				refresh_token: localStorage.getItem("refresh_token")
			};
			return fetch("http://127.0.0.1:5001/logout", {
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
					window.location = url + "/login.html"
				  });
				}
			  )
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
			//this.config = {player:this.scene.player, originalS:this.scene}
			this.scene.scene.launch(CST.SCENES.BAG_POPUP, {player:this.scene.player, originalS:this.scene});
		}
		else if (this.name == "listBtn"){
			if (this.firstgeneration){					// Pass in 20 random numbers and random assests to shopping list scene
				this.config = {n:this.scene.player.numbersInShopList, assets:this.scene.player.itemsInShopList}
				this.scene.scene.launch(CST.SCENES.SHOPPING_LIST,this.config);
				this.firstgeneration = false;
			}
			else {
				this.scene.scene.wake(CST.SCENES.SHOPPING_LIST);
			}

			console.log(this.name + ": go to shopping list");
		}
		else if (this.name == "creditBtn"){
			console.log(this.name + ": shows credits (?)");
		}
	}
}
