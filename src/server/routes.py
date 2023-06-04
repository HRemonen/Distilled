from app import app
from services.user_service import user_service

@app.route("/")
def index():
    return "Hello world"