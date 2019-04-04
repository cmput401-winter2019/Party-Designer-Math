export class User{
    constructor(data){

        // Underscores signifies local variables
        this._uName             = data.username;
        this._id                = data.id;
        this._gamestateId       = data.gamestateId
        this._money             = data.money;
        this._guestNumber       = data.guestNumber;
        this._level             = data.currentLevel;
        this._backpack          = data.backpack;
        this._credits           = data.credits;
        this._screenItems       = data.itemsOnSceen;
        this._numbersInShopList = data.inShopList;
        this._itemsInShopList   = data.itemList;
        this._shoppingList      = {};
        this._progress;
        this._playthroughId;

        this._furniture_count   = 0;
        this._deco_count        = 0;
        this._food_count        = 0;
        this._kiddie_count      = 0;

        this.allItemsShopList(); // generates a dictionary of shopping list :
                                 //     item name and number that needs to be bought
    }

    setPlaythroughId(id) { this._playthroughId == id }
    get playthroughid() { return this._playthroughId }
    get gamestateId() {return this._gamestateId};

    get furniture_count()   { return this._furniture_count; }
    get deco_count()        { return this._deco_count;      }
    get food_count()        { return this._food_count;      }
    get kiddie_count()      { return this._kiddie_count;    }

    increase_furniture()    { this._furniture_count += 1; }
    increase_deco()         { this._deco_count      += 1; }
    increase_food()         { this._food_count      += 1; }
    increase_kiddie()       { this._kiddie_count    += 1; }

    decrease_furniture()    { this._furniture_count -= 1; }
    decrease_deco()         { this._deco_count      -= 1; }
    decrease_food()         { this._food_count      -= 1; }
    decrease_kiddie()       { this._kiddie_count    -= 1; }

    reset_furniture()       { this._furniture_count = 0;  }
    reset_deco()            { this._deco_count      = 0;  }
    reset_food()            { this._food_count      = 0;  }
    reset_kiddie()          { this._kiddie_count    = 0;  }

    get username()          { return this._uName;             }
    get id()                { return this._id;                }
    get money()             { return this._money;             }
    get gs_id()             { return this._gamestateId        }
    get guestNumber()       { return this._guestNumber;       }
    get level()             { return this._level;             }
    get credits()           { return this._credits;           }
    get backpack()          { return this._backpack;          }
    get screenItems()       { return this._screenItems;       }
    get itemsInShopList()   { return this._itemsInShopList;   }
    get numbersInShopList() { return this._numbersInShopList; }

    update_money(new_money)           { this._money = new_money}
    increaseLevel()                   { this._level +=1; }
    decreaseLevel()                   { this._level -=1; }
    increaseCredits(increaseAmount)   { this._credits += increaseAmount; }
    decreaseCredits(decreaseAmount)   { this._credits -= decreaseAmount; }

    putIntoBackpack(imageName){
        if (imageName in this._backpack){
          this._backpack[imageName] += 1;
        }else{
          this._backpack[imageName] = 1;
        }
    }

    removeFromBackpack(imageName){
        if (!(imageName in this._backpack) || (this._backpack[imageName] == 0)){
            return false;
        }
        this._backpack[imageName] -= 1;

        if(this._backpack[imageName]==0){
            delete this._backpack[imageName];
        }
    }

    putIntoScreenItems(imageName){
        if (imageName in this._screenItems){
            this._screenItems[imageName] += 1;
        } else {
            this._screenItems[imageName] = 1;
        }
    }

    removeFromScreenItems(imageName){
        if (!(imageName in this._screenItems)||(this._screenItems[imageName] == 0)){
            return false;
        }
        this._screenItems[imageName]    -= 1;
        if(this._screenItems[imageName] == 0){
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
            if(this.checkNumBought(key) == true){
                progress += 1;
            }
        }
        return progress/20;
    }

    checkNumBought(key){
        // Checks if the number of key (item) owned is more than the objective in the shopping list
        if (this._itemsInShopList.includes(key)){
            if (this._allItems[key] >= this._shoppingList[key]){
                return true;
            }
        }
    }

}
