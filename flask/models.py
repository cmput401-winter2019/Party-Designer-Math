from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)
    classCode = db.Column(db.String(5))
    gamestate = db.relationship("GameState", backref ="student", uselist=False)

    def __init__(self, name, classCode):
        self.name = name
        self.classCode = classCode

class GameState(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    money = db.Column(db.Integer)
    numOfGuests = db.Column(db.Integer)
    studentId = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False, unique=True)

    def __init__(self, money, numOfGuests, studentId):
        self.money = money
        self.numOfGuests = numOfGuests
        self.studentId = studentId

class Bag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    itemName = db.Column(db.String(20), unique=True)
    itemAmount = db.Column(db.String(5), unique=True)

    def __init__(self, itemName, itemAmount):
        self.itemName = itemName
        self.itemAmount = itemAmount