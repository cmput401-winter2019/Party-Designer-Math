import { Bar } from "./bar"

export class PartyLoad extends Phaser.Scene {

    constructor() {
        super('PartyLoad');
    }
    preload()
    {
        this.bar = new Bar({scene:this, x:200, y:300});
    }
    create(value)
    {
    }

}