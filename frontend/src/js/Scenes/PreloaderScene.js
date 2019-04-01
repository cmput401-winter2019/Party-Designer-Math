import {CST} from "../CST";
import {interfaceBtns, guestImages,  spaceFurnitures, playFurnitures, beachFurnitures,
spaceFood, playFood, beachFood, spaceDeco, playDeco, beachDeco, spaceKiddie, playKiddie, beachKiddie,
 } from '../Components/assets';

export class PreloaderScene extends Phaser.Scene{
  constructor(){ super({key: CST.SCENES.PRELOADER}); }

  init(data){ 
    this.firstColor = data.firstColor;
    this.secondColor = data.secondColor;
    this.imageChoice = data.imageChoice;
    this.readyCount = 0; 
  }

  preload(){
    this.add.image(400, 200, "zenva_logo");

    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width   = this.cameras.main.width;
    var height  = this.cameras.main.height;

    var loadingText = this.make.text({  x     : width  / 2,
                                        y     : height / 2 - 50,
                                        text  : "Loading...",
                                        style : { font : "20px monospace",
                                                  file : "#ffffff" }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({  x     : width  / 2,
                                        y     : height / 2 -5,
                                        text  : "0%",
                                        style : { font : "18px monospace",
                                                  fill : "#ffffff"}
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({    x     : width  / 2,
                                        y     : height / 2 + 50,
                                        text  : "",
                                        style : { font : "18px monospace",
                                                  fill : "#ffffff" }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function(value){
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 300);
    });

    this.load.on("fileprogress", function(file){
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", function(){
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(500, this.ready, [], this);

    this.load_assets();

  }

  ready(){
    this.readyCount++;
    if(this.readyCount == 2){
      var username = localStorage.getItem("username");
      this.get_current_student(username);
     }
  }

  get_current_student(username){
    var url = "http://127.0.0.1:5001/student/" + username;
    return fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(
        response => {
          response.json().then(data => {
            localStorage.setItem("id", data.id);
            var config = {firstColor:this.firstColor, secondColor:this.secondColor, theme:this.imageChoice, furnitures:this.furnitures, food:this.food, deco:this.deco, kiddie:this.kiddie};
            this.scene.start(CST.SCENES.GAME, config);
          });
        }
      )
  }

  load_assets(){
    this.load.image("background", "assets/images/Interface/background1.png");

    // Interface Button Icons
    for(var i=0; i<interfaceBtns.length; i++){
      this.load.image(interfaceBtns[i],    "assets/images/Interface/"+interfaceBtns[i]+".svg");
    }

    // Path
    if(this.imageChoice == "theme1"){
      this.path = "assets/images/Spaceroom/";
      this.furnitures = spaceFurnitures;
      this.food = spaceFood;
      this.deco = spaceDeco;
      this.kiddie = spaceKiddie;
    } else if (this.imageChoice == "theme2"){
      this.path = "assets/images/Playground/";
      this.furnitures = playFurnitures;
      this.food = playFood;
      this.deco = playDeco;
      this.kiddie = playKiddie;
    } else if (this.imageChoice == "theme3"){
      this.path = "assets/images/Beach/";
      this.furnitures = beachFurnitures;
      this.food = beachFood;
      this.deco = beachDeco;
      this.kiddie = beachKiddie;
    }
    //console.log(this.furnitures, this.food, this.deco, this.kiddie);

    // Guests
    for(var i=0; i<guestImages.length; i++){
       this.load.image(guestImages[i], this.path+"Characters/"+guestImages[i]+".svg");
    }

    // Furniture
    for(var i=0; i<this.furnitures.length; i++){
      this.load.image(this.furnitures[i], this.path+"Furniture/"+this.furnitures[i]+".svg");
    }

    // Food
    for (var i=0; i<this.food.length; i++){
      this.load.image(this.food[i], this.path+"Food/"+this.food[i]+".svg");
    }

    // Decorations
    for (var i=0; i<this.deco.length; i++){
      this.load.image(this.deco[i], this.path+"Decoration/"+this.deco[i]+ ".svg");
    }

    // Kiddie Bag
    for (var i=0; i<this.kiddie.length; i++){
      this.load.image(this.kiddie[i], this.path+"KiddieBag/"+this.kiddie[i]+".svg");
    }

    // Other
    this.load.image("add", "assets/images/Interface/Add.svg");
  }
}
