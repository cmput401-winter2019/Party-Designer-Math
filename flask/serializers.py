from flask_marshmallow import Marshmallow

ma = Marshmallow()

class StudentSerializer(ma.Schema):
    class Meta:
        fields = ('id', 'firstName', 'lastName', 'username', 'password', 'classCode')

class GameStateSerializer(ma.Schema):
    class Meta:
        fields = ('id', 'money', 'numOfGuests', 'studentId')
    
class BagItemSerializer(ma.Schema):
    class Meta:
        fields = ('id', 'itemName', 'itemAmount', 'gameStateId')

class CanvasItemSerializer(ma.Schema):
    class Meta:
        fields = ('id', 'itemName', 'itemAmount', 'gameStateId')

class QuestionSerializer(ma.Schema):
    class Meta:
        fields = ('id', 'question', 'answer', 'arithmeticType', 'correct', 'gameStateId')