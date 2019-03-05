import { CST } from "../CST";
import { Item } from "../classes/Item"

export class ButtonAtMenu extends Phaser.GameObjects.Container {
  constructor(config) {

    if(!config.scene || !config.key) {
      console.log("Missing Scene or Key");
      return;
    }

    super(config.scene);

    this.scene  = config.scene;
    this.name   = config.key;
    this.back   = this.scene.add.image(0,0,this.name);
    this.add(this.back);

    if(config.text) {
      this.text = config.text;
      this.add_text();
    }

    if(config.x) {
      this.x = config.x;
    }
    if(config.y) {
      this.y = config.y;
    }

    this.setSize(this.back.width, 60);
    this.scene.add.existing(this);
    this.firstgeneration = true;
    this.numbers = [];


    if(config.event) {
      this.setInteractive();
      this.on("pointerdown", this.pressed, this);
    }
  }

  over() {
    this.y-=5;
  }
  out() {
    this.y+=5;
  }

  pressed() {
    if(this.name == "exitBtn"){
			console.log(this.name + ": go to login");
		}
		else if (this.name == "themeBtn"){
			console.log(this.name + ": go to Choose Theme");
		}
		else if (this.name == "saveBtn"){
			console.log(this.name + ": save all objects on screen");
		}
		else if (this.name == "profileBtn"){
			console.log(this.name + ": go to Profile");
		}
		else if (this.name == "bagBtn"){
      this.bag = new Item(this.scene, this.name);
			console.log(this.name + ": go to bag");
		}

		else if (this.name == "listBtn"){
      if (this.firstgeneration){
				for(var number =0; number < 3; number ++){

					this.numbers[number] = Phaser.Math.Between(1,9);

				}
				this.scene.scene.launch(CST.SCENES.SHOPPING_LIST,this.numbers);
				this.firstgeneration = false;
			}
			else {
				this.scene.scene.bringToTop(CST.SCENES.SHOPPING_LIST,this.numbers);
				this.scene.scene.setVisible(1, CST.SCENES.SHOPPING_LIST);
				this.scene.scene.wake(CST.SCENES.SHOPPING_LIST);
			}
			console.log(this.name + ": go to shopping list");
		}
		else if (this.name == "creditBtn"){
			console.log(this.name + ": shows credits (?)");
		}
  }

  add_text() {
    this.textConfig = { fontFaily : "Muli",
                        color     : "#ffffff",
                        fontSize  : "12px" };

    this.text1 = this.scene.add.text(0, 30, this.text, this.textConfig);
    this.text1.setOrigin(0.5, 0.5);
    this.add(this.text1);
  }
}
