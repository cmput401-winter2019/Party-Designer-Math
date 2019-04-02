from flask_sqlalchemy import SQLAlchemy
from passlib.hash import pbkdf2_sha256 as sha256

db = SQLAlchemy()

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    classCode = db.Column(db.String(5))
    email = db.Column(db.String(20), unique=True, nullable=False)
    currentLevel = db.Column(db.Integer)

    gameStateRel = db.relationship("GameState", backref ="student", uselist=False)
    playthroughRel = db.relationship("Playthrough", backref ="student")

    def __init__(self, firstName, lastName, username, password, email,classCode):
        self.firstName = firstName
        self.lastName = lastName
        self.username = username
        self.password = password
        self.email = email
        self.classCode = classCode
    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)
    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)

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
    question = db.Column(db.String(20))
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
    def is_jti_blacklisted(cls):
        query = cls.query.all()
        all_jti = [jti.jti for jti in query]
        return all_jti

class Playthrough(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.Integer)
    studentId = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)

    questionHistoryRel = db.relationship("QuestionHistory", backref ="playthrough")

    def __init__(self, level, studentId):
        self.level = level
        self.studentId = studentId

class QuestionHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(20))
    answer = db.Column(db.Float)
    arithmeticType = db.Column(db.String(20))
    correct = db.Column(db.Boolean)
    playthroughId = db.Column(db.Integer, db.ForeignKey('playthrough.id'), nullable=False)

    def __init__(self, question, answer, arithmeticType, correct, playthroughId):
        self.question = question
        self.answer = answer
        self.arithmeticType = arithmeticType
        self.correct = correct
        self.playthroughId = playthroughId

class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    classCode = db.Column(db.String(5), unique=True, nullable=False)
    email = db.Column(db.String(20), unique=True, nullable=False)

    def __init__(self, firstName, lastName, username, password, classCode, email):
        self.firstName = firstName
        self.lastName = lastName
        self.username = username
        self.password = password
        self.classCode = classCode
        self.email = email

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)
    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)
