from flask import Flask, request, jsonify, render_template
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from serializers import StudentSerializer, GameStateSerializer, BagItemSerializer, CanvasItemSerializer, QuestionSerializer, TeacherSerializer, ma, PlaythroughSerializer, QuestionHistorySerializer, ShoppingListItemSerializer
from models import Student, GameState, BagItem, CanvasItem, Question, RevokedToken, Teacher, db, QuestionHistory, Playthrough, ShoppingListItem
import os, sys
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.sql import exists
from sqlite3 import Connection as SQLite3Connection
from questiongen import QuestionGenerator
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt
from datetime import timedelta
from flask_cors import CORS
import random
import string
from shoppinglistgen import ShoppingListGenerator

# sources   : https://codeburst.io/jwt-authorization-in-flask-c63c1acf4eeb
#           : https://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits-in-python

# create app

app = Flask(__name__)

# set path and initialize db, serializer, and JWT
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'crud.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'not-so-secret'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
db.init_app(app)
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)
ma.init_app(app)
jwt = JWTManager(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  return response

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

#create serializer for playthrough(s)
playthroughSerializer = PlaythroughSerializer()
playthroughsSerializer = PlaythroughSerializer(many=True)


#create serializer for questionhistory(s)
questionHistorySerializer = QuestionHistorySerializer()
questionsHistorySerializer = QuestionHistorySerializer(many=True)

teachersSerializer = TeacherSerializer(many=True)

#create serializer for shopping list item(s)
shoppingListItemSerializer = ShoppingListItemSerializer()
shoppingListItemsSerializer = ShoppingListItemSerializer(many=True)

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    all_jti = RevokedToken.is_jti_blacklisted()
    return jti in all_jti

# endpoint to login student and issue access token
@app.route("/signup", methods=["POST"])
def signup():
    try:
        signupType = request.json['signupType']
        if (signupType == 'Student'):
            firstName = request.json['firstName']
            lastName = request.json['lastName']
            username = request.json['username']
            password = Student.generate_hash(request.json['password'])
            email = request.json['email']
            classCode = request.json['classCode']

            student = Student.query.filter(Student.username == username).first()

            if (student):
                return jsonify(message="Username is taken"), 403

            newStudent = Student(firstName, lastName, username, password, email, classCode)

            db.session.add(newStudent)
            db.session.commit()

            return jsonify(message="Registered"), 200
        elif (signupType == 'Teacher'):
            firstName = request.json['firstName']
            lastName = request.json['lastName']
            username = request.json['username']
            password = Teacher.generate_hash(request.json['password'])
            email = request.json['email']

            teacher = Teacher.query.filter(Teacher.username == username).first()

            if (teacher):
                return jsonify(message="Username is taken"), 403

            while (True):
                randomClassCode = ''.join(random.sample(string.ascii_uppercase + string.digits, k=5))
                if (not Teacher.query.filter(Teacher.classCode == randomClassCode).first()):
                    break

            newTeacher = Teacher(firstName, lastName, username, password, randomClassCode,email)

            db.session.add(newTeacher)
            db.session.commit()

            return jsonify(message="Registered"), 200

    except Exception as e:
        print(e)
        return jsonify(message="Something went wrong."), 403

# endpoint to logout student and revoke access token
@app.route("/logout", methods=["POST"])
@jwt_required
def logout():
    try:
        jti = get_raw_jwt()['jti']

        revokedAccessToken = RevokedToken(jti)

        db.session.add(revokedAccessToken)
        db.session.commit()
        return jsonify(message="Access token and refresh token has been revoked. User has been logged out."), 200
    except Exception as e:
        print(e)
        return jsonify(message="Something went wrong."), 403

# endpoint to login student and issue access token
@app.route("/login", methods=["POST"])
def login():
    try:
        loginType = request.json['loginType']
        if (loginType == "Student"):
            username = request.json['username']
            password = request.json['password']
            student = Student.query.filter(Student.username == username).first()

            if (not student):
                return jsonify(message="User does not exist."), 403

            if (Student.verify_hash(password, student.password)):
                access_token = create_access_token(identity = student.id, expires_delta=timedelta(days=1))
                refresh_token = create_refresh_token(identity = student.id, expires_delta=timedelta(days=1))
                return jsonify(message="Logged in", access_token=access_token, refresh_token=refresh_token), 200
            else:
                return jsonify(message="Incorrect password."), 403

        elif (loginType == "Teacher"):
            username = request.json['username']
            password = request.json['password']
            teacher = Teacher.query.filter(Teacher.username == username).first()

            if (not teacher):
                return jsonify(message="User does not exist."), 403

            if (Teacher.verify_hash(password, teacher.password)):
                access_token = create_access_token(identity = teacher.id)
                refresh_token = create_refresh_token(identity = teacher.id, expires_delta=timedelta(days=1))
                return jsonify(message="Logged in", access_token=access_token, refresh_token=refresh_token), 200
            else:
                return jsonify(message="Incorrect password."), 403

    except Exception as e:
        print(e)
        return jsonify(message="Something went wrong."), 403

# endpoint refresh token
@app.route("/refresh", methods=["POST"])
@jwt_refresh_token_required
def refresh():
    try:
        name = get_jwt_identity()
        access_token = create_access_token(identity = name)
        return jsonify(access_token=access_token), 200
    except Exception as e:
        print(e)
        return jsonify(message="Invalid refresh token."), 403

# endpoint to show all students
@app.route("/valid", methods=["GET"])
@jwt_required
def verify():
    return jsonify()


# endpoint to show all teachers for testing
@app.route("/allteachers", methods=["GET"])
#@jwt_required
def get_teachers():
    allTeachers = Teacher.query.all()
    result = teachersSerializer.dump(allTeachers)
    return jsonify(result.data)

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
@app.route("/student/<name>", methods=["GET"])
#@jwt_required
def get_student(name):
    if(name=="all"):
        allStudents = Student.query.all()
        result = studentsSerializer.dump(allStudents)
        return jsonify(result.data)
    else:
        current_student = Student.query.filter(Student.username == name).first()
        result = studentSerializer.dump(current_student)
        return jsonify(result.data)

# endpoint to create game state for student
@app.route("/gamestate", methods=["GET"])
@jwt_required
def initialize_gamestate():
    try:
        studentId = get_jwt_identity()
        gamestate = GameState.query.filter(GameState.studentId == studentId).first()
        if(gamestate):
            result = gameStateSerializer.dump(gamestate)
            result.data["message"] = "Gamestate already exists"
            return jsonify(result.data), 200

        student = Student.query.filter(Student.id == studentId).first()
        currentLevel = student.currentLevel
        if (currentLevel <= 3):
            money = 1000
            numOfGuests = random.randrange(3, 5, 1)
        elif (currentLevel <= 6):
            money = 1500
            numOfGuests = random.randrange(5, 8, 1)
        else:
            money = 2000
            numOfGuests = random.randrange(7, 10, 1)

        newGameState = GameState(money, numOfGuests, studentId)

        db.session.add(newGameState)
        db.session.commit()

        gamestate = GameState.query.filter(GameState.studentId == studentId).first()
        result = gameStateSerializer.dump(gamestate)
        result.data["message"] = "Gamestate created"

        return jsonify(result.data), 201
    except Exception as e:
        print(e)
        return jsonify(message="Could not create gamestate"), 403

# endpoint to create game state for student
@app.route("/gamestate/update", methods=["PUT"])
@jwt_required
def update_gamestate():
    try:
        studentId = get_jwt_identity()
        gamestate = GameState.query.filter(GameState.studentId == studentId).first()
        updateType = request.json['updateType']
        updateValue = request.json['updateValue']
        print(updateType, updateValue)
        if (updateType == "theme"):
            gamestate.theme = updateValue
            db.session.commit()

        elif(updateType == "invitation"):
            gamestate.designedInvitation = updateValue
            db.session.commit()
        elif(updateType == "money"):
            gamestate.money = updateValue
            db.session.commit()

        result = gameStateSerializer.dump(gamestate)
        result.data["message"] = "Gamestate value updated"
        return jsonify(result.data), 200
    except Exception as e:
        print(e)
        return jsonify(message="Could not update gamestate"), 403


# endpoint to get shopping list
@app.route("/shoppinglist", methods=["POST"])
@jwt_required
def initialize_shoppinglist():
    try:
        theme = request.json['theme']

        studentId = get_jwt_identity()
        gamestateId = GameState.query.filter(GameState.studentId == studentId).first().id
        shoppingListItems = ShoppingListItem.query.filter(ShoppingListItem.gameStateId == gamestateId).all()

        if (len(shoppingListItems) == 20):
            result = shoppingListItemsSerializer.dump(shoppingListItems)
            return jsonify(result.data), 200

        elif (len(shoppingListItems) == 0):
            shoppingListGenerator = ShoppingListGenerator()
            itemsList = shoppingListGenerator.generateItems(theme)

            for i in range(20):
                shoppingListItem = ShoppingListItem(itemsList[i], gamestateId)
                db.session.add(shoppingListItem)
                db.session.commit()

            shoppingListItems = ShoppingListItem.query.filter(ShoppingListItem.gameStateId == gamestateId).all()
            result = shoppingListItemsSerializer.dump(shoppingListItems)
            return jsonify(result.data), 200

        else:
            return jsonify(message="Could not create shopping list items"), 403

    except Exception as e:
        print(e)
        return jsonify(message="Could not create shopping list items"), 403

# endpoint to create bag item for game state
@app.route("/<id>/bagitem", methods=["POST"])
@jwt_required
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
@jwt_required
def get_bagitems(id):
    bagItems = BagItem.query.filter(BagItem.gameStateId == id).all()
    result = bagItemsSerializer.dump(bagItems)
    return jsonify(result.data)

# endpoint to create canvas item for game state
@app.route("/<id>/bagitem", methods=["POST"])
@jwt_required
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
@jwt_required
def get_canvasitems(id):
    canvasItems = CanvasItem.query.filter(CanvasItem.gameStateId == id).all()
    result = canvasItemsSerializer.dump(canvasItems)
    return jsonify(result.data)

@app.route("/createquestionhistory", methods=["POST"])
def createquestionhistory():
    try:
        question            = request.json['question']
        answer              = request.json['answer']
        arithmeticType      = request.json['arithmeticType']
        correct             = request.json['correct']
        playthroughid       = request.json['playthroughId']

        newquestionhistory = QuestionHistory(question,answer,arithmeticType,correct,playthroughid)

        db.session.add(newquestionhistory)
        db.session.commit()

        return jsonify(message="questionhistory created"), 200

    except Exception as e:
        print(e)
        return jsonify(message="Something went wrong"), 403


# endpoint to create question for game state
@app.route("/<id>/question", methods=["POST"])
@jwt_required
def add_question(id):
    try:
        itemType            = request.json['itemType']
        itemUnit            = request.json['itemUnit']
        itemName            = request.json['itemName']
        itemPluralName      = request.json['itemPluralName']
        itemCost            = request.json['itemCost']
        numberOfGuests      = request.json["numberOfGuests"]
        level               = request.json['level']
        question_num        = request.json['question_num']

        questionGenerator = QuestionGenerator(itemType, itemUnit, itemName, itemPluralName, itemCost, numberOfGuests, level, question_num)
        questionData = questionGenerator.generate()
        # print(questionData, file=sys.stderr)
        question = questionData['q']
        answer = questionData['ans']
        arithmeticType = questionData['type']
        gameStateId = id

        newQuestion = Question(question, answer, arithmeticType, gameStateId)
        db.session.add(newQuestion)
        db.session.commit()

        return jsonify(question=question, type=arithmeticType), 200
    except Exception as e:
        print(e)
        return jsonify(success=False), 403


# endpoint to show question of game state
@app.route("/<id>/question", methods=["GET"])
#@jwt_required
def get_question(id):
    questions = Question.query.filter(Question.gameStateId == id).all()
    result = questionsSerializer.dump(questions)
    return jsonify(result.data)

@app.route("/<id>/shoppinglist", methods=["GET"])
#@jwt_required
def get_shoppinglist(id):
    shoppinglist = ShoppingListItem.query.filter(ShoppingListItem.gameStateId == id).all()
    result = shoppingListItemsSerializer.dump(shoppinglist)
    return jsonify(result.data)

# endpoint to update question for game state
@app.route("/<id>/question", methods=["PUT"])
@jwt_required
def check_answer_question(id):
    try:
        answer = int(request.json['answer'])
        get_question = request.json['question']
        question = Question.query.filter(Question.question == get_question).first()
        #question = Question.query.filter(Question.gameStateId == id).first()
        # print((answer,question.answer, question.question), file=sys.stderr)
        if (answer != question.answer):
            question.correct = False
            db.session.commit()
            return jsonify(message="Answer is incorrect."), 200

        question.correct = True
        db.session.commit()
        return jsonify(message="Answer is correct."), 200
    except Exception as e:
        print(e)
        return jsonify(success=False), 403

# endpoint to update question for game state
@app.route("/updateshoppinglist", methods=["PUT"])
@jwt_required
def update_shoppinglist():
    try:
        id = int(request.json['id'])

        shoppinglist = ShoppingListItem.query.filter(ShoppingListItem.id == id).first()

        shoppinglist.completed = True;

        db.session.commit()
        return jsonify(message="Update Success."), 200
    except Exception as e:
        print(e)
        return jsonify(success=False), 403


@app.route("/dropquestion", methods=["PUT"])
def drop_question():
    try:
        gs_id = request.json['gs_id']
        db.session.query(Question).filter(Question.gameStateId==gs_id).delete()

        db.session.commit()

        return jsonify(success=True), 200
    except Exception as e:
        print(e)
        return jsonify(success=False), 403

@app.route("/geteacherinfo", methods=["GET"])
@jwt_required
def get_teacherinfo():
    try:
        teacherId = get_jwt_identity()
        teacher = Teacher.query.filter(Teacher.id == teacherId).first()
        teacherName = teacher.firstName
        classCode = teacher.classCode
        return jsonify(teacherName=teacherName, classCode=classCode), 200
    except Exception as e:
        print(e)
        return jsonify(success=False), 403

@app.route("/dropshoppinglist", methods=["PUT"])
def drop_shoppinglist():
    try:
        gs_id = request.json['gs_id']
        db.session.query(ShoppingListItem).filter(ShoppingListItem.gameStateId==gs_id).delete()

        db.session.commit()

        return jsonify(success=True), 200
    except Exception as e:
        print(e)
        return jsonify(success=False), 403



# endpoint to get user stats
###############################################################################################
@app.route("/<classcode>/stats",methods=["GET"])
def get_stats(classcode):



    studentslist = Student.query.filter(Student.classCode == classcode)
    allstudents = []
    # list of student objects with the classcode

    for each in studentslist:
        studentdict = {}
        studentdict["username"] = each.username
        studentdict["fullname"] = each.firstName + " " + each.lastName

        #for each student object find the playthroughs associated with the student id
        playthroughlist = Playthrough.query.filter(Playthrough.studentId == each.id)
        arithtotaldict = {"addition": 0, "subtraction": 0, "multiplication": 0, "division": 0, "mixed": 0}
        studentcorrectdict = {"addition": 0, "subtraction": 0, "multiplication": 0, "division": 0, "mixed": 0}
        studentratedict = {"addition": 0, "subtraction": 0, "multiplication": 0, "division": 0, "mixed": 0}
        for playthrough in playthroughlist:
            #For each playthrough find the questions assocaited with the playthrough id
            questionlist = QuestionHistory.query.filter(QuestionHistory.playthroughId == playthrough.id)

            for question in questionlist:
                if question.arithmeticType == "addition":
                    arithtotaldict["addition"] +=1
                    if question.correct:
                        studentcorrectdict["addition"] +=1
                if question.arithmeticType == "subtraction":
                    arithtotaldict["subtraction"] += 1
                    if question.correct:
                        studentcorrectdict["subtraction"] += 1

                if question.arithmeticType == "multiplication":
                    arithtotaldict["multiplication"] += 1
                    if question.correct:
                        studentcorrectdict["multiplication"] += 1

                if question.arithmeticType == "division":
                    arithtotaldict["division"] += 1
                    if question.correct:
                        studentcorrectdict["division"] += 1
                if question.arithmeticType == "mixed":
                    arithtotaldict["mixed"] += 1
                    if question.correct:
                        studentcorrectdict["mixed"] += 1


            for key,value in arithtotaldict.items():
                if value == 0 :
                    studentratedict[key] = 0
                else:
                    studentratedict[key] = (studentcorrectdict[key]/arithtotaldict[key])*100
            # studentratedict["addition"] = studentcorrectdict["addition"]/arithtotaldict["addition"]
            # studentratedict["subtraction"] = studentcorrectdict["subtraction"] / arithtotaldict["subtraction"]
            # studentratedict["multiplication"] = studentcorrectdict["multiplication"] / arithtotaldict["multiplication"]
            # studentratedict["division"] = studentcorrectdict["division"] / arithtotaldict["division"]
            # studentratedict["mixed"] = studentcorrectdict["mixed"] / arithtotaldict["mixed"]


        studentdict["stats"] = studentratedict
        allstudents.append(studentdict)
    return jsonify(allstudents), 200

@app.route("/createstudent", methods=["POST"])
def createstudent():
    try:
        firstName = request.json['firstName']
        lastName = request.json['lastName']
        username = request.json['username']
        password = Student.generate_hash(request.json['password'])
        email = request.json['email']
        classCode = request.json['classCode']


        student = Student.query.filter(Student.username == username).first()

        if (student):
            return jsonify(message="Student exists"), 200

        newStudent = Student(firstName, lastName, username, password, email,classCode)


        db.session.add(newStudent)
        db.session.commit()

        return jsonify(message="Student created"), 200

    except Exception as e:
        print(e)
        return jsonify(message="Something went wrong"), 403

@app.route("/createteacher",methods=["POST"])
def createteacher():
	try:
		firstName = request.json['firstName']
		lastName = request.json['lastName']
		username = request.json['username']
		password = Teacher.generate_hash(request.json['password'])
		email = request.json['email']
		teacher = Teacher.query.filter(Teacher.username == username).first()

		if (teacher):
			return jsonify(message="Username is taken"), 403


		randomClassCode = ''.join(random.sample(string.ascii_uppercase + string.digits, k=5))

		#newTeacher = Teacher(firstName, lastName, username, password, radnomClassCode, email)

		#db.session.add(newTeacher)
		#db.session.commit()

		return jsonify(message="Registered"), 200

	except Exception as e:
		print(e)
		return jsonify(message="Something went wrong."), 403



@app.route("/updateplaythrough", methods=["PUT"])
def updatethrough():
    try:
        level       = request.json['level']
        studentid   = request.json['studentId']
        playthrough = Playthrough.query.filter(Playthrough.studentId == studentid).first()
        playthrough.level = level;

        db.session.commit()

        return jsonify(message="playthrough created"), 200

    except Exception as e:
        print(e)
        return jsonify(message="Something went wrong"), 403

@app.route("/createplaythrough", methods=["POST"])
def createplaythrough():
    try:
        level = request.json['level']
        studentid = request.json['studentId']

        newplaythrough = Playthrough(level,studentid)

        db.session.add(newplaythrough)
        db.session.commit()

        return jsonify(message="playthrough created"), 200

    except Exception as e:
        print(e)
        return jsonify(message="Something went wrong"), 403

@app.route("/getAllPlaythrough", methods=["GET"])
#@jwt_required
def get_AllPlaythrough():
    playthrough = Playthrough.query.all()
    result = playthroughsSerializer.dump(playthrough)
    return jsonify(result.data)

@app.route("/<id>/getplaythrough", methods=["GET"])
@jwt_required
def get_playthrough(id):

    playthrough = Playthrough.query.filter(Playthrough.studentId == id).all()

    result = playthroughsSerializer.dump(playthrough)
    return jsonify(result.data)


@app.route("/getquestionhistory", methods=["GET"])
#@jwt_required
def get_questionhistory():
    questionhistory= QuestionHistory.query.all()
    result = questionsHistorySerializer.dump(questionhistory)
    return jsonify(result.data)

############################################################################################
if __name__ == '__main__':
    if len(sys.argv) > 2:
        manager.run()
    app.run(debug=True, port=5001)
