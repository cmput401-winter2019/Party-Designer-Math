import {User} from './classes/user';
//import renderer from 'react-test-renderer';

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
    itemList      : ["Light","ketchup","chips"]});



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
expect(user.backpack["rug"] === 0)
});

test('Backpack remove item', () =>{
    expect(user.removeFromBackpack("rug") === false)
});

test('Backpack remove non-existent item', () =>{
    expect(user.removeFromBackpack("bob") === false)
});




// Test putting item into screenItems list
test('ScreenItem add existing item', () =>{
    user.putIntoScreenItems("light");
expect(user.screenItems["light"] === 2)
});

test('ScreenItem add not on screen item', () =>{
    user.putIntoScreenItems("icecream");
expect(user.screenItems["icecream"] === 1)
});


// Test remove item from screenItems list
test('ScreenItem remove existing item', () =>{
    user.removeFromScreenItems("light");
expect(user.screenItems["light"] === 1)
});

test('ScreenItem remove existing item', () =>{
    user.removeFromScreenItems("iceceram");
expect(user.screenItems["icecream"] === 0)
});

test('ScreenItem remove 0-item', () =>{
    expect(user.removeFromScreenItems("icecream")===false)
});

test('ScreenItem remove non-existing item', () =>{
    expect(user.removeFromScreenItems("hello")===false)
});

//
// describe('')
//



//console.log(this.user.screenItems);