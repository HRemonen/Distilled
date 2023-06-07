from flask import request
from marshmallow import ValidationError

from werkzeug.exceptions import Unauthorized

from flask_jwt_extended import jwt_required

from app import app
from services.user_service import user_service
from services.distillery_service import distillery_service

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
        
    except Exception:
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
    
    except Exception:
        return {
            "status": "error",
            "message": "something went wrong logging in, check inputs",
            "data": None
        }, 404

@app.route("/api/distillery/<string:id>", methods=["GET"])
def get_distillery(id):
    """Get distillery by id

    ---
    tags:
        - distilleries
    responses:
        200:
            description: Distillery found
        404:
            description: Distillery not found
    """
    try:
        distillery_data = distillery_service.get_distillery(id)
        return {
                "status": "success",
                "message": "distillery found",
                "data": distillery_data
            }, 200
    
    except Exception:
        return {
            "status": "error",
            "message": "distillery not found",
            "data": None
        }, 404

@app.route("/api/distillery", methods=["GET"])
def get_distilleries():
    """Get all distilleries ordered by name

    ---
    tags:
        - distilleries
    responses:
        200:
            description: Distilleries found
        404:
            description: Distilleries not found
    """
    try:
        distillery_data = distillery_service.get_distilleries()
        return {
                "status": "success",
                "message": "distilleries found",
                "data": distillery_data
            }, 200
    
    except Exception:
        return {
            "status": "error",
            "message": "distilleries not found",
            "data": None
        }, 404

@app.route("/api/distillery", methods=["POST"])
@jwt_required()
def create_distillery():
    """Create a new distillery

    ---
    tags:
        - distilleries
    responses:
        201:
            description: A distillery is created successfully
        401:
            description: Unauthorized action, only admins can create new distilleries
        404:
            description: Something went wrong creating new distillery
        422:
            description: Input validation failed
    """
    
    body = request.json
    try:
        distillery = distillery_service.create_distillery(body)
        return {
                "status": "success",
                "message": "distillery created",
                "data": distillery
            }, 201
    
    except Unauthorized:
        return {
            "status": "error",
            "message": "unauthorized action",
            "data": None
        }, 401
        
    except ValidationError as err:
        return {
            "status": "error",
            "message": "distillery validation failed",
            "data": err.messages
        }, 422
        
    except Exception as err:
        app.logger.info(err)
        return {
            "status": "error",
            "message": "distillery creation failed",
            "data": None
        }, 404