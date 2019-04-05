var interfaceBtns           = ["ExitGame", "Profile", "Bag", "List", "Credit"];

var beach_guestImages       = ["beach_char1", "beach_char2", "beach_char3", "beach_char4", "beach_char5", "beach_char6", "beach_char7"];
var spaceroom_guestImages   = ["spaceroom_char1", "spaceroom_char2", "spaceroom_char3", "spaceroom_char4", "spaceroom_char5", "spaceroom_char6"];
var playground_guestImages  = ["playground_char1", "playground_char2", "playground_char3", "playground_char4", "playground_char5", "playground_char6"];

var spaceFurnitures         = ["Chair", "DinnerTable", "Floor", "MusicPlayer", "Rug", "Screen", "Shelf", "Sofa", "Table", "WallShelf"];
var spaceFood               = ["Burger_mult","Burger","Cake","Cherries","Chips","Juice","Ketchup","Pizza","SaladBowl","SpaceWater"];
var spaceDeco               = ["Balloons","Bunting", "HangingDeco","Light", "PartyHat", "PlantPot", "Sculpture", "SpacePlants", "StarBanner", "WallHanging"];
var spaceKiddie             = ["AlienShip","Ball","EarthBall","Gift","Icecream", "Rocket", "Rocket_2", "SpaceTeddy", "Sticker", "Telescope"];


var playFurnitures          = ["Barbeque", "Benchrest", "Dustbin", "bench", "monkeyBars", "Gym", "LampPost", "Sandground", "Toycar", "Trampoline"];
var playFood                = ["Apple", "Banana", "iceCream", "Jar", "JellyCake", "Juice", "ketchup", "melon", "Milk"];
var playDeco                = ["BalloonKart", "Banner2", "Butterfly", "Flowers", "Grass", "GroupBanner", "Music", "PartyHat", "SandBucket", "Tree"];
var playKiddie              = ["Ball", "Car", "Cupcake", "Helicopter", "Hulahoop", "icecream", "Kite", "PicnicBasket", "Pinwheel", "Skateboard"];

var beachFurnitures         = ["hut", "chairSet", "lifeguardTower", "rug", "chair", "sideTable", "watercraft", "sandCastle", "car", "umbrella"];
var beachFood               = ["squid", "juice", "fruitSet", "salad", "seafoodSkewer", "juice2", "lemons", "popsicle", "appleSlush", "coconut"];
var beachDeco               = ["tree", "flamingo", "ship", "dolphin", "surfBoard", "crab", "shells", "shells2", "starfish", "banner"];
var beachKiddie             = ["lifesaver", "hat", "sandles", "sunglasses", "juice", "beachBall", "bucket", "drum", "ukulele", "beachGadgetSet"];

var allFurnitures           = ["Chair", "DinnerTable", "Floor", "MusicPlayer", "Rug", "Screen", "Shelf", "Sofa", "Table", "WallShelf", "Barbeque", "Benchrest", "Dustbin", "bench", "monkeyBars", "Gym", "LampPost", "Sandground", "Toycar", "Trampoline", "hut", "chairSet", "lifeguardTower", "rug", "chair", "sideTable", "watercraft", "sandCastle", "car", "umbrella"];
var allFood                 = ["Burger_mult","Burger","Cake","Cherries","Chips","Juice","Ketchup","Pizza","SaladBowl","SpaceWater", "Apple", "Banana", "iceCream", "Jar", "JellyCake", "Juice", "ketchup", "melon", "Milk", "squid", "juice", "fruitSet", "salad", "seafoodSkewer", "juice2", "lemons", "popsicle", "appleSlush", "coconut"];
var allDeco                 = ["Balloons","Bunting", "HangingDeco","Light", "PartyHat", "PlantPot", "Sculpture", "SpacePlants", "StarBanner", "WallHanging", "BalloonKart", "Banner2", "Butterfly", "Flowers", "Grass", "GroupBanner", "Music", "PartyHat", "SandBucket", "Tree", "tree", "flamingo", "ship", "dolphin", "surfBoard", "crab", "shells", "shells2", "starfish", "banner"]
var allKiddie               = ["AlienShip","Ball","EarthBall","Gift","Icecream", "Rocket", "Rocket_2", "SpaceTeddy", "Sticker", "Telescope", "Ball", "Car", "Cupcake", "Helicopter", "Hulahoop", "icecream", "Kite", "PicnicBasket", "Pinwheel", "Skateboard", "lifesaver", "hat", "sandles", "sunglasses", "juice", "beachBall", "bucket", "drum", "ukulele", "beachGadgetSet"];


