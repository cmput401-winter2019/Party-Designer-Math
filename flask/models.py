from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)
    classCode = db.Column(db.String(5))

    gameStateRel = db.relationship("GameState", backref ="student", uselist=False)

    def __init__(self, name, classCode):
        self.name = name
        self.classCode = classCode

class GameState(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    money = db.Column(db.Integer)
    numOfGuests = db.Column(db.Integer)
    studentId = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False, unique=True)

    bagItemRel = db.relationship("BagItem", backref ="game_state")
    canvasItemRel = db.relationship("CanvasItem", backref ="game_state")
    questionRel = db.relationship("Question", backref ="game_state")

    def __init__(self, money, numOfGuests, studentId):
        self.money = money
        self.numOfGuests = numOfGuests
        self.studentId = studentId

class BagItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    itemName = db.Column(db.String(20), unique=True)
    itemAmount = db.Column(db.Integer)
    gameStateId = db.Column(db.Integer, db.ForeignKey('game_state.id'), nullable=False)

    def __init__(self, itemName, itemAmount, gameStateId):
        self.itemName = itemName
        self.itemAmount = itemAmount
        self.gameStateId = gameStateId

class CanvasItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    itemName = db.Column(db.String(20), unique=True)
    itemAmount = db.Column(db.Integer)
    gameStateId = db.Column(db.Integer, db.ForeignKey('game_state.id'), nullable=False)

    def __init__(self, itemName, itemAmount, gameStateId):
        self.itemName = itemName
        self.itemAmount = itemAmount
        self.gameStateId = gameStateId

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(20), unique=True)
    answer = db.Column(db.Float)
    arithmeticType = db.Column(db.String(20))
    correct = db.Column(db.Boolean)
    gameStateId = db.Column(db.Integer, db.ForeignKey('game_state.id'), nullable=False)

    def __init__(self, question, answer, arithmeticType, gameStateId):
        self.question = question
        self.answer = answer
        self.arithmeticType = arithmeticType
        self.gameStateId = gameStateId

class RevokedToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(250), unique=True, nullable=False)

    def __init__(self, jti):
        self.jti = jti

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter(jti == jti).first()
        return bool(query)

