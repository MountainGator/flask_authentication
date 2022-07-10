from urllib import response
from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
from users import User

app = Flask(__name__)
app.config['SECRET_KEY'] = "urmom420"
CORS(app, resources={r"/*": {"origins": "localhost:3000"}})

client = MongoClient('localhost', 27017)
db = client.feedback_db
collection = db.data

session['current_user'] = ''

@app.route("/register", methods=['POST'])
def new_user():
    json = request.json

    newUser = User.register(json.username, json.pwd, json.email, json.first, json.last)
    dbModel = {
        'username': newUser.username, 
        'password': newUser.password, 
        'email': newUser.email,
        'first_name': newUser.first,
        'last_name': newUser.last
        }

    collection.insert_one(dbModel)
    session["current_user"] = newUser.username
    return ('OK', 203)

@app.route("/login", methods=["POST"])
def log_in():
    json = request.json

    u = collection.find_one({'username': json.username})

    if u and bcrypt.check_password_hash(u['password'], json.password):
        user = u['username']
        session['current_user'] = user
        return (jsonify(msg=user), 201)
    else: return (jsonify(msg='Not Found'), 303)

@app.route("/check", methods=["GET"])
def find_current_user():
    name = session['current_user']
    if name is not '':
        user = collection.find_one({'username': name})
        
        if user['first_name']:
            print('user', user)
            user_obj = {
                'username': user['username'],
                'email': user['email'],
                'first': user['first_name'],
                'last': user['last_name']
            }
            response = jsonify(msg=user_obj)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return (response, 201)
        else:
            response = jsonify(msg='Not Found')
            response.headers.add('Access-Control-Allow-Origin', '*')
            return (response, 303)
    else:
        print('no user')
        response = jsonify(msg='Not Found')
        response.headers.add('Access-Control-Allow-Origin', '*')
        return (response, 303)