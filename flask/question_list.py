from random import randint
from math import ceil,floor

def addition(itemCost, itemUnit, itemPlurName, addcap, itemName):
    randQNum = randint(1, 3)
    q = ""
    answer = 0

    if (randQNum == 1):
        randInt1 = randint(2, addcap)
        randInt2 = randint(2, addcap)
        q = ("There were {} {} on the store shelf. \nIf the manager came and put {} more {} on the shelf,\n"
            "how many {} are there on the shelf now?").format(str(randInt1), itemPlurName, str(randInt2), itemPlurName, itemPlurName)

        answer = randInt1 + randInt2

    elif(randQNum == 2):
        randInt1 = randint(2, floor(addcap/2))
        randInt2 = randint(2, floor(addcap/2))
        q = ("If you bought {} {}, your friend Mary bought {} {} \nand your friend John bought {} {},\n"
            "how many {} did you and your friends bought in total?").format(str(itemUnit), itemPlurName, str(randInt1), itemPlurName, str(randInt2), itemPlurName,itemPlurName)

        answer = itemUnit + randInt1 + randInt2

    elif(randQNum == 3):
        randInt1 = randint(2, addcap)                                          # This question allows decimal cost calculation
        q = ("One {} costs {} dollars. One bookmark costs {} dollars.\n"
            "If Bob bought one of each how much money did he spent in total?" ).format(itemName, str(itemCost), randInt1+itemCost)

        answer = randInt1+itemCost + itemCost

    return {"q": q, "ans": answer, "type": "addition"}

def subtraction(itemCost, itemUnit, itemPlurName, subcap, itemName):
    randQNum = randint(1, 3)
    q = ""
    answer = 0
    if (randQNum == 1):
        if (itemCost*itemUnit >= 2):
            randInt = randint(2, itemCost-1)
        else:
            randInt = 1

        q = ("Your want to buy {} {} that costs a total of {} dollars. \nIf your friend has a 'take {} dollar{plural} off your total purchase' coupon,\n"
            "what is the new cost that you have to pay?").format(itemUnit, itemPlurName, itemCost*itemUnit, str(randInt), plural="s" if randInt>1 else "")

        answer = itemCost*itemUnit-randInt

    elif(randQNum == 2):
        randInt = randint(itemUnit+1, subcap)
        boughtInt = randint(1, randInt-itemUnit)
        q = ("If there were {} {} currently being sold at the store, \nbut a man came and bought {} and you bought {}, "
            "\nHow many {} are left in the store?").format(str(randInt), itemPlurName, str(boughtInt), itemUnit, itemPlurName)

        answer = randInt - boughtInt - itemUnit

    elif(randQNum == 3):
        plural=itemPlurName if (itemUnit>1) else itemName
        randInt = randint(itemUnit+1, subcap)
        randInt2 = randint(1, randInt-itemUnit)
        q = ("If your family bought {} {}, but accidentally lost the {} {} that \nyou bought, and lost the {} {} that your cousin bought, \nhow many {} does your family have left?").format(randInt, itemPlurName, itemUnit, plural, randInt2, itemPlurName, itemPlurName)
        answer = randInt - randInt2 - itemUnit

    return {"q": q, "ans": answer, "type": "subtraction"}

