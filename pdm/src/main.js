var game;
import {PartyInterface} from "./scenes/PartyInterface" 
import { ShoppingInterface } from "./scenes/ShoppingInterface";

window.onload=function(){
    var isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }
    if (isMobile ==-1){
        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-game',
            scene: [PartyInterface,ShoppingInterface]
        };
    } else {
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            scene: [PartyInterface,ShoppingInterface]
        };
    }
    game = new Phaser.Game(config);
}
