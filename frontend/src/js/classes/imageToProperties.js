import {allFurnitures, allFood, allDeco, allKiddie} from '../Components/assets';


export class ImageToProperties {
    constructor(config) {
        this.config = config;
    }

    getProp(iName){ // name, pluralName, category , unit
        for(var i=0; i<allFurnitures.length; i++){
          if(iName == allFurnitures[i]){
            return {  name      : allFurnitures[i],
                      pluralName: allFurnitures[i]+"s",
                      category  : "furniture",
                      cost      : "5"}
          }
        }

        for(var i=0; i<allFood.length; i++){
          if(iName == allFood[i]){
            return {  name      : allFood[i],
                      pluralName: allFood[i]+"s",
                      category  : "food",
                      cost      : "5"}
          }
        }

        for(var i=0; i<allDeco.length; i++){
          if(iName == allDeco[i]){
            return {  name      : allDeco[i],
                      pluralName: allDeco[i]+"s",
                      category  : "deco",
                      cost      : "5"}
          }
        }

        for(var i=0; i<allKiddie.length; i++){
          if(iName == allKiddie[i]){
            return {  name      : allKiddie[i],
                      pluralName: allKiddie[i]+"s",
                      category  : "kiddie",
                      cost      : "5"}
        }
      }
    }
  }
