from flask import Flask, request, jsonify
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from serializers import StudentSerializer, GameStateSerializer, BagItemSerializer, CanvasItemSerializer, QuestionSerializer, ma
from models import Student, GameState, BagItem, CanvasItem, Question, db
import os, sys
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection
from questiongen import QuestionGenerator

# create app
app = Flask(__name__)

# set path and initialize db and serializer
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'crud.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)
ma.init_app(app)

# turn on foreign key constraints
@event.listens_for(Engine, "connect")
def _set_sqlite_pragma(dbapi_connection, connection_record):
        if isinstance(dbapi_connection, SQLite3Connection):
            cursor = dbapi_connection.cursor()
            cursor.execute("PRAGMA foreign_keys=ON;")
            cursor.close()


# create serializers for student(s)
studentSerializer = StudentSerializer()
studentsSerializer = StudentSerializer(many=True)

# create serializer for game state(s)
gameStateSerializer = GameStateSerializer()
gameStatesSerializer = GameStateSerializer(many=True)

# create serializer for bag item(s)
bagItemSerializer = BagItemSerializer()
bagItemsSerializer = BagItemSerializer(many=True)

# create serializer for canvas item(s)
canvasItemSerializer = BagItemSerializer()
canvasItemsSerializer = BagItemSerializer(many=True)

# create serializer for question(s)
questionSerializer = QuestionSerializer()
questionsSerializer = QuestionSerializer(many=True)

# endpoint to create new student
@app.route("/student", methods=["POST"])
def add_student():
    try:
        name = request.json['name']
        classCode = request.json['classCode']
        
        newStudent = Student(name, classCode)

        db.session.add(newStudent)
        db.session.commit()

        return jsonify(success=True), 201
    except Exception as e:
        print(e)
        return jsonify(success=False), 403

# endpoint to show all students
@app.route("/student", methods=["GET"])
def get_student():
    allStudents = Student.query.all()
    result = studentsSerializer.dump(allStudents)
    return jsonify(result.data)

# endpoint to create game state for student
@app.route("/<id>/gamestate", methods=["POST"])
def add_gamestate(id):
    try:
        money = request.json['money']
        numOfGuests = request.json['numOfGuests']
        studentId = id
        
        newGameState = GameState(money, numOfGuests, studentId)

        db.session.add(newGameState)
        db.session.commit()

        return jsonify(success=True), 201
    except Exception as e:
        print(e)
        return jsonify(success=False), 403

# endpoint to show game state of student
@app.route("/<id>/gamestate", methods=["GET"])
def get_gamestate(id):
    gameState = GameState.query.filter(GameState.studentId == id).first()
    result = gameStateSerializer.dump(gameState)
    return jsonify(result.data)

# endpoint to create bag item for game state
@app.route("/<id>/bagitem", methods=["POST"])
def add_bagitem(id):
    try:
        itemName = request.json['itemName']
        itemAmount = request.json['itemAmount']
        gameStateId = id
        
        newBagItem = BagItem(itemName, itemAmount, gameStateId)

        db.session.add(newBagItem)
        db.session.commit()

        return jsonify(success=True), 201
    except Exception as e:
        print(e)
        return jsonify(success=False), 403

# endpoint to show bag items of game state
@app.route("/<id>/bagitem", methods=["GET"])
def get_bagitems(id):
    bagItems = BagItem.query.filter(BagItem.gameStateId == id).all()
    result = bagItemsSerializer.dump(bagItems)
    return jsonify(result.data)

# endpoint to create canvas item for game state
@app.route("/<id>/bagitem", methods=["POST"])
def add_canvasitem(id):
    try:
        itemName = request.json['itemName']
        itemAmount = request.json['itemAmount']
        gameStateId = id
        
        newCanvasItem = CanvasItem(itemName, itemAmount, gameStateId)

        db.session.add(newCanvasItem)
        db.session.commit()

        return jsonify(success=True), 201
    except Exception as e:
        print(e)
        return jsonify(success=False), 403

# endpoint to show canvas items of game state
@app.route("/<id>/bag", methods=["GET"])
def get_canvasitems(id):
    canvasItems = CanvasItem.query.filter(CanvasItem.gameStateId == id).all()
    result = canvasItemsSerializer.dump(canvasItems)
    return jsonify(result.data)

# endpoint to create question for game state
@app.route("/<id>/question", methods=["POST"])
def add_question(id):
    try:
        itemType = request.json['itemType']
        itemUnit = request.json['itemUnit']
        itemName = request.json['itemName']
        itemPluralName = request.json['itemPluralName']
        itemCost = request.json['itemCost']
        numberOfGuests = request.json["numberOfGuests"]
        level = request.json['level']

        questionGenerator = QuestionGenerator(itemType, itemUnit, itemName, itemPluralName, itemCost, numberOfGuests, level)
        questionData = questionGenerator.generate()

        question = questionData['q']
        answer = questionData['ans']
        arithmeticType = questionData['type']
        gameStateId = id
        
        newQuestion = Question(question, answer, arithmeticType, gameStateId)

        db.session.add(newQuestion)
        db.session.commit()

        return jsonify(success=True), 201
    except Exception as e:
        print(e)
        return jsonify(success=False), 403

# endpoint to show question of game state
@app.route("/<id>/question", methods=["GET"])
def get_question(id):
    questions = Question.query.filter(Question.gameStateId == id).all()
    result = questionsSerializer.dump(questions)
    return jsonify(result.data)


if __name__ == '__main__':
    if len(sys.argv) > 2:
        manager.run()
    app.run(debug=True, port=5001)