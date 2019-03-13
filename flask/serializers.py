from flask_marshmallow import Marshmallow

ma = Marshmallow()

class StudentSerializer(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'classCode')

class GameStateSerializer(ma.Schema):
    class Meta:
        fields = ('id', 'money', 'numOfGuests', 'studentId')
    
class BagSerializer(ma.Schema):
    class Meta:
        fields = ('id', 'itemName', 'itemAmount')