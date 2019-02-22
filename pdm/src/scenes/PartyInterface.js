import { CST } from "../CST";
//import { Bar } from "bar"
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
        this.load.image("exitGame", "assets/Interface/ExitGame.svg");
        this.load.image("exitGame", "assets/Interface/Themes.svg");
        this.load.image("exitGame", "assets/Interface/Profile.svg");
        this.load.image("exitGame", "assets/Interface/Bag.svg");
        this.load.image("exitGame", "assets/Interface/List.svg");
        this.load.image("exitGame", "assets/Interface/Profile.svg");

        this.load.image("char1", "assets/Spaceroom/Characters/character_1.svg");
        this.load.image("char2", "assets/Spaceroom/Characters/character_2.svg");
        this.load.image("char3", "assets/Spaceroom/Characters/character_3.svg");
    }

    create() {
        //this.add.image(400, 300, CST.IMAGES.TEST_CHARACTER);
        this.background = this.add.image(0,76,"background");
        this.background.setOrigin(0,0);
        this.background.displayWidth=this.game.config.width;
        this.background.scaleY=this.background.scaleX;

        this.image1 = this.add.image(400,300,"char1");
        this.image2 = this.add.image(400,400,"char2");
    }

}