import {User} from './classes/user';

const user = new User("Bob", 3, {"chair": 2, "sofa": 3}, 100, {"light": 1});


// Test increase & decrease levels
test('Decrease Level', () =>{
    user.decreaseLevel();
    expect(user.level === 2)
});

test('Increase Level', () =>{
    user.increaseLevel();
    expect(user.level === 3)
});


// Test increase & decrease credits

test('Decrease Credits', () =>{
    user.decreaseCredits();
    expect(user.credits === 70)
});

test('Increase Credits', () =>{
    user.increaseCredits();
    expect(user.credits === 120)
});



// Test putting item into backpack

test('Put into backpack existing item', () =>{
    user.putIntoBackpack("chair");
    expect(user.backpack["chair"] === "3")
});


test('Put into backpack non-existing item', () =>{
    user.putIntoBackpack("rug");
    expect(user.backpack["rug"] === "1")
});


// Test removing item from backpack

test('Backpack remove item', () =>{
    user.removeFromBackpack("sofa");
    expect(user.backpack["sofa"] === 2)
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



    // //console.log(this.user.screenItems);