var allFurnitureName = ["chair", "dinner table", "floor", "music player", "rug", "screen", "shelf", "sofa", "table", "wall shelf", "barbeque", "benchrest", "dustbin", "bench", "monkey bar set", "gym play set", "lamp post", "sand box", "toy car", "trampoline", "hut", "chair set", "lifeguard tower", "rug", "chair", "side table", "watercraft", "sandcastle", "car", "umbrella"];
var allFurniturePluralName = ["chairs", "dinner tables", "floors", "music players", "rugs", "screens", "shelves", "sofas", "tables", "wall shelves", "barbeques", "benchrests", "dustbins", "benches", "monkey bar sets", "gym play sets", "lamp posts", "sand boxes", "toy cars", "trampolines", "huts", "chair sets", "lifeguard towers", "rugs", "chairs", "side tables", "watercrafts", "sandcastles", "cars", "umbrellas"];
var allFurnitureCost = ["5", "30", "20", "30", "20", "50", "30", "40", "30", "2", "10", "8", "4", "5", "15", "30", "6", "9", "3", "8", "40", "20", "50", "10", "8", "7", "20", "3", "4", "6"];

var allFoodName = ["burger set","burger","cake","bowl of cherries","bowl of chips","juice","ketchup","pizza","salad bowl","space water", "apple", "banana", "ice cream", "jam jar", "jelly cake", "juice", "ketchup", "melon", "milk", "squid", "juice", "fruit set", "salad", "seafood skewer", "juice", "lemon", "popsicle", "apple slush", "coconut"];
var allFoodPluralName = ["burger sets","burgers","cakes","bowls of cherries","bowls of chips","juice","bottles of ketchup","pizzas","salad bowls","bags of space water", "apples", "bananas", "ice creams", "jam jars", "jelly cakes", "bottles of juice", "bottles of ketchup", "melons", "milk", "squids", "bottles of juice", "fruit sets", "salads", "seafood skewers", "bottles of juice", "lemons", "popsicles", "apple slushies", "coconuts"];
var allFoodCost = ["12","4","15","5","4","4","3","7","8","9", "3", "2", "4", "5", "6", "4", "3", "8", "3", "9", "4", "8", "5", "7", "8", "6", "3", "5", "8"];

var allDecoName = ["balloon","banner", "hanging decooration","light", "party hat", "plant pot", "sculpture", "space plants set", "star banner", "wall hanger", "Balloon Kart", "banner", "butterfly", "flower set", "grass set", "group banner", "boombox", "party hat", "sand bucket", "tree", "tree", "flamingo", "ship", "dolphin", "surf board", "crab", "shell set", "shell set", "starfish", "banner"];
var allDecoPluralName = ["balloons","banners", "hanging decoorations","lights", "party hats", "plant pots", "sculptures", "space plants sets", "star banners", "wall hangers", "Balloon Karts", "banners", "butterflies", "flower sets", "grass sets", "group banners", "boomboxes", "party hats", "sand buckets", "trees", "trees", "flamingos", "ships", "dolphins", "surf boards", "crabs", "shell sets", "shell sets", "starfishs", "bannerss"];
var allDecoCost = ["2","2", "3","4", "3", "5", "8", "9", "6", "5", "20", "4", "5", "3", "2", "6", "7", "8", "8", "10", "10", "8", "9", "9", "3", "5", "7", "6", "5", "3"];

var allKiddieName = ["UFO","ball","earth ball","gift","icecream", "rocket", "rocket", "space teddy", "sticker", "telescope", "ball", "car", "cupcake", "helicopter", "hulahoop", "icecream", "kite", "picnic basket", "pinwheel", "skateboard", "lifesaver", "hat", "set of sandles", "a set of sunglasses", "juice", "beach ball", "bucket", "drum", "ukulele", "beach gadget set"];
var allKiddiePluralName = ["UFOs","balls","earth balls","gifts","icecreams", "rockets", "rockets", "space teddies", "stickers", "telescopes", "balls", "cars", "cupcakes", "helicopters", "hulahoops", "icecreams", "kites", "picnic baskets", "pinwheels", "skateboards", "lifesavers", "hats", "sets of sandles", "sets of sunglasses", "juice", "beach balls", "buckets", "drums", "ukuleles", "beach gadget sets"];
var allKiddieCost = ["7","4","5","6","8", "9", "9", "8", "3", "9", "5", "4", "3", "8", "4", "3", "5", "7", "7", "9", "6", "7", "8", "9", "3", "4", "5", "7", "9", "9"];

export {interfaceBtns, beach_guestImages, spaceroom_guestImages, playground_guestImages,
spaceFurnitures, playFurnitures, beachFurnitures,
spaceFood, playFood, beachFood,
spaceDeco, playDeco, beachDeco,
spaceKiddie, playKiddie, beachKiddie, allFurnitures, allFood, allDeco, allKiddie,
allFurnitureName, allFurniturePluralName, allFurnitureCost,
allFoodName, allFoodPluralName, allFoodCost,
allDecoName, allDecoPluralName, allDecoCost,
allKiddieName, allKiddiePluralName, allKiddieCost
} ;
