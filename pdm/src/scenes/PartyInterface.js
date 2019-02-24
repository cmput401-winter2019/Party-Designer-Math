import { CST } from "../CST";
import { ButtonAtMenu } from "../components/buttonAtMenu";
import { Guest } from "../classes/guests";


export class PartyInterface extends Phaser.Scene {

    constructor() {
        super({
            key: CST.SCENES.PARTY_INTERFACE
        });
    }

    init() {
    }

    preload() {
        //this.load.image(CST.IMAGES.TEST_CHARACTER, CST.IMAGES.TEST_CHARACTER);

        // Interface
        this.load.image("background", "assets/Interface/background.png");
        this.load.image("exitBtn", "assets/Interface/ExitGame.svg");
        this.load.image("saveBtn", "assets/Interface/Save.svg");
        this.load.image("themeBtn", "assets/Interface/Themes.svg");
        this.load.image("profileBtn", "assets/Interface/Profile.svg");
        this.load.image("bagBtn", "assets/Interface/Bag.svg");
        this.load.image("listBtn", "assets/Interface/List.svg");
        this.load.image("creditBtn", "assets/Interface/Credit.svg");

        // Guests
        this.load.image("char1", "assets/Spaceroom/Characters/character_1.svg");
        this.load.image("char2", "assets/Spaceroom/Characters/character_2.svg");
        this.load.image("char3", "assets/Spaceroom/Characters/character_3.svg");

        // Character Btns
        this.load.image("rotateBtn", "assets/Interface/RotateBtn.svg");
        this.load.image("rightBtn", "assets/Interface/Right.svg");
        this.load.image("scaleBtn", "assets/Interface/ScaleBtn.svg");
    }

    create() {
        //this.add.image(400, 300, CST.IMAGES.TEST_CHARACTER);

        // background
        this.background = this.add.image(0,76,"background");
        this.background.setOrigin(0,0);
        this.background.displayWidth=this.game.config.width;
        this.background.scaleY=this.background.scaleX;
        console.log(this.background.displayHeight);


        // ------- Top menu buttons & Credit ------- 
        var credit = 2000.00;
        this.exitBtn = new ButtonAtMenu({scene:this, key:"exitBtn", text:"Exit Game", x: (this.game.config.width*0.05), y:30, event: 'button_pressed', params:'self_destruct'});
        this.themeBtn = new ButtonAtMenu({scene:this, key:"themeBtn", text:"Themes", x: (this.game.config.width*0.12), y:30, event: 'button_pressed', params:'self_destruct'});
        this.saveBtn = new ButtonAtMenu({scene:this, key:"saveBtn", text:"Save", x: (this.game.config.width*0.19), y:30, event: 'button_pressed', params:'self_destruct'});
        this.profileBtn = new ButtonAtMenu({scene:this, key:"profileBtn", text:"Profile", x: (this.game.config.width*0.26), y:30, event: 'button_pressed', params:'self_destruct'});
        this.bagBtn = new ButtonAtMenu({scene:this, key:"bagBtn", text:"Bag", x: (this.game.config.width*(1-0.26)), y:30, event: 'button_pressed', params:'self_destruct'});
        this.listBtn = new ButtonAtMenu({scene:this, key:"listBtn", text:"List", x: (this.game.config.width*(1-0.19)), y:30, event: 'button_pressed', params:'self_destruct'});
        this.creditBtn = new ButtonAtMenu({scene:this, key:"creditBtn", text:"Credits", x: (this.game.config.width*(1-0.12)), y:30, event: 'button_pressed', params:'self_destruct'});
        this.textConfig = {fontFamily:'Muli', color:'#ffffff', fontSize:'24px'};
		this.text1=this.add.text((this.game.config.width*(1-0.10)),16,credit, this.textConfig);
        // ------- ------- ------- ------- ------- 

        // ------- guests -------
        this.guest1 = this.add.existing(new Guest(this, "char1", 100,200,"Sammy"));
        this.guest2 = this.add.existing(new Guest(this, "char2", 200,200,"Tom"));

        

        // this.image1 = this.add.image(400,300,"char1");
        // this.image2 = this.add.image(400,400,"char2");
    }

}