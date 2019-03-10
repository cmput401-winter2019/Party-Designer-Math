export class ImageToProperties {
    constructor(config) {
        this.config = config;
    }
    getProp(iName){ // name, pluralName, category , unit
        if(iName == "chair"){
            return {name:"chair", pluralName: "chairs", category:"furniture", unit:"N/A", cost:"5"};
        } else if(iName == "dinnerTable"){
            return {name:"dinner table", pluralName: "dinner tables", category:"furniture", unit:"N/A", cost:"5"};
        } else if (iName == "musicPlayer"){
            return {name:"music player", pluralName: "music players", category:"furniture", unit:"N/A",cost:"5"};
        } else if (iName == "rug"){
            return {name:"rug", pluralName: "rugs", category:"furniture", unit:"N/A",cost:"5"};
        } else if (iName == "screen"){
            return {name:"screen", pluralName: "screens", category:"furniture", unit:"N/A",cost:"5"};
        } else if (iName == "shelf"){
            return {name:"shelf", pluralName: "shelves", category:"furniture", unit:"N/A",cost:"5"};
        }  else if (iName == "sofa"){
            return {name:"sofa", pluralName: "sofas", category:"furniture", unit:"N/A",cost:"5"};
        }  else if (iName == "table"){
            return {name:"table", pluralName: "tables", category:"furniture", unit:"N/A",cost:"5"};
        }  else if (iName == "wallShelf"){
            return {name:"wall shelf", pluralName: "wall shelves", category:"furniture", unit:"N/A",cost:"5"};
        }  else if (iName == "burger_mult"){
            return {name:"burger set", pluralName: "burger sets", category:"food", unit:"set", cost:"5"};   // set, slice, bag, glass, box, bowl
        }  else if (iName == "cake"){
            return {name:"cake", pluralName: "cakes", category:"food", unit:"slice", cost:"5"};
        } else if (iName == "pizza"){
            return {name:"pizza", pluralName: "pizzas", category:"food", unit:"slice", cost:"5"};
        } else if (iName == "cherries"){
            return {name:"cherry", pluralName: "cherries", category:"food", unit:"bag", cost:"5"};
        } else if (iName == "chips"){
            return {name:"chips", pluralName: "chips", category:"food", unit:"bag", cost:"5"};
        } else if (iName == "spaceWater"){
            return {name:"space water", pluralName: "space water", category:"food", unit:"glass", cost:"5"};
        } else if (iName == "juice"){
            return {name:"juice", pluralName: "glasses of juice", category:"food", unit:"glass", cost:"5"};
        } else if (iName == "milkshake"){
            return {name:"milkshake", pluralName: "milkshakes", category:"food", unit:"glass", cost:"5"};
        } else if (iName == "ketchup"){
            return {name:"ketchup", pluralName: "bottles of ketchup", category:"food", unit:"box", cost:"5"};
        } else if (iName == "burger"){
            return {name:"burger", pluralName: "burgers", category:"food", unit:"box",cost:"5"};
        } else if (iName == "saladBowl"){
            return {name:"salad", pluralName: "salads", category:"food", unit:"bowl", cost:"5"};            // ------------
        } else if (iName == "ballons"){
            return {name:"balloons", pluralName: "balloons", category:"deco", unit:"set", cost:"5"};          // set, pot
        } else if (iName == "light"){
            return {name:"light", pluralName: "lights", category:"deco", unit:"set", cost:"5"};
        } else if (iName == "bunting"){
            return {name:"banner", pluralName: "banners", category:"deco", unit:"set", cost:"5"};
        } else if (iName == "partyHat"){
            return {name:"party hat", pluralName: "party hats", category:"deco", unit:"set", cost:"5"};
        } else if (iName == "hangingDeco"){
            return {name:"hanging decoration", pluralName: "hanging decorations", category:"deco", unit:"set", cost:"5"};
        } else if (iName == "starBanner"){
            return {name:"star banner", pluralName: "star banners", category:"deco", unit:"set", cost:"5"};
        } else if (iName == "wallHanging"){
            return {name:"wall hanger", pluralName: "wall hangers", category:"deco", unit:"set", cost:"5"};
        } else if (iName == "sculpture"){
            return {name:"sculpture", pluralName: "sculptures", category:"deco", unit:"set", cost:"5"};
        } else if (iName == "plantPot"){
            return {name:"plant", pluralName: "plants", category:"deco", unit:"pot", cost:"5"};
        } else if (iName == "spacePlants"){
            return {name:"space plant", pluralName: "space plants", category:"deco", unit:"pot", cost:"5"};  // -----------
        } else if (iName == "alienShip"){
            return {name:"alien ship", pluralName: "alien ships", category:"kiddie", unit:"set", cost:"5"}; // set, box, N/A
        } else if (iName == "rocket"){
            return {name:"rocket", pluralName: "rockets", category:"kiddie", unit:"set", cost:"5"};
        } else if (iName == "rocket_2"){
            return {name:"V2 rocket", pluralName: "V2 rockets", category:"kiddie", unit:"set", cost:"5"};
        } else if (iName == "sticker"){
            return {name:"sticker", pluralName: "stickers", category:"kiddie", unit:"set", cost:"5"};
        } else if (iName == "telescope"){
            return {name:"telescope", pluralName: "telescopes", category:"kiddie", unit:"set", cost:"5"};
        } else if (iName == "gift"){
            return {name:"gift", pluralName: "gifts", category:"kiddie", unit:"box", cost:"5"};
        } else if (iName == "icecream"){
            return {name:"popsicle", pluralName: "popsicles", category:"kiddie", unit:"box", cost:"5"};
        } else if (iName == "spaceTeddy"){
            return {name:"space teddy", pluralName: "space teddies", category:"kiddie", unit:"N/A", cost:"5"};
        } else if (iName == "ball"){
            return {name:"ball", pluralName: "balls", category:"kiddie", unit:"N/A", cost:"5"};
        } else if (iName == "earthBall"){
            return {name:"earth ball", pluralName: "earth balls", category:"kiddie", unit:"N/A", cost:"5"};
        } 
        
    }
}