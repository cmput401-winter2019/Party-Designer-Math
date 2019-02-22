import {PartyInterface} from "./scenes/PartyInterface"


var isMobile = navigator.userAgent.indexOf("Mobile");
if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
}
if (isMobile ==-1){
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [PartyInterface]
    };
} else {
    var config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        scene: [PartyInterface]
    };
}

var game = new Phaser.Game(config);