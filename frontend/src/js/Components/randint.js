export function RandomNumber(){
  var number = [];
  for(var i=0; i<20; i++){
    number[i]=Phaser.Math.Between(2,9);
  }
  return number;
}
