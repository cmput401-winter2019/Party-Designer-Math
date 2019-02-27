import { BuyItem } from "./BuyItem";
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
        this.btnColor = config.btnColor;
        this.assets = config.assets;

        // Draw Rectangle
        this.rect = this.scene.add.rectangle(0, this.startHeight, this.btnWidth, this.btnHeight, this.btnColor); // x, y, width, height
        this.rect.setOrigin(0,0);
        this.rect.setStrokeStyle(0.75, 0xffffff);
        this.add(this.rect);
        
        // Add text
		this.textConfig = {fontFamily:'Muli', color:'#ffffff', fontSize:'20px'};
		this.text=this.scene.add.text(this.btnWidth*0.25,this.startHeight+(this.btnHeight/2), config.text, this.textConfig);
		this.text.setOrigin(0,0.5);
		this.add(this.text);

		// Button has mouse over effect on desktop computers
        this.setSize(this.btnWidth, this.btnHeight);
        this.rect.setInteractive();
        this.rect.on('pointerover', function(pointer){
            this.alpha = 0.7;
        }, this);
        this.rect.on('pointerout', function(pointer){
            this.alpha = 1;
        }, this);
        this.rect.on('pointerdown', this.activateBtn, this);

        this.scene.add.existing(this);
    
    }
    activateBtn(){
    
        if(this.text._text == 'Furniture'){
            console.log(this.text._text);
        }
        else if (this.text._text ==  "Decoration"){
            console.log(this.text._text);
        }
        else if (this.text._text ==  "Snacks"){
            var index;
            var height = 300
            var width = 550;
            var offset = 0;
            for (index = 0; index < this.assets.length; ++index) {
                let asset = this.scene.add.image(height+offset,width,this.assets[index]);
                asset.setInteractive();
                asset.on("pointerup", ()=> {
                    let buyItem = new BuyItem(this.scene, this.assets[index]);
                    buyItem.buyButton.setInteractive();
                    buyItem.buyButton.on("pointerup", ()=> {
                        buyItem.destroy();
                    });
                });
                offset += 100;
            }
        }
        else if (this.text._text == "Kiddie Bag"){
            console.log(this.text._text);
        }
    }



}