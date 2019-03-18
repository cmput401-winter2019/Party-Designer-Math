import os,sys
from flask                      import Flask, render_template, request, json, jsonify, make_response
from flask_sqlalchemy           import SQLAlchemy

from database.models             import Student, db
from database.serializers        import StudentSerializer, ma
from random import *

project_dir     = os.path.dirname(os.path.abspath(__file__))
database_file   = "sqlite:///{}".format(os.path.join(project_dir, "./database/party.db"))


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]           = database_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']    = False

with app.app_context():
    db.init_app(app)
    db.create_all()

# create serializers for student(s)
studentSerializer       = StudentSerializer()
studentSerializer_mult  = StudentSerializer(many=True)


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/student', methods=['POST'])
def add_student():
    try:
        id          = randint(1,1000)
        username    = request.json['username'];
        classCode   = request.json['classCode'];
        print(username, classCode, file=sys.stderr)
        newStudent = Student(id, username, classCode)
        db.session.add(newStudent)
        db.session.commit()
        #return json.dumps({'status':'OK', 'username':username, 'password':password, 'classCode':classCode});
        return jsonify(success=True), 200
    except Exception as e:
        print(e, file=sys.stderr)
        return jsonify(success=False), 404

@app.route('/student', methods=['GET'])
def get_student():
    all_students = Student.query.all()
    result = studentSerializer_mult.dump(all_students)
    return jsonify(result.data)


if __name__ == "__main__":
    app.run(debug=True)
