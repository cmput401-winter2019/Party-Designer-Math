export class User{
    constructor(userName,
                id,
                money,
                guestNumber,
                currentLevel,
                backpack,
                credits,
                itemsOnScreen,
                randomNumbers,
                itemList,
                furniture_count,
                deco_count,
                food_count,
                kiddie_count){

        // Underscores signifies local variables
        this._uName             = userName;
        this._id                = id;
        this._money             = money;
        this._guestNumber       = guestNumber;
        this._level             = currentLevel;
        this._backpack          = backpack;
        this._credits           = credits;
        this._screenItems       = itemsOnScreen;
        this._numbersInShopList = randomNumbers;
        this._itemsInShopList   = itemList;
        this._shoppingList      = {};
        this._furniture_count   = furniture_count;
        this._deco_count        = deco_count;
        this._food_count        = food_count;
        this._kiddie_count      = kiddie_count;
        this._progress;
        this.allItemsShopList(); // generates a dictionary of shopping list :
                                 //     item name and number that needs to be bought
    }

    get furniture_count() { return this._furniture_count; }
    get deco_count()      { return this._deco_count;      }
    get food_count()      { return this._food_count;      }
    get kiddie_count()    { return this._kiddie_count;    }

    increase_furniture()  { this._furniture_count += 1; }
    increase_deco()       { this._deco_count      += 1; }
    increase_food()       { this._food_count      += 1; }
    increase_kiddie()     { this._kiddie_count    += 1; }

    reset_furniture()     { this._furniture_count = 0;  }
    reset_deco()          { this._deco_count      = 0;  }
    reset_food()          { this._food_count      = 0;  }
    reset_kiddie()        { this._kiddie_count    = 0;  }

    get username()          { return this._uName;             }
    get id()                { return this._id;                }
    get money()             { return this._money;             }
    get guestNumber()       { return this._guestNumber;       }
    get level()             { return this._level;             }
    get credits()           { return this._credits;           }
    get backpack()          { return this._backpack;          }
    get screenItems()       { return this._screenItems;       }
    get itemsInShopList()   { return this._itemsInShopList;   }
    get numbersInShopList() { return this._numbersInShopList; }

    increaseLevel()                   { this._level +=1; }
    decreaseLevel()                   { this._level -=1; }
    increaseCredits(increaseAmount)   { this._credits += increaseAmount; }
    decreaseCredits(decreaseAmount)   { this._credits -= decreaseAmount; }

    putIntoBackpack(imageName){
        if (imageName in this._backpack){
            //console.log(imageName, "exists in backpack");
            this._backpack[imageName] += 1;
        } else {
            //console.log("Backpack does not have", imageName);
            this._backpack[imageName] = 1;
        }
    }
    removeFromBackpack(imageName){
        if (!(imageName in this._backpack)||(this._backpack[imageName] == 0)){
            //console.log(imageName, "does not exist in backpack");
            return false;
        }
        this._backpack[imageName] -= 1;

        if(this._backpack[imageName]==0){
            delete this._backpack[imageName];
        }
    }
    putIntoScreenItems(imageName){
        if (imageName in this._screenItems){
            //console.log(imageName, "exists in screenItems list");
            this._screenItems[imageName] += 1;
        } else {
            //console.log("screenItems list does not have", imageName);
            this._screenItems[imageName] = 1;
        }
        console.log("backpack", this._backpack);
        console.log("screenItems", this._screenItems);
    }
    removeFromScreenItems(imageName){
        if (!(imageName in this._screenItems)||(this._screenItems[imageName] == 0)){
            //console.log(imageName, "does not exist in screenItems list");
            return false;
        }
        this._screenItems[imageName] -= 1;
        if(this._screenItems[imageName]==0){
            delete this._screenItems[imageName];
        }
    }
    putItemFromScreenToBackpack(imageName){
        //If item is sucessfully removed from screenItems list, put it to backpack
        if(this.removeFromScreenItems(imageName)!=false){
            this.putIntoBackpack(imageName);
        }
    }
    putItemFromBackpackToScreen(imageName){
        //If item is sucessfully removed from backpack, put it to screenItems list
        if(this.removeFromBackpack(imageName)!=false){
            this.putIntoScreenItems(imageName);
        }
    }
    allItemsBoughtList(){
        // Combines items in backpack and items in screen (dictionary{item: numBought})
        this._allItems = {};
        for (var key in this._screenItems){
            this._allItems[key] = this._screenItems[key];
        }
        for(var key in this._backpack){
            if (key in this._allItems){
                this._allItems[key] += this._backpack[key];
            } else {
                this._allItems[key] = this._backpack[key];
            }
        }
    }
    allItemsShopList(){
        for(var i=0; i<this._itemsInShopList.length; i++){
            this._shoppingList[this._itemsInShopList[i]] = this._numbersInShopList[i];
        }
    }
    checkProgress(){
        var progress = 0;
        this.allItemsBoughtList();
        for(var key in this._allItems){
            if(this.checkNumBought(key)== true){
                progress += 1;
            }
        }
        console.log("progress", progress/20);
        return progress/20;
    }
    checkNumBought(key){
        // Checks if the number of key (item) owned is more than the objective in the shopping list
        if (this._itemsInShopList.includes(key)){
            //console.log(key, this._shoppingList[key]);
            if (this._allItems[key] >= this._shoppingList[key]){
                return true;
            }
        }
    }

}
