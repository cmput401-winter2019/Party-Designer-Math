import random

class ShoppingListGenerator():
    def __init__(self):
        self.assets = {
        "theme1": 
            {
            "furniture": ["Chair", "DinnerTable", "Floor", "MusicPlayer", "Rug", "Screen", "Shelf", "Sofa", "Table", "WallShelf"],
            "food": ["Burger_mult","Burger","Cake","Cherries","Chips","Juice","Ketchup","Pizza","SaladBowl","SpaceWater"],
            "deco": ["Balloons","Bunting", "HangingDeco","Light", "PartyHat", "PlantPot", "Sculpture", "SpacePlants", "StarBanner", "WallHanging"],
            "kiddie": ["AlienShip","Ball","EarthBall","Gift","Icecream", "Rocket", "Rocket_2", "SpaceTeddy", "Sticker", "Telescope"],
            },
        "theme2" : 
            {
            "furniture": ["Barbeque", "Benchrest", "Dustbin", "bench", "monkeyBars", "Gym", "LampPost", "Sandground", "Toycar", "Trampoline"],
            "food": ["Apple", "Banana", "iceCream", "Jar", "JellyCake", "Juice", "ketchup", "melon", "Milk"],
            "deco": ["BalloonKart", "Banner2", "Butterfly", "Flowers", "Grass", "GroupBanner", "Music", "PartyHat", "SandBucket", "Tree"],
            "kiddie": ["Ball", "Car", "Cupcake", "Helicopter", "Hulahoop", "icecream", "Kite", "PicnicBasket", "Pinwheel", "Skateboard"],
            },
        "beach" :
            {
            "furniture": ["hut", "chairSet", "lifeguardTower", "rug", "chair", "sideTable", "watercraft", "sandCastle", "car", "umbrella"],
            "food": ["squid", "juice", "fruitSet", "salad", "seafoodSkewer", "juice2", "lemons", "popsicle", "appleSlush", "coconut"],
            "deco": ["tree", "flamingo", "ship", "dolphin", "surfBoard", "crab", "shells", "shells2", "starfish", "banner"],
            "kiddie": ["lifesaver", "hat", "sandles", "sunglasses", "juice", "beachBall", "bucket", "drum", "ukulele", "beachGadgetSet"],
            }
        }

    def generateAmounts(self):
        randomAmounts = []
        for i in range(20):
            randomNumber = random.randint(2, 9)
            randomAmounts.append(randomNumber)
        return randomAmounts
    
    def generateItems(self, theme):
        generatedAssets = []
        themeAssets = self.assets[theme]

        for i in range(5):
            choice = random.choice(themeAssets["furniture"])
            generatedAssets.append(choice)
        
        for i in range(5):
            choice = random.choice(themeAssets["food"])
            generatedAssets.append(choice)
        
        for i in range(5):
            choice = random.choice(themeAssets["deco"])
            generatedAssets.append(choice)

        for i in range(5):
            choice = random.choice(themeAssets["kiddie"])
            generatedAssets.append(choice)
        
        return generatedAssets