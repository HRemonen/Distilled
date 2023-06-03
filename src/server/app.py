from flask import Flask, render_template
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

from config import JWT_SECRET_KEY

app = Flask(
    __name__,
)

CORS(app)

app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["JWT EXPIRATION_DELTA"] = 3600

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

@app.route("/")
def index():
    """Return React frontend as default route"""
    return "Hello world"

if __name__ == "__main__":
    app.run(host='0.0.0.0')