import {CST} from "../CST";
export class RoundBtn extends Phaser.GameObjects.Container{
    // Need scene
	constructor(scene, x, y, text, width, height)
	{
        super(scene);
		this.scene=scene; 
        // Square rect
        this.rect = this.scene.add.rectangle(0,
                                            0,
                                            width-10,
                                            height-10,
                                            0xffffff);
        this.rect.setOrigin(0.5,0.5);
        this.add(this.rect);

        // Round rect
        this.back = this.scene.add.graphics();
        this.back.fillStyle(0xffffff,1);
        this.back.fillRoundedRect(0-width/2, 0-height/2, width, height, 10);
        this.add(this.back);

        

        // text
        this.textConfig = { fontFamily  : "Muli",
                            color       : "#000000",
                            fontSize    : "15px",
                            };
        this.text = this.scene.add.text(0,
                                        0,
                                        text,
                                        this.textConfig).setOrigin(0.5,0.5);

        this.x = x;
        this.y = y;
        this.add(this.text);

        this.rect.setInteractive();
        
        // Add btn to scene
        this.scene.add.existing(this);
    }
}