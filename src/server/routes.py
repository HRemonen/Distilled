from flask import request
from marshmallow import ValidationError

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
    except:
        return {
            "status": "error",
            "message": "user creation failed",
            "data": None
        }, 404