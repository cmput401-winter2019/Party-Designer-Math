import {allFurnitures, allFood, allDeco, allKiddie,
allFurnitureName, allFurniturePluralName, allFurnitureCost, 
allFoodName, allFoodPluralName, allFoodCost,
allDecoName, allDecoPluralName, allDecoCost,
allKiddieName, allKiddiePluralName, allKiddieCost} from '../Components/assets.js';


export class ImageToProperties {
    constructor(config) {
        this.config = config;
    }

    getProp(iName){ // name, pluralName, category , unit
        var e1 = allFurnitures.indexOf(iName);
        var e2 = allFood.indexOf(iName);
        var e3 = allDeco.indexOf(iName);
        var e4 = allKiddie.indexOf(iName);
        if (e1 >= 0 ){
          return {name      : allFurnitureName[e1],
                  pluralName: allFurniturePluralName[e1],
                  category  : "furniture",
                  cost      : allFurnitureCost[e1]
                }
        } else if (e2 >= 0 ){
          return {name      : allFoodName[e2],
                  pluralName: allFoodPluralName[e2],
                  category  : "food",
                  cost      : allFoodCost[e2]
                }

        } else if (e3 >= 0 ){
          return {name      : allDecoName[e3],
                  pluralName: allDecoPluralName[e3],
                  category  : "deco",
                  cost      : allDecoCost[e3]
                }

        } else if (e4 >= 0){
          return {name      : allKiddieName[e4],
                  pluralName: allKiddiePluralName[e4],
                  category  : "kiddie",
                  cost      : allKiddieCost[e4]
                }
        }
    }
  }
