export class StartPartyBtn extends Phaser.GameObjects.Container{
    // Need scene
	constructor(scene, x, y)
	{
        super(scene);
		this.scene=scene;

        var width = 150;
        var height = 50;

        // White background
        this.back = this.scene.add.graphics();
        this.back.fillStyle(0xffffff,1);
        this.back.fillRoundedRect(x, y, width, height, 10);
        this.add(this.back);

        // text
        this.textConfig = { fontFamily  : "Muli",
                            color       : "#000000",
                            fontSize    : "15px",
                            };
        this.text = this.scene.add.text(x+10,
                                        y+15,
                                        "START THE PARTY",
                                        this.textConfig);
        
        this.text.setInteractive();

        this.text.on("pointerdown", ()=>{ 
            console.log("hi");
        });
        this.add(this.text);

        // Add btn to scene
        this.scene.add.existing(this);
    }
}