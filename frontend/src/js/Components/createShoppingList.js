export function CreateShoppingList(furniture_assets, food_assets, deco_assets, kiddie_assets){
  var all_assets = [];
  var counter = 0;
  while (counter<5){
    var furniture = furniture_assets[Math.floor(Math.random() * furniture_assets.length)];
    if (all_assets.includes(furniture) == false){
      all_assets.push(furniture);
      counter++;
    }
  }
  var counter = 0;
  while (counter<5){
    var food = food_assets[Math.floor(Math.random() * food_assets.length)];
    if (all_assets.includes(food) == false){
      all_assets.push(food);
      counter++;
    }
  }
  var counter = 0;
  while (counter<5){
    var deco = deco_assets[Math.floor(Math.random() * deco_assets.length)];
    if (all_assets.includes(deco) == false){
      all_assets.push(deco);
      counter++;
    }
  }
  var counter = 0;
  while (counter<5){
    var kiddie = kiddie_assets[Math.floor(Math.random() * kiddie_assets.length)];
    if (all_assets.includes(kiddie) == false){
      all_assets.push(kiddie);
      counter++;
    }
  }
  return all_assets;
}
