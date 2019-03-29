export class User{
    constructor(userName, id, money, guestNumber, currentLevel, backpack, credits, itemsOnScreen, randomNumbers, itemList) {

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
    }

    get username(){
      return this._uName;
    }
    get id(){
      return this._id;
    }
    get money(){
      return this._money;
    }
    get guestNumber(){
      return this._guestNumber;
    }
    get level(){
        return this._level;
    }
    get credits(){
        return this._credits;
    }
    get backpack(){
        return this._backpack;
    }
    get screenItems(){
        return this._screenItems;
    }
    get itemsInShopList(){
        return this._itemsInShopList;
    }
    get numbersInShopList(){
        return this._numbersInShopList;
    }

    increaseLevel(){
        this._level +=1;
    }
    decreaseLevel(){
        this._level -=1;
    }
    increaseCredits(increaseAmount){
        this._credits += increaseAmount;
    }
    decreaseCredits(decreaseAmount){
        this._credits -= decreaseAmount;
    }
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

}
