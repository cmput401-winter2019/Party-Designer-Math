from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Student(db.Model):
    id          = db.Column(db.Integer,    primary_key=True)
    username    = db.Column(db.String(20), unique=True)
    classCode   = db.Column(db.Integer)

    def __init__(self, id, username, classCode):
        self.id         = id
        self.username   = username
        self.classCode  = classCode

    def __repr__(self):
        return '<id {}>'.format(self.id)
