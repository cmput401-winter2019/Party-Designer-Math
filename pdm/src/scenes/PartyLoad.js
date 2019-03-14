import { CST }            from "../CST";

export class PartyLoad extends Phaser.Scene {

    constructor() {
        super(CST.SCENES.PARTY_LOAD);
    }
    preload()
    {
        this.progText=this.add.text(this.game.config.width/2, this.game.config.height/2, "0%", {color:'#ffffff', fontSize:this.game.config.width/20});
    	this.progText.setOrigin(0.5,0.5);

        this.load.on('progress', this.onProgress, this);
         // Interface
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
        this.load.image("char1",      "assets/images/Characters/character_1.svg");
        this.load.image("char2",      "assets/images/Characters/character_2.svg");
        this.load.image("char3",      "assets/images/Characters/character_3.svg");
        this.load.image("char4",      "assets/images/Characters/character_4.svg");
        this.load.image("char5",      "assets/images/Characters/character_5.svg");
        this.load.image("char6",      "assets/images/Characters/character_6.svg");

        // Furniture
        this.load.image("chair",        "assets/images/Furniture/Chair.svg");
        this.load.image("dinnerTable",  "assets/images/Furniture/DinnerTable.svg");
        this.load.image("floor",        "assets/images/Furniture/Floor.svg");
        this.load.image("musicPlayer",  "assets/images/Furniture/MusicPlayer.svg");
        this.load.image("rug",          "assets/images/Furniture/Rug.svg");
        this.load.image("screen",       "assets/images/Furniture/Screen.svg");
        this.load.image("shelf",        "assets/images/Furniture/Shelf.svg");
        this.load.image("sofa",         "assets/images/Furniture/Sofa.svg");
        this.load.image("table",        "assets/images/Furniture/Table.svg");
        this.load.image("wallShelf",    "assets/images/Furniture/WallShelf.svg");

        // Food
        this.load.image("burger_mult",  "assets/images/Food/Burger_mult.svg");
        this.load.image("burger",       "assets/images/Food/Burger.svg");
        this.load.image("cake",         "assets/images/Food/Cake.svg");
        this.load.image("cherries",     "assets/images/Food/Cherries.svg");
        this.load.image("chips",        "assets/images/Food/Chips.svg");
        this.load.image("juice",        "assets/images/Food/Juice.svg");
        this.load.image("ketchup",      "assets/images/Food/Ketchup.svg");
        this.load.image("milkshake",    "assets/images/Food/Milkshake.svg");
        this.load.image("pizza",        "assets/images/Food/Pizza.svg");
        this.load.image("saladBowl",    "assets/images/Food/SaladBowl.svg");
        this.load.image("spaceWater",   "assets/images/Food/SpaceWater.svg");

        // Decoration
        this.load.image("ballons",      "assets/images/Decoration/Balloons.svg");
        this.load.image("bunting",      "assets/images/Decoration/Bunting.svg");
        this.load.image("hangingDeco",  "assets/images/Decoration/HangingDeco.svg");
        this.load.image("light",        "assets/images/Decoration/Light.svg");
        this.load.image("partyHat",     "assets/images/Decoration/PartyHat.svg");
        this.load.image("plantPot",     "assets/images/Decoration/PlantPot.svg");
        this.load.image("sculpture",    "assets/images/Decoration/Sculpture.svg");
        this.load.image("spacePlants",  "assets/images/Decoration/SpacePlants.svg");
        this.load.image("starBanner",   "assets/images/Decoration/StarBanner.svg");
        this.load.image("wallHanging",  "assets/images/Decoration/WallHanging.svg");

        // Kiddie Bag
        this.load.image("alienShip",    "assets/images/KiddieBag/Alienship.svg");
        this.load.image("ball",         "assets/images/KiddieBag/Ball.svg");
        this.load.image("earthBall",    "assets/images/KiddieBag/EarthBall.svg");
        this.load.image("gift",         "assets/images/KiddieBag/Gift.svg");
        this.load.image("icecream",     "assets/images/KiddieBag/Icecream.svg");
        this.load.image("rocket",       "assets/images/KiddieBag/Rocket.svg");
        this.load.image("rocket_2",     "assets/images/KiddieBag/Rocket_2.svg");
        this.load.image("spaceTeddy",   "assets/images/KiddieBag/SpaceTeddy.svg");
        this.load.image("sticker",      "assets/images/KiddieBag/Sticker.svg");
        this.load.image("telescope",    "assets/images/KiddieBag/Telescope.svg");

        // Character Btns
        this.load.image("rotateBtn",    "assets/images/Interface/RotateBtn.svg");
        this.load.image("rightBtn",     "assets/images/Interface/Right.svg");
        this.load.image("scaleBtn",     "assets/images/Interface/ScaleBtn.svg");
        this.load.image("smallerBtn",   "assets/images/Interface/ScaleSmaller.svg")

        // Other
        this.load.image("add", "assets/images/Interface/Add.svg");
    }
    onProgress(value)
    {
    	console.log(value);
    	var per=Math.floor(value*100);
    	this.progText.setText(per+"%");
    }
    create(){
    	this.scene.start(CST.SCENES.PARTY_INTERFACE);
        
    }

}
