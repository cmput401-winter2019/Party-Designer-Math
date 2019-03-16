from random import randint
from math import ceil

class QuestionGenerator():
    def __init__(self, itemType, itemUnit, itemName, itemPluralName, itemCost, numberOfGuests, level):
        self.itemType = itemType
        self.itemName = itemName
        self.itemPlurName = itemPluralName
        self.itemUnit = itemUnit
        self.itemCost = int(itemCost)
        self.guestsNum = int(numberOfGuests)
        self.level = int(level)

        if (self.level <= 3):
            self.multcap = 5   
            self.addcap = 25    
        elif (self.level <= 6):
            self.multcap = 7
            self.addcap = 50 
        else:
            self.multcap = 9
            self.addcap = 50 
        
        self.divcap = self.multcap**2
        self.subcap = self.addcap*2
       
    def generate(self):
        if (self.itemType == "furniture"):
            return self.randFurnitureQ()
        elif (self.itemType == "food"):
            return self.randFoodQ()
        elif (self.itemType == "deco"):
            return self.randDecorQ()
        elif (self.itemType == "kiddie"):
            return self.randKiddieQ()
        elif(self.itemType == "refund"):
            return self.randMixedQ()
    
    def randFurnitureQ(self):
        randQNum = randint(1, 3)
        q = ""
        answer = 0
        if (randQNum == 1):
            randInt = randint(0, self.itemCost-1)
            q = ("Your friend wants to buy a {0} that costs {1} dollars. \nIf your friend has a 'take {2} dollar{plural} off' coupon,\n"
            "what is the new cost that she has to pay?").format(self.itemName, self.itemCost, str(randInt), plural="s" if randInt>1 else "")

            answer = self.itemCost-randInt

        elif(randQNum == 2):
            randInt = randint(2, self.subcap)
            boughtInt = randint(1, randInt-1)
            q = ("If there were {} {} currently being sold at the store, \nbut a man came and bought {}. "
                "\nHow many {} are left in the store?").format(str(randInt), self.itemPlurName, str(boughtInt), self.itemPlurName)
            
            answer = randInt - boughtInt
        
        elif(randQNum == 3):
            randInt = randint(2, self.subcap)
            lostInt = randint(1, randInt-1)
            q = ("If your school bought {} {}, but accidentally lost {}, \nhow many {} "
            "does your school have left?").format(str(randInt), self.itemPlurName, str(lostInt), self.itemPlurName)

            answer = randInt - lostInt
        return {"q": q, "ans": answer}

    def randDecorQ(self):
        randQNum = randint(1, 3)
        q = ""
        answer = 0

        if (randQNum == 1):
            randInt1 = randint(2, self.addcap)
            randInt2 = randint(2, self.addcap)
            q = ("There were {} {} on the store shelf. \nIf the manager came and put {} more {} on the shelf,\n"
                "how many {} are there on the shelf now?").format(str(randInt1), self.itemPlurName, str(randInt2), self.itemPlurName, self.itemPlurName)

            answer = randInt1 + randInt2

        elif(randQNum == 2):
            randInt1 = randint(2, self.addcap)
            randInt2 = randint(2, self.addcap)
            q = ("If you bought {} {} and your friend bought {} {}, \n"
                "how many {} did you and your friend bought in total?").format(str(randInt1), self.itemPlurName, str(randInt2), self.itemPlurName, self.itemPlurName)
            
            answer = randInt1 + randInt2
        
        elif(randQNum == 3):
            randInt1 = randint(2, self.addcap)
            q = ("One {} costs {} dollars. One bookmark costs {} dollars.\n"
                "If Bob bought one of each how much money did he spent in total?" ).format(self.itemName, str(self.itemCost), randInt1)
            
            answer = randInt1 + self.itemCost

        return {"q": q, "ans": answer}
    
    def randFoodQ(self):
        randQNum = randint(1, 3)
        q = ""
        answer = 0

        if (randQNum == 1):
            numOfPeople = self.guestsNum+1
            randInt1 = randint(2, self.multcap)
            q = ("There are {} persons in your party (including yourself).\n"
                "If you bought {} {} of {} for your party and want to split them evenly. \n"
                "How many {} of {} should each person get?").format(str(numOfPeople), numOfPeople*randInt1, self.itemUnit, self.itemName, self.itemUnit, self.itemName)

            answer = randInt1

        elif(randQNum == 2):
            numOfPeople = self.guestsNum+1
            randInt1 = randint(2, self.multcap)
            cost = numOfPeople * randInt1
            q = ("There are {} persons in your party (including yourself).\n"
                "If you bought {} with a TOTAL cost of {} dollars, \n"
                "how much did it cost you per person?").format(str(numOfPeople), self.itemPlurName, str(cost))

            answer = randInt1
        
        elif(randQNum == 3):
           numOfPeople = self.guestsNum+1
           randInt1 = randint(2, self.multcap)*randint(2, self.multcap)
           q = ("There are {} persons in your party (including yourself).\n"
                "If you bought {} {} of {} for your party and splitted the {} \n"
                "evenly among you and your friends. \n"
                "How many {} of {} were left over?").format(str(numOfPeople), randInt1, self.itemUnit, self.itemName, self.itemUnit, self.itemUnit, self.itemName)

           answer = randInt1%numOfPeople

        return {"q": q, "ans": answer}

    def randKiddieQ(self):
        randQNum = randint(1, 3)
        q = ""
        answer = 0

        if (randQNum == 1):
             q = ("A {} costs {} dollars each. If you bought a {} for each of \n"
                 "your {} guests, how much did it cost you in total?").format(self.itemName, self.itemCost, self.itemName, self.guestsNum)

             answer = self.itemCost*self.guestsNum

        elif (randQNum == 2):
            randInt1 = randint(2, self.multcap)
            randInt2 = randint(2, self.multcap)
            q = ("A box contains {} {}. If you have {} boxes, "
            "\nhow many {} do you have in total?").format(randInt1, self.itemPlurName, randInt2, self.itemPlurName)

            answer = randInt1*randInt2

        elif (randQNum == 3):
            randInt1 = randint(2, self.multcap)
            randInt2 = randint(2, self.multcap)
            q = ("In a store, there are {} shelves where {} are placed. \n"
                "Each shelf contains {} {}. \n"
                "How many {} does the store have in total?").format(randInt1, self.itemPlurName, randInt2, self.itemPlurName, self.itemPlurName)
            
            answer = randInt1*randInt2

        return {"q": q, "ans": answer}

    def randMixedQ(self):
        randQNum = randint(1, 3)
        q = ""
        answer = 0

        if (randQNum == 1):
            randInt1 = randint(2, self.multcap)
            randInt2 = randint(2, self.multcap)
            cost1 =  randint(2, self.multcap-4)
            cost2 =  randint(2, self.multcap-4)
            q = ("Suppose you bought {} {} costing {} dollars each, and"
                "\none of your parents bought {} {} costing {} dollars each." 
                "\nIf you were to divide the {} evenly among your {} guests for "
                "\ntheir kiddie bags, how much did one kiddie bag cost your family?").format(self.guestsNum*randInt1, self.itemPlurName, cost1, 
                    self.guestsNum*randInt2, self.itemPlurName, cost2,
                    self.itemPlurName, self.guestsNum)
            answer = randInt1*cost1+randInt2*cost2
        
        elif (randQNum == 2):
            randInt1 = randint(2, self.multcap)
            randInt2 = randint(2, self.multcap)
            q = ("A box contains {} {}. How many boxes of {} do you need"
            "\nso that all of your {} guests can have {} {} each?").format(randInt1, self.itemPlurName, self.itemPlurName, self.guestsNum, randInt2, self.itemPlurName)

            answer = ceil((self.guestsNum*randInt2)/randInt1)

        elif (randQNum == 3):
            randInt1 = randint(2, self.multcap)*self.guestsNum
            randInt2 = randint(2, self.multcap)
            q = ("You bought {} {} stickers costing at {} dollars each to split evenly \n"
                "among your {} guests, but your friend Mary could not make it to the \n" 
                "party, so you went back to the store and got a refund for her share.\n"
                "How much did you spend on the {} stickers in total (after the refund)?"
                ).format(randInt1, self.itemName,randInt2, self.guestsNum, self.itemName)

            answer = int((randInt1/self.guestsNum)*(self.guestsNum-1))
        
        return {"q": q, "ans": answer}

# def main():
#     #qGen = QuestionGenerator("furniture", "N/A", "chair", "chairs", "15","4", 7)
#     #qGen = QuestionGenerator("food", "slices", "cake", "cakes", "6", 3, 5)
#     #qGen = QuestionGenerator("deco", "set", "wall hanger", "wall hangers", 7, 3, "5")
#     #qGen = QuestionGenerator("kiddie", "set", "telescope", "telescopes", 18, 7, 6)
#     qGen = QuestionGenerator("refund", "set", "telescope", "telescopes", 15, 7, 6)
#     returned = qGen.generate()
#     print()
#     print(returned["q"])
#     print(returned["ans"])
#     print()

# main()




