
import { PartyInvitation } from "./scenes/PartyInvitation";
import { PartyLoad } from "./scenes/PartyLoad";
import { PartyInterface } from "./scenes/PartyInterface";
import { ShoppingInterface } from "./scenes/ShoppingInterface";
import { BuyPopup } from "./scenes/BuyPopup";
import { BagPopup } from "./scenes/BagPopup";

var game;

    var isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            scene: [PartyLoad,PartyInterface,ShoppingInterface,BuyPopup,BagPopup] // PartyInvitation to be added later
        };
game = new Phaser.Game(config);
