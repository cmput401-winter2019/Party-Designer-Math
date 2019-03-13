from flask import Flask, request, jsonify
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from serializers import StudentSerializer, GameStateSerializer, ma
from models import Student, GameState, Bag, db
import os, sys
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection

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

#create serializer for gamestate
gameStateSerializer = GameStateSerializer()
gameStatesSerializer = GameStateSerializer(many=True)

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
    print(result.data)
    return jsonify(result.data)

if __name__ == '__main__':
    if len(sys.argv) > 2:
        manager.run()
    app.run(debug=True, port=5001)