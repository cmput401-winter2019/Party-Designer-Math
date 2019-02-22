import { CST } from "../CST";
export class PartyInterface extends Phaser.Scene {

    constructor() {
        super({
            key: CST.SCENES.PARTY_INTERFACE
        })
    }

    preload() {

    }

    create() {
        this.scene.start(CST.SCENES.PARTY_INTERFACE);
    }


}