def division(itemCost, itemUnit, itemPlurName, multcap, itemName, guestsNum):
    randQNum = randint(1, 3)
    q = ""
    answer = 0

    if (randQNum == 1):
        numOfPeople = guestsNum+1
        randInt1 = randint(2, multcap)
        q = ("There are {} persons in your party (including yourself).\n"
            "If you bought {} {} of {} for your party and want to split them evenly. \n"
            "How many {} of {} should each person get?").format(str(numOfPeople), numOfPeople*randInt1, "units", itemName, "units", itemName)

        answer = randInt1

    elif(randQNum == 2):
        numOfPeople = guestsNum+1
        randInt1 = randint(2, multcap)
        cost = numOfPeople * randInt1
        q = ("There are {} persons in your party (including yourself).\n"
            "If you bought {} with a TOTAL cost of {} dollars, \n"
            "how much did it cost you per person?").format(str(numOfPeople), itemPlurName, str(cost))

        answer = randInt1

    elif(randQNum == 3):
       numOfPeople = guestsNum+1
       randInt1 = randint(2, multcap)*randint(2, multcap)                 # Remainder question
       q = ("There are {} persons in your party (including yourself).\n"
            "If you bought {} {} of {} for your party and splitted the {} \n"
            "evenly among you and your friends. \n"
            "How many {} of {} were left over?").format(str(numOfPeople), randInt1, "units", itemName, "units", "units", itemName)

       answer = randInt1%numOfPeople

    return {"q": q, "ans": answer, "type": "division"}

def multiplication(itemCost, itemUnit, itemPlurName, multcap, itemName):
    randQNum = randint(1, 3)
    q = ""
    answer = 0

    if (randQNum == 1):
        q = ("You are buying {} {} at a cost of {} each. How much do you need to pay in total?").format(itemUnit, itemName, itemCost)

        answer = itemUnit * itemCost

    elif (randQNum == 2):
        randInt1 = randint(2, multcap)
        randInt2 = randint(2, multcap)
        q = ("A box contains {} {}. If you have {} boxes, "
        "\nhow many {} do you have in total?").format(randInt1, itemPlurName, randInt2, itemPlurName)

        answer = randInt1*randInt2

    elif (randQNum == 3):
        randInt1 = randint(2, multcap)
        randInt2 = randint(2, multcap)
        q = ("In a store, there are {} shelves where {} are placed. \n"
            "Each shelf contains {} {}. \n"
            "How many {} does the store have in total?").format(randInt1, itemPlurName, randInt2, itemPlurName, itemPlurName)

        answer = randInt1*randInt2

    return {"q": q, "ans": answer, "type": "multiplication"}

def mixed(itemCost, itemUnit, itemPlurName, multcap, itemName, guestsNum):
        randQNum = randint(1, 3)
        q = ""
        answer = 0

        if (randQNum == 1):
            randInt1 = randint(2, multcap)
            randInt2 = randint(2, multcap)
            cost1 =  randint(2, multcap)
            cost2 =  randint(2, multcap)
            q = ("Suppose you bought {} {} costing {} dollars each, and"
                "\none of your parents bought {} {} costing {} dollars each."
                "\nIf you were to divide the {} evenly among your {} guests for "
                "\ntheir kiddie bags, how much did one kiddie bag cost your family?").format(guestsNum*randInt1, itemPlurName, cost1,
                    guestsNum*randInt2, itemPlurName, cost2,
                    itemPlurName, guestsNum)
            answer = randInt1*cost1+randInt2*cost2

        elif (randQNum == 2):
            randInt1 = randint(2, multcap)
            randInt2 = randint(2, multcap)
            q = ("A box contains {} {}. How many boxes of {} do you need"
            "\nso that all of your {} guests can have {} {} each?").format(randInt1, itemPlurName, itemPlurName, guestsNum, randInt2, itemPlurName)

            answer = ceil((guestsNum*randInt2)/randInt1)

        elif (randQNum == 3):
            randInt1 = randint(2, multcap)*guestsNum
            randInt2 = randint(2, multcap)
            q = ("You bought {} {} stickers costing at {} dollars each to split evenly \n"
                "among your {} guests, but your friend Mary could not make it to the \n"
                "party, so you went back to the store and got a refund for her share.\n"
                "How much did you spend on the {} stickers in total (after the refund)?"
                ).format(randInt1, itemName,randInt2, guestsNum, itemName)

            answer = int((randInt1/guestsNum)*(guestsNum-1))

        return {"q": q, "ans": answer, "type": "mixed"}
