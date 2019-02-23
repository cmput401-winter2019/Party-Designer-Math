import { ButtonAtMenu } from "./buttonAtMenu";
export class TopMenu{ 
    constructor(config){
		//super(config.scene);
        this.scene = config.scene;

        //this.exitBtn = new ButtonAtMenu({scene:this, key:'exitBtn', text:"Exit Button!", x: 300, y:30, event: 'button_pressed', params:'self_destruct'});
        this.exitBtn = this.scene.add.image(30,30,"exitBtn");
        this.themeBtn = this.scene.add.image(60,30,"themeBtn");
        this.profileBtn = this.scene.add.image(90,30,"profileBtn");
        this.bagBtn = this.scene.add.image(120,30,"bagBtn");
        this.listBtn = this.scene.add.image(150,30, "listBtn");
        this.creditBtn = this.scene.add.image(180,30,"creditBtn");
    }
}
