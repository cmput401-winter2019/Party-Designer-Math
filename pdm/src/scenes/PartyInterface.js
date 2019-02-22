import { CST } from "../CST";
export class PartyInterface extends Phaser.Scene {

    constructor() {
        super({
            key: CST.SCENES.PARTY_INTERFACE
        });
    }

    init() {
    }

    preload() {
        this.load.image(CST.IMAGES.TEST_CHARACTER, CST.IMAGES.TEST_CHARACTER);
    }

    create() {
        this.add.image(400, 300, CST.IMAGES.TEST_CHARACTER);
    }

}