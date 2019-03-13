from flask import Flask, request, jsonify
from serializers import StudentSerializer, ma
from models import Student, db
import os

# create app
app = Flask(__name__)

# set path and initialize db and serializer
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'crud.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
ma.init_app(app)

# create serializers for student(s)
student_serializer = StudentSerializer()
students_serializer = StudentSerializer(many=True)

# endpoint to create new student
@app.route("/student", methods=["POST"])
def add_student():
    try:
        name = request.json['name']
        classcode = request.json['classcode']
        
        new_student = Student(name, classcode)

        db.session.add(new_student)
        db.session.commit()

        return jsonify(success=True), 201
    except:
        return jsonify(success=False), 403

# endpoint to show all students
@app.route("/student", methods=["GET"])
def get_student():
    all_students = Student.query.all()
    result = students_serializer.dump(all_students)
    return jsonify(result.data)

if __name__ == '__main__':
    app.run(debug=True, port=5001)