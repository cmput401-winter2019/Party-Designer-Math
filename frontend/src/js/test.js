import {User} from './classes/user';
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import GameScene from './Scenes/GameScene';


const user = new User({  username      : "bob",
    id            : 1,
    gamestateId   : 2,
    money         : 1000,
    guestNumber   : 3,
    currentLevel  : 1,
    backpack      : {"Chair":1, "sofa":2},
    credits       : 100,
    itemsOnSceen  : {"Chair":2, "cherries":3},
    inShopList    : [3,2,4],
    itemList      : ["light","ketchup","chips"]});



// Test increase & decrease levels
test('Decrease Level', () =>{
    user.decreaseLevel();

expect(user.level).toEqual(0)
});

test('Increase Level', () =>{
    user.increaseLevel();
expect(user.level).toEqual(1)
});


// Test increase & decrease credits

test('Decrease Credits', () =>{
    user.decreaseCredits(30);
expect(user.credits).toEqual(70)
});

test('Increase Credits', () =>{
    user.increaseCredits(50);
expect(user.credits).toEqual(120)
});



// Test putting item into backpack

test('Put into backpack existing item', () =>{
    user.putIntoBackpack("Chair");
expect(user.backpack["Chair"]).toEqual(2)
});


test('Put into backpack non-existing item', () =>{
    user.putIntoBackpack("rug");
expect(user.backpack["rug"]).toEqual(1)
});


// Test removing item from backpack

test('Backpack remove item', () =>{
    user.removeFromBackpack("sofa");
expect(user.backpack["sofa"]).toEqual(1)
});

test('Backpack remove item', () =>{
    user.removeFromBackpack("rug");
expect(user.backpack["rug"]).toEqual(undefined)
});


test('Backpack remove non-existent item', () =>{
    expect(user.backpack["lol"]).toEqual(undefined)
});




// Test putting item into screenItems list
test('ScreenItem add existing item', () =>{
    user.putIntoScreenItems("light");
expect(user.screenItems["light"]).toEqual(1)
});

test('ScreenItem add not on screen item', () =>{
    user.putIntoScreenItems("icecream");
expect(user.screenItems["icecream"]).toEqual(1)
});


// Test remove item from screenItems list
test('ScreenItem remove existing item', () =>{
    user.removeFromScreenItems("Chair");
expect(user.screenItems["Chair"]).toEqual(1)
});

test('ScreenItem remove existing item', () =>{
    user.removeFromScreenItems("icecream");
expect(user.screenItems["icecream"]).toEqual(undefined)
});



test('ScreenItem remove non-existing item', () =>{
    expect(user.screenItems["asdasd"]).toEqual(undefined)
});

// test('test snapshot', () => {
//         const screen = document.createElement('ok');
//         ReactDom.render(<GameScene/>,screen);
//
// });




//console.log(this.user.screenItems);