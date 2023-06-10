from flask import request
from marshmallow import ValidationError

from werkzeug.exceptions import Unauthorized

from flask_jwt_extended import jwt_required

from app import app
from services.user_service import user_service
from services.distillery_service import distillery_service
from services.whiskey_service import whiskey_service
from services.entity_service import entity_service

@app.route("/")
def index():
    return "Hello world"

# ============= USER RELATED ENDPOINTS ============= #
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

# ============= DISTILLERY RELATED ENDPOINTS ============= #

@app.route("/api/distillery/<string:id>", methods=["GET"])
def get_distillery(id: str):
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
        if not user_service.is_admin(): 
            raise Unauthorized("You don't have permission to create new distilleries")
        
        entity = entity_service.create_entity()
        distillery = distillery_service.create_distillery(entity["id"], body)
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
        return {
            "status": "error",
            "message": "distillery creation failed",
            "data": None
        }, 404
        
@app.route("/api/distillery/<string:id>", methods=["PUT"])
@jwt_required()
def update_distillery_website(id: str):
    """Update a distillery website

    ---
    tags:
        - distilleries
    responses:
        200:
            description: A distillery is updated successfully
        401:
            description: Unauthorized action, only admins can update distilleries
        404:
            description: Something went wrong updating distillery
        422:
            description: Input validation failed
    """
    
    body = request.json
    
    try:
        if not user_service.is_admin():
            raise Unauthorized("You don't have permission to update distilleries")
        
        distillery = distillery_service.update_distillery_website(id, body)
        return {
                "status": "success",
                "message": "distillery updated",
                "data": distillery
            }, 200
    
    except Unauthorized:
        return {
            "status": "error",
            "message": "unauthorized action",
            "data": None
        }, 401
        
    except ValidationError as err:
        return {
            "status": "error",
            "message": "validation failed",
            "data": err.messages
        }, 422
        
    except Exception as err:
        return {
            "status": "error",
            "message": "distillery update failed",
            "data": None
        }, 404
        
@app.route("/api/distillery/<string:id>", methods=["DELETE"])
@jwt_required()
def delete_distillery(id: str):
    """Delete a distillery, works as a soft delete

    ---
    tags:
        - distilleries
    responses:
        200:
            description: A distillery is deleted successfully
        401:
            description: Unauthorized action, only admins can delete distilleries
        404:
            description: Something went wrong deleting distillery
    """
    
    try:
        if not user_service.is_admin():
            raise Unauthorized("You don't have permission to delete distilleries")
        
        distillery_service.delete_distillery(id)
        return {
                "status": "success",
                "message": "distillery deleted",
                "data": None
            }, 201
    
    except Unauthorized:
        return {
            "status": "error",
            "message": "unauthorized action",
            "data": None
        }, 401
        
    except Exception as err:
        return {
            "status": "error",
            "message": "distillery delete failed",
            "data": None
        }, 404
        
# ============= WHISKEY RELATED ENDPOINTS ============= #
@app.route("/api/whiskey/<string:id>", methods=["GET"])
def get_whiskey(id: str):
    """Get whiskey by id

    ---
    tags:
        - whiskeys
    responses:
        200:
            description: Whiskey found
        404:
            description: Whiskey not found
    """
    try:
        whiskey_data = whiskey_service.get_whiskey(id)
        return {
                "status": "success",
                "message": "whiskey found",
                "data": whiskey_data
            }, 200
    
    except Exception:
        return {
            "status": "error",
            "message": "whiskey not found",
            "data": None
        }, 404

@app.route("/api/whiskey/distillery/<string:distillery_id>", methods=["GET"])   
def get_whiskeys_by_distillery(distillery_id: str):
    """Get whiskey by distillery id

    ---
    tags:
        - whiskeys
    responses:
        200:
            description: Whiskeys found
        404:
            description: Whiskeys not found
    """
    
    try:
        whiskey_data = whiskey_service.get_whiskeys_by_distillery(distillery_id)
        return {
                "status": "success",
                "message": "whiskeys found",
                "data": whiskey_data
            }, 200
    
    except Exception:
        return {
            "status": "error",
            "message": "whiskeys not found",
            "data": None
        }, 404


@app.route("/api/whiskey", methods=["GET"])
def get_whiskeys():
    """Get all whiskeys ordered by name

    ---
    tags:
        - whiskeys
    responses:
        200:
            description: Whiskeys found
        404:
            description: Whiskeys not found
    """
    try:
        whiskey_data = whiskey_service.get_whiskeys()
        return {
                "status": "success",
                "message": "whiskeys found",
                "data": whiskey_data
            }, 200
    
    except Exception:
        return {
            "status": "error",
            "message": "whiskeys not found",
            "data": None
        }, 404

@app.route("/api/whiskey", methods=["POST"])
@jwt_required()
def create_whiskey():
    """Create a new whiskey

    ---
    tags:
        - whiskeys
    responses:
        201:
            description: A whiskey is created successfully
        401:
            description: Unauthorized action, only admins can create new whiskey
        404:
            description: Something went wrong creating new whiskey
        422:
            description: Input validation failed
    """
    
    body = request.json
    try:
        if not user_service.is_admin(): 
            raise Unauthorized("You don't have permission to create new whiskeys")
        
        entity = entity_service.create_entity()
        whiskey_data = whiskey_service.create_whiskey(entity["id"], body)
        return {
                "status": "success",
                "message": "whiskey created",
                "data": whiskey_data
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
            "message": "whiskey validation failed",
            "data": err.messages
        }, 422
        
    except Exception as err:
        return {
            "status": "error",
            "message": "whiskey creation failed",
            "data": None
        }, 404
        
@app.route("/api/whiskey/<string:id>", methods=["PUT"])
@jwt_required()
def update_whiskey_description(id: str):
    """Update a whiskey description

    ---
    tags:
        - whiskeys
    responses:
        200:
            description: A whiskey is updated successfully
        401:
            description: Unauthorized action, only admins can update whiskeys
        404:
            description: Something went wrong updating whiskey
        422:
            description: Input validation failed
    """
    
    body = request.json
    
    try:
        if not user_service.is_admin():
            raise Unauthorized("You don't have permission to update whiskeys")
        
        whiskey_data = whiskey_service.update_whiskey_description(id, body)
        return {
                "status": "success",
                "message": "whiskey updated",
                "data": whiskey_data
            }, 200
    
    except Unauthorized:
        return {
            "status": "error",
            "message": "unauthorized action",
            "data": None
        }, 401
        
    except ValidationError as err:
        return {
            "status": "error",
            "message": "validation failed",
            "data": err.messages
        }, 422
        
    except Exception as err:
        return {
            "status": "error",
            "message": "whiskey update failed",
            "data": None
        }, 404
        
@app.route("/api/whiskey/<string:id>", methods=["DELETE"])
@jwt_required()
def delete_whiskey(id: str):
    """Delete a whiskey, works as a soft delete

    ---
    tags:
        - whiskeys
    responses:
        200:
            description: A whiskey is deleted successfully
        401:
            description: Unauthorized action, only admins can delete whiskeys
        404:
            description: Something went wrong deleting whiskey
    """
    
    try:
        if not user_service.is_admin():
            raise Unauthorized("You don't have permission to delete whiskeys")
        
        whiskey_service.delete_whiskey(id)
        return {
                "status": "success",
                "message": "whiskey deleted",
                "data": None
            }, 201
    
    except Unauthorized:
        return {
            "status": "error",
            "message": "unauthorized action",
            "data": None
        }, 401
        
    except Exception as err:
        return {
            "status": "error",
            "message": "whiskey deletion failed",
            "data": None
        }, 404
        