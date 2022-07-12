from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from users import User

app = Flask(__name__)
app.config['SECRET_KEY'] = "urmom420"
CORS(app)
bcrypt = Bcrypt(app)

client = MongoClient('localhost', 27017)
db = client.feedback_db
collection = db.data

@app.route("/register", methods=['POST'])
def new_user():
    json = request.json
    print('register', json)
    hashed = bcrypt.generate_password_hash(json['password'])
    hashed_utf8 = hashed.decode('utf8')
    user = User(json['username'], hashed_utf8, json['email'], json['first'], json['last'])
    newUser = user.register()
    dbModel = {
        'username': newUser['username'], 
        'password': newUser['password'], 
        'email': newUser['email'],
        'first_name': newUser['first'],
        'last_name': newUser['last']
        }

    collection.insert_one(dbModel)
    session["current_user"] = newUser['username']
    return ('OK', 203)

@app.route("/login", methods=["POST"])
def log_in():
    json = request.json
    print('login request:', json)
    u = collection.find_one({'username': json.username})
    print('user:',u)
    if u and bcrypt.check_password_hash(u.password, json.password):
        user = u['username']
        session['current_user'] = user
        return (jsonify(user=user), 201)
    else: return ('Not Found', 303)

@app.route("/check", methods=["GET"])
def find_current_user():
    name = session['current_user']
    print("current user:", name)
    if name: 
        user = collection.find_one({'username': name})
        if user:
            user_obj = {
            'username': user['username'],
            'email': user['email'],
            'first': user['first_name'],
            'last': user['last_name']
            }
            return (jsonify(msg=user_obj), 201)
        else:
            return (jsonify(msg='Not Found'), 303)
    else:
        print('no user')
        return (jsonify(msg='Not Found'), 303)