from app import app
from services.user_service import user_service

@app.route("/")
def index():
    if not user_service.login():
        return "BAd shit bro"
    return "Hello world"