from random import randint
from math import ceil,floor
from question_list import addition, subtraction, multiplication, division, mixed

class QuestionGenerator():
    def __init__(self, itemType, itemUnit, itemName, itemPluralName, itemCost, numberOfGuests, level, question_num):
        self.itemType = itemType
        self.itemName = itemName
        self.itemPlurName = itemPluralName
        self.itemUnit = int(itemUnit)
        self.itemCost = int(itemCost)
        self.guestsNum = int(numberOfGuests)
        self.level = int(level)
        self.question_num = int(question_num)

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

        add_q    = addition         (self.itemCost, self.itemUnit, self.itemPlurName, self.addcap,  self.itemName)
        sub_q    = subtraction      (self.itemCost, self.itemUnit, self.itemPlurName, self.subcap,  self.itemName)
        mult_q   = multiplication   (self.itemCost, self.itemUnit, self.itemPlurName, self.multcap, self.itemName)
        div_q    = division         (self.itemCost, self.itemUnit, self.itemPlurName, self.multcap, self.itemName, self.guestsNum)
        mix_q    = mixed            (self.itemCost, self.itemUnit, self.itemPlurName, self.multcap, self.itemName, self.guestsNum)

        if(self.question_num == 1):
            return addition(self.itemCost, self.itemUnit, self.itemPlurName, self.addcap,  self.itemName)
        elif(self.question_num == 2):
            return subtraction(self.itemCost, self.itemUnit, self.itemPlurName, self.subcap,  self.itemName)
        elif(self.question_num == 3):
            return multiplication(self.itemCost, self.itemUnit, self.itemPlurName, self.multcap, self.itemName)
        elif(self.question_num == 4):
            return division(self.itemCost, self.itemUnit, self.itemPlurName, self.multcap, self.itemName, self.guestsNum)
        elif(self.question_num == 5):
            return mixed(self.itemCost, self.itemUnit, self.itemPlurName, self.multcap, self.itemName, self.guestsNum)
