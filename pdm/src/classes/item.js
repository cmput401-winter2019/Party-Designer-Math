import {CST} from "../CST";

export class Item extends Phaser.GameObjects.Sprite {

  constructor(scene, name, boughtList) {
    super(scene);

    this.scene = scene;
    this.name = name;
    this.list = boughtList;

    if(this.name == "Furniture") {
      this.furniture_list = this.list;
      console.log(this.name + " " + this.furniture_list);
    }
    else if(this.name == "Decoration") {
      this.decoration_list = this.list;
      console.log(this.name + " " + this.decoration_list);
    }
    else if(this.name == "Snacks") {
      this.snacks_list = this.list;
      console.log(this.name + " " + this.snacks_list);
    }
    else if(this.name == "Kiddie Bag") {
      this.kiddieBag_list = this.list;
      console.log(this.name + " " + this.kiddieBag_list);
    }
    else if(this.name == "bagBtn"){
      console.log(this.furniture_list);
    }
  }
}
