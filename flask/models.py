from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)
    classcode = db.Column(db.String(5), unique=True)

    def __init__(self, name, classcode):
        self.name = name
        self.classcode = classcode