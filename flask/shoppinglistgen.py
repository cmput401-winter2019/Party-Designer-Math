import random

# sources : https://stackoverflow.com/questions/6494508/how-do-you-pick-x-number-of-unique-numbers-from-a-list-in-python

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
    
    def generateItems(self, theme):
        themeAssets = self.assets[theme]

        furnitureSet = set(themeAssets["furniture"])
        foodSet = set(themeAssets["food"])
        decoSet = set(themeAssets["deco"])
        kiddieSet = set(themeAssets["kiddie"])
        
        furnitureChoices = random.sample(furnitureSet, 5)
        foodChoices = random.sample(foodSet, 5)
        decoChoices = random.sample(decoSet, 5)
        kiddieChoices = random.sample(kiddieSet, 5)

        return furnitureChoices+foodChoices+decoChoices+kiddieChoices