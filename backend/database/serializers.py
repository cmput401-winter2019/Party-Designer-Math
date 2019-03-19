from flask_marshmallow import Marshmallow

ma = Marshmallow()

class StudentSerializer(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'classCode')
