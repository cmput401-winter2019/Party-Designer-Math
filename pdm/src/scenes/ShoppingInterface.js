import {CST} from "../CST";
export class ShoppingInterface extends Phaser.Scene{

        constructor(){


            super({
                key: CST.SCENES.SHOPPING_LIST
            })
        }

        //Checks if objectives are met.
        init( data){

        }
        preload(){
            this.load.image("exitBtn",    "assets/images/Interface/ExitGame.svg");
        }

        create(){
            
            

            var graphics = this.add.graphics();
            graphics.fillStyle(0xFFFFFF, 1.0);
            graphics.fillRect(200, 100, 400, 200);
            this.add.text(320, 270, 'Click to Return', { font: '16px Courier', fill: '0xFFFFF' });
            this.add.text(220, 120, 'Buy '+ Phaser.Math.Between(1,9) + ' Burgers' ,{ font: '16px Courier', fill: '0xFFFFF' });
            this.add.text(220, 150, 'Buy '+ Phaser.Math.Between(1,9) + ' Condoms', { font: '16px Courier', fill: '0xFFFFF' });
            this.add.text(220, 180, 'Buy '+ Phaser.Math.Between(1,9) + ' Chips', { font: '16px Courier', fill: '0xFFFFF' });
    
            this.input.once('pointerdown', function () {
    
                this.scene.start(CST.SCENES.PARTY_INTERFACE);
    
            }, this);
            

        }







}