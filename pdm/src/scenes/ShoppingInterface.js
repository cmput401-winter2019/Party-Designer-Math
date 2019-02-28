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
            var graphicsCheck = this.add.graphics();
            var graphicsborder= this.add.graphics();
            
            
            graphics.fillStyle(0xFFFFFF, 1.0);
            graphics.fillRect(200, 100, 400, 200);

            
            graphicsCheck.fillStyle(0x00000, 1.0);
            graphicsCheck.fillRect(220,118,20,20);
            graphicsborder.fillStyle(0xFFFFFF, 1.0);
            graphicsborder.fillRect(223,121,13,13);


            graphicsCheck.fillStyle(0x00000, 1.0);
            graphicsCheck.fillRect(220,148,20,20);
            graphicsborder.fillStyle(0xFFFFFF, 1.0);
            graphicsborder.fillRect(223,151,13,13);



            graphicsCheck.fillStyle(0x00000, 1.0);
            graphicsCheck.fillRect(220,178,20,20);
            graphicsborder.fillStyle(0xFFFFFF, 1.0);
            graphicsborder.fillRect(223,181,13,13);



            this.add.text(370, 270, 'Click to Return', { font: '16px Courier', fill: '0xFFFFF' });
            this.add.text(270, 120, 'Buy '+ Phaser.Math.Between(1,9) + ' Burgers' ,{ font: '16px Courier', fill: '0xFFFFF' });
            this.add.text(270, 150, 'Buy '+ Phaser.Math.Between(1,9) + ' Condoms', { font: '16px Courier', fill: '0xFFFFF' });
            this.add.text(270, 180, 'Buy '+ Phaser.Math.Between(1,9) + ' Chips', { font: '16px Courier', fill: '0xFFFFF' });
    
            this.input.once('pointerdown', function () {
    
                this.scene.start(CST.SCENES.PARTY_INTERFACE);
    
            }, this);
            

        }







}