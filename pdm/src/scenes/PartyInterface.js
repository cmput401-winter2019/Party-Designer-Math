import { CST } from "../CST";
import { ButtonAtMenu } from "../components/buttonAtMenu";
import { BtnAtBottom } from "../components/btnAtBottom";
import { Guest } from "../classes/guests";
import { Item } from "../classes/item";

export class PartyInterface extends Phaser.Scene {

    constructor() {
        super({
            key: CST.SCENES.PARTY_INTERFACE
        });
    }

    init() {
    }

    preload() {
        //this.load.image(CST.IMAGES.TEST_CHARACTER, CST.IMAGES.TEST_CHARACTER);

        // Interface
        this.load.image("background", "assets/Interface/background.png");
        this.load.image("exitBtn", "assets/Interface/ExitGame.svg");
        this.load.image("saveBtn", "assets/Interface/Save.svg");
        this.load.image("themeBtn", "assets/Interface/Themes.svg");
        this.load.image("profileBtn", "assets/Interface/Profile.svg");
        this.load.image("bagBtn", "assets/Interface/Bag.svg");
        this.load.image("listBtn", "assets/Interface/List.svg");
        this.load.image("creditBtn", "assets/Interface/Credit.svg");

        // Guests
        this.load.image("char1", "assets/Spaceroom/Characters/character_1.svg");
        this.load.image("char2", "assets/Spaceroom/Characters/character_2.svg");
        this.load.image("char3", "assets/Spaceroom/Characters/character_3.svg");

        // Character Btns
        this.load.image("rotateBtn", "assets/Interface/RotateBtn.svg");
        this.load.image("rightBtn", "assets/Interface/Right.svg");
        this.load.image("scaleBtn", "assets/Interface/ScaleBtn.svg");

        // Furniture
        this.load.image("chair", "assets/Spaceroom/Furniture/Chair.svg");
        this.load.image("rug", "assets/Spaceroom/Furniture/Rug.svg");
        this.load.image("screen", "assets/Spaceroom/Furniture/Screen.svg");

        // Food
        const chips = this.load.image("chips", "assets/Spaceroom/Food/chips.svg");
        const burger = this.load.image("burger", "assets/Spaceroom/Food/burger.svg");

        //Other
        this.load.image("add", "assets/Interface/Add.svg");
    }

    create() {
        // ------ drag logic -----------------------------------------------------
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.wasDragging = true;
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        // ------ Check if drag is outside of background ------
        this.input.on('dragend', function (pointer, gameObject, dragX, dragY) {
            if (gameObject.y < (76+(gameObject.height/2))|| gameObject.y > this.scene.background.displayHeight || gameObject.x < 0 || gameObject.x > gameObject.scene.game.config.width){
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            } 
            else {
                //object is only created if starting position is outside of bound
                if (gameObject.input.dragStartY<(76+(gameObject.height/2))||gameObject.input.dragStartY>this.scene.background.displayHeight){ 
                    console.log('create object');
                    gameObject.inRoom = true;
                    gameObject.scene.createItem(gameObject.image, gameObject.input.dragStartX, gameObject.input.dragStartY, gameObject.name, gameObject.pluralName, gameObject.category, gameObject.unit);
                }
                
            }
            if (gameObject.category){
                console.log("item");
            } else {console.log('guest')};
        });
        // ------------------------------------------------------------------------

        // background
        this.background = this.add.image(0,76,"background");
        this.background.setOrigin(0,0);
        this.background.displayWidth=this.game.config.width;
        this.background.scaleY=this.background.scaleX;
        console.log("Inside party inter.: " +this.background.displayHeight);


        // ------- Top menu buttons & Credit ------- 
        var credit = 2000.00;
        this.exitBtn = new ButtonAtMenu({scene:this, key:"exitBtn", text:"Exit Game", x: (this.game.config.width*0.05), y:30, event: 'button_pressed', params:'self_destruct'});
        this.themeBtn = new ButtonAtMenu({scene:this, key:"themeBtn", text:"Themes", x: (this.game.config.width*0.12), y:30, event: 'button_pressed', params:'self_destruct'});
        this.saveBtn = new ButtonAtMenu({scene:this, key:"saveBtn", text:"Save", x: (this.game.config.width*0.19), y:30, event: 'button_pressed', params:'self_destruct'});
        this.profileBtn = new ButtonAtMenu({scene:this, key:"profileBtn", text:"Profile", x: (this.game.config.width*0.26), y:30, event: 'button_pressed', params:'self_destruct'});
        this.bagBtn = new ButtonAtMenu({scene:this, key:"bagBtn", text:"Bag", x: (this.game.config.width*(1-0.26)), y:30, event: 'button_pressed', params:'self_destruct'});
        this.listBtn = new ButtonAtMenu({scene:this, key:"listBtn", text:"List", x: (this.game.config.width*(1-0.19)), y:30, event: 'button_pressed', params:'self_destruct'});
        this.creditBtn = new ButtonAtMenu({scene:this, key:"creditBtn", text:"Credits", x: (this.game.config.width*(1-0.12)), y:30, event: 'button_pressed', params:'self_destruct'});
        this.textConfig = {fontFamily:'Muli', color:'#ffffff', fontSize:'24px'};
		this.text1=this.add.text((this.game.config.width*(1-0.10)),16,credit, this.textConfig);
        // ------- ------- ------- ------- ------- 

        // ------- guests -------
        this.guest1 = this.add.existing(new Guest(this, "char1", 100,200,"Sammy"));
        this.guest2 = this.add.existing(new Guest(this, "char2", 200,200,"Tom"));

       // ------- Bottom Menu Buttons --------
        
        var startHeight1 = this.background.displayHeight + 76;
        var menuHeight = (this.game.config.height - startHeight1);
        var btnHeight = menuHeight/4;
        var btnWidth = (this.game.config.width*0.2);
        var startHeight2 = startHeight1 + btnHeight;
        var startHeight3 = startHeight2 + btnHeight;
        var startHeight4 = startHeight3 + btnHeight;
        var btnColor = 0x0e4361;

        var assets = ["chips", "burger"]

        this.bottomBtn1 = new BtnAtBottom({scene:this, text:"Furniture", startHeight: startHeight1, btnHeight: btnHeight, btnWidth: btnWidth, btnColor:btnColor, assets: assets});
        this.bottomBtn2 = new BtnAtBottom({scene:this, text:"Decoration", startHeight: startHeight2, btnHeight: btnHeight, btnWidth: btnWidth, btnColor:btnColor, assets: assets});
        this.bottomBtn3 = new BtnAtBottom({scene:this, text:"Snacks", startHeight: startHeight3, btnHeight: btnHeight, btnWidth: btnWidth, btnColor:btnColor, assets: assets});
        this.bottomBtn4 = new BtnAtBottom({scene:this, text:"Kiddie Bag", startHeight: startHeight4, btnHeight: btnHeight, btnWidth: btnWidth, btnColor:btnColor, assets: assets});
        // -------------------------------------

        // ------- items ------
        var category1 = "Furniture";
        var category2 = "Decoration";
        var category3 = "Snacks";
        var category4 = "Kiddie Bag";
        var itemX = startHeight1 + menuHeight/2;
        this.item1 = this.add.existing(new Item(this, "chair", btnWidth*5, itemX,"chair", "chairs", category1, "set"));
    }


    createItem(image, x, y, name, pluralName, category, unit){
        this.newItem = this.add.existing(new Item(this, image, x, y,name, pluralName, category, unit));
    }

}