from flask import request
from marshmallow import ValidationError
from werkzeug.exceptions import Unauthorized

from app import app
from services.user_service import user_service

@app.route("/")
def index():
    return "Hello world"

@app.route("/api/user/register", methods=["POST"])
def register_user():
    """Register a new user

    ---
    tags:
        - users
    responses:
        201:
            description: An user is created successfully
        404:
            description: Something went wrong creating new user
        422:
            description: Input validation failed
    """
    
    body = request.json
    try:
        user = user_service.register(body)
        return {
                "status": "success",
                "message": "user created",
                "data": user
            }, 201
        
    except ValidationError as err:
        return {
            "status": "error",
            "message": "user validation failed",
            "data": err.messages
        }, 422
    except Exception as err:
        app.logger.error(err)
        return {
            "status": "error",
            "message": "user creation failed",
            "data": None
        }, 404
        
@app.route("/api/user/login", methods=["POST"])
def login_user():
    """Login a user

    ---
    tags:
        - users
    responses:
        200:
            description: Login successful
        401:
            description: Invalid credentials
        404:
            description: Something went wrong logging in
    """
    
    body = request.json
    try:
        login_data = user_service.login(body)
        return {
                "status": "success",
                "message": "login successful",
                "data": login_data
            }, 200
    
    except Unauthorized:
        return {
            "status": "error",
            "message": "invalid credentials",
            "data": None
        }, 401
    
    except Exception as err:
        return {
            "status": "error",
            "message": "something went wrong logging in",
            "data": None
        }, 404