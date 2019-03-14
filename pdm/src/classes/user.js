export class User{
    constructor(userName, currentLevel, backpack, credits, itemsOnScreen) {
        // Underscores signifies local variables
        this._uName     = userName;
        this._level     = currentLevel;
        this._backpack  = backpack;
        this._credits   = credits;
        this._screenItems = itemsOnScreen;
    }
    increaseCredits(increaseAmount){
        this._credits += increaseAmount;
    }
    decreaseCredits(decreaseAmount){
        this._credits -= decreaseAmount;
    }
    get credits(){
        return this._credits;
    }
    get backpack(){
        return this._backpack;
    }
    putIntoBackpack(imageName){
        if (imageName in this._backpack){
            console.log(imageName, "exists in backpack");
            this._backpack[imageName] += 1;
        } else {
            console.log("Backpack does not have", imageName);
            this._backpack[imageName] = 1;
        }
    }
    removeFromBackpack(imageName){
        if (!(imageName in this._backpack)||this._backpack[imageName] == 0){
            console.log(imageName, "does not exist in backpack");
            return false;
        } 
        this._backpack[imageName] -= 1;
    }

}