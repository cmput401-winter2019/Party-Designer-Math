export class StartPartyBtn extends Phaser.GameObjects.Container{
    // Need scene
	constructor(config)
	{
        super(config.scene);
		this.scene=config.scene;

        var width = 150;
        var height = 50;
        // button outline
        this.backOutline = this.scene.add.graphics();
        this.backOutline.lineStyle(3, 0xffffff);
        this.backOutline.strokeRoundedRect(0, 0, width, height, 10);
		this.add(this.backOutline);

        // text
        this.textConfig = { fontFamily  : "Muli",
                            color       : "#ffffff",
                            fontSize    : "15px"
                            };
        this.text = this.scene.add.text(width/2,
                                        height/2,
                                        "START THE PARTY",
                                        this.textConfig);

        this.text.setOrigin(0.5,0.5);
        this.add(this.text);

        // Set btn attributes
        this.setSize(this.width,
                     this.height);
        this.backOutline.setInteractive();
        this.x = this.scene.game.config.width/2;
        this.y = this.scene.game.config.height/2;

        // Add btn to scene
        this.scene.add.existing(this);
    }
}