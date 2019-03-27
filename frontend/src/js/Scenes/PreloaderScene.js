import {CST} from "../CST";

export class PreloaderScene extends Phaser.Scene{
  constructor(){ super({key: CST.SCENES.PRELOADER}); }

  init(){ this.readyCount = 0; }

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
            this.scene.start(CST.SCENES.GAME);
          });
        }
      )
  }

  load_assets(){
    this.load.image("background", "assets/images/Interface/background.png");
    this.load.image("exitBtn",    "assets/images/Interface/ExitGame.svg");
    this.load.image("saveBtn",    "assets/images/Interface/Save.svg");
    this.load.image("themeBtn",   "assets/images/Interface/Themes.svg");
    this.load.image("profileBtn", "assets/images/Interface/Profile.svg");
    this.load.image("bagBtn",     "assets/images/Interface/Bag.svg");
    this.load.image("listBtn",    "assets/images/Interface/List.svg");
    this.load.image("creditBtn",  "assets/images/interface/Credit.svg");
    this.load.image("cross",      "assets/images/interface/Cross.svg")

    // Guests
    this.load.image("char1",      "assets/images/Spaceroom/Characters/character_1.svg");
    this.load.image("char2",      "assets/images/Spaceroom/Characters/character_2.svg");
    this.load.image("char3",      "assets/images/Spaceroom/Characters/character_3.svg");
    this.load.image("char4",      "assets/images/Spaceroom/Characters/character_4.svg");
    this.load.image("char5",      "assets/images/Spaceroom/Characters/character_5.svg");
    this.load.image("char6",      "assets/images/Spaceroom/Characters/character_6.svg");

    // Furniture
    this.load.image("chair",        "assets/images/Spaceroom/Furniture/Chair.svg");
    this.load.image("dinnerTable",  "assets/images/Spaceroom/Furniture/DinnerTable.svg");
    this.load.image("floor",        "assets/images/Spaceroom/Furniture/Floor.svg");
    this.load.image("musicPlayer",  "assets/images/Spaceroom/Furniture/MusicPlayer.svg");
    this.load.image("rug",          "assets/images/Spaceroom/Furniture/Rug.svg");
    this.load.image("screen",       "assets/images/Spaceroom/Furniture/Screen.svg");
    this.load.image("shelf",        "assets/images/Spaceroom/Furniture/Shelf.svg");
    this.load.image("sofa",         "assets/images/Spaceroom/Furniture/Sofa.svg");
    this.load.image("table",        "assets/images/Spaceroom/Furniture/Table.svg");
    this.load.image("wallShelf",    "assets/images/Spaceroom/Furniture/WallShelf.svg");

    // Food
    this.load.image("burger_mult",  "assets/images/Spaceroom/Food/Burger_mult.svg");
    this.load.image("burger",       "assets/images/Spaceroom/Food/Burger.svg");
    this.load.image("cake",         "assets/images/Spaceroom/Food/Cake.svg");
    this.load.image("cherries",     "assets/images/Spaceroom/Food/Cherries.svg");
    this.load.image("chips",        "assets/images/Spaceroom/Food/Chips.svg");
    this.load.image("juice",        "assets/images/Spaceroom/Food/Juice.svg");
    this.load.image("ketchup",      "assets/images/Spaceroom/Food/Ketchup.svg");
    this.load.image("milkshake",    "assets/images/Spaceroom/Food/Milkshake.svg");
    this.load.image("pizza",        "assets/images/Spaceroom/Food/Pizza.svg");
    this.load.image("saladBowl",    "assets/images/Spaceroom/Food/SaladBowl.svg");
    this.load.image("spaceWater",   "assets/images/Spaceroom/Food/SpaceWater.svg");

    // Decoration
    this.load.image("ballons",      "assets/images/Spaceroom/Decoration/Balloons.svg");
    this.load.image("bunting",      "assets/images/Spaceroom/Decoration/Bunting.svg");
    this.load.image("hangingDeco",  "assets/images/Spaceroom/Decoration/HangingDeco.svg");
    this.load.image("light",        "assets/images/Spaceroom/Decoration/Light.svg");
    this.load.image("partyHat",     "assets/images/Spaceroom/Decoration/PartyHat.svg");
    this.load.image("plantPot",     "assets/images/Spaceroom/Decoration/PlantPot.svg");
    this.load.image("sculpture",    "assets/images/Spaceroom/Decoration/Sculpture.svg");
    this.load.image("spacePlants",  "assets/images/Spaceroom/Decoration/SpacePlants.svg");
    this.load.image("starBanner",   "assets/images/Spaceroom/Decoration/StarBanner.svg");
    this.load.image("wallHanging",  "assets/images/Spaceroom/Decoration/WallHanging.svg");

    // Kiddie Bag
    this.load.image("alienShip",    "assets/images/Spaceroom/KiddieBag/Alienship.svg");
    this.load.image("ball",         "assets/images/Spaceroom/KiddieBag/Ball.svg");
    this.load.image("earthBall",    "assets/images/Spaceroom/KiddieBag/EarthBall.svg");
    this.load.image("gift",         "assets/images/Spaceroom/KiddieBag/Gift.svg");
    this.load.image("icecream",     "assets/images/Spaceroom/KiddieBag/Icecream.svg");
    this.load.image("rocket",       "assets/images/Spaceroom/KiddieBag/Rocket.svg");
    this.load.image("rocket_2",     "assets/images/Spaceroom/KiddieBag/Rocket_2.svg");
    this.load.image("spaceTeddy",   "assets/images/Spaceroom/KiddieBag/SpaceTeddy.svg");
    this.load.image("sticker",      "assets/images/Spaceroom/KiddieBag/Sticker.svg");
    this.load.image("telescope",    "assets/images/Spaceroom/KiddieBag/Telescope.svg");

    // Character Btns
    this.load.image("rotateBtn",    "assets/images/Interface/RotateBtn.svg");
    this.load.image("rightBtn",     "assets/images/Interface/Right.svg");
    this.load.image("scaleBtn",     "assets/images/Interface/ScaleBtn.svg");
    this.load.image("smallerBtn",   "assets/images/Interface/ScaleSmaller.svg");
    this.load.image("forwardBtn",     "assets/images/Interface/Forward.svg");
    this.load.image("backwardBtn",     "assets/images/Interface/Backward.svg");

    // Other
    this.load.image("add", "assets/images/Interface/Add.svg");
  }
}
