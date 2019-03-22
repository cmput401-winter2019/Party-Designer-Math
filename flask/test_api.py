import json
import pytest
from api import app

# source : https://serge-m.github.io/testing-json-responses-in-Flask-REST-apps-with-pytest.html

def post_json(client, url, json_dict):
    return client.post(url, data=json.dumps(json_dict), content_type='application/json')

def json_of_response(response):
    return json.loads(response.data.decode('utf8'))

def grab_token(client):
    response = post_json(client, '/login', {'name': 'xyz1', 'classCode': 'xyz1'})
    jsonresponse = json_of_response(response)
    access_token = jsonresponse['access_token']
    return access_token

@pytest.fixture
def client(request):
    test_client = app.test_client()

    def teardown():
        pass

    request.addfinalizer(teardown)
    return test_client

def test_invalid_name(client):
    response = post_json(client, '/login', {'name': 'InvalidName', 'classCode': '123'})
    assert response.status_code == 403
    assert b'User does not exist' in response.data

def test_invalid_classcode(client):
    response = post_json(client, '/login', {'name': 'xyz1', 'classCode': '123'})
    assert response.status_code == 403
    assert b'Incorrect password' in response.data

def test_valid_name_and_classcode(client):
    response = post_json(client, '/login', {'name': 'xyz1', 'classCode': 'xyz1'})
    assert response.status_code == 200
    assert b'Logged in' in response.data

def test_student_missing_authorization_header(client):
    response = client.get('/valid')
    assert response.status_code == 401
    assert b'Missing Authorization Header'in response.data

def test_student_correct_authorization_header(client):
    access_token = grab_token(client)
    response = client.get('/valid', headers={"Authorization": "Bearer {}".format(access_token)})
    assert response.status_code == 200

def test_student_incorrect_authorization_header(client):
    response = client.get('/valid', headers={"Authorization": "Bearer {}".format("INCORRECT_JWT")})
    assert response.status_code == 422

    # TODO : Make sure that authorized user can only access his own things