import {CST} from "../CST";
import {interfaceBtns, beach_guestImages, spaceroom_guestImages, playground_guestImages, spaceFurnitures, playFurnitures, beachFurnitures,
spaceFood, playFood, beachFood, spaceDeco, playDeco, beachDeco, spaceKiddie, playKiddie, beachKiddie,
 } from '../Components/assets';

export class PreloaderScene extends Phaser.Scene{
  constructor(){ super({key: CST.SCENES.PRELOADER}); }

  init(data){
    this.gamestate = data;
    this.imageChoice = data.theme;
    this.readyCount = 0;
  }

  preload(){

    console.log(this.gamestate);
    console.log(this.imageChoice);

    this.theme_loaded   = localStorage.getItem("theme_loaded");
    this.one_loaded     = localStorage.getItem("one_loaded");
    this.two_loaded     = localStorage.getItem("two_loaded");
    this.three_loaded   = localStorage.getItem("three_loaded");

    if(this.imageChoice == "theme1"){
      this.path       = "assets/images/Spaceroom/";
      this.furnitures = spaceFurnitures;
      this.food       = spaceFood;
      this.deco       = spaceDeco;
      this.kiddie     = spaceKiddie;
      this.guestImages= spaceroom_guestImages;

      this.firstColor = 0x0e4361;
      this.secondColor = 0x53d7d3;
      if(this.one_loaded == "true"){
        var username = localStorage.getItem("username");
        this.get_current_student(username);
      }else{
        localStorage.setItem("one_loaded", true);
      }
    } else if (this.imageChoice == "theme2"){
      this.path       = "assets/images/Playground/";
      this.furnitures = playFurnitures;
      this.food       = playFood;
      this.deco       = playDeco;
      this.kiddie     = playKiddie;
      this.guestImages= playground_guestImages;

      this.firstColor = 0x026633;
      this.secondColor = 0xaebc4a;
      if(this.two_loaded == "true"){
        var username = localStorage.getItem("username");
        this.get_current_student(username);
      }else{
        localStorage.setItem("two_loaded", true);
      }
    } else if (this.imageChoice == "theme3"){
      this.path       = "assets/images/Beach/";
      this.furnitures = beachFurnitures;
      this.food       = beachFood;
      this.deco       = beachDeco;
      this.kiddie     = beachKiddie;
      this.guestImages= beach_guestImages;

      this.firstColor = 0xb7873e;
      this.secondColor = 0xf7ce7a;
      if(this.three_loaded == "true"){
        var username = localStorage.getItem("username");
        this.get_current_student(username);
      }else{
        localStorage.setItem("three_loaded", true);
      }
    }


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

    });

    this.load.on("fileprogress", function(file){

    });

    this.load.on("complete", function(){
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
            var config = {firstColor:this.firstColor, secondColor:this.secondColor, theme:this.imageChoice, furnitures:this.furnitures, food:this.food, deco:this.deco, kiddie:this.kiddie, guests:this.guestImages, gamestate:this.gamestate};
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

    // Guests
    for(var i=0; i<this.guestImages.length; i++){
       this.load.image(this.guestImages[i], this.path+"Characters/"+this.guestImages[i]+".svg");
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

    //Background
    this.load.image(this.imageChoice, "assets/images/Interface/" + this.imageChoice + ".svg");
  }
}
