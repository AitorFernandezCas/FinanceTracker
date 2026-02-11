from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import socket
from dotenv import load_dotenv
import os
from utils.utils import check_database_health
from flask_cors import CORS


load_dotenv()  # loads .env into environment

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    resources = {
                                            r"/api/get-liquidez": {"origins": "http://localhost:5173"},
                                            r"/api/get-inmobiliario": {"origins": "http://localhost:5173"}
                                            }
    CORS(app, resources=resources)
    app.secret_key = "SOME_KEY"

    supabase_user: str = os.getenv("SUPABASE_USER")
    supabase_password: str = os.getenv("SUPABASE_PASSWORD")
    supabase_route: str = os.getenv("SUPABASE_ROUTE")
    supabase_port: str = os.getenv("SUPABASE_PORT")

    supabase_uri = f"postgresql+psycopg2://{supabase_user}:{supabase_password}@{supabase_route}:{supabase_port}/postgres?sslmode=require"
    print(f"Supabase URI: {supabase_uri}")
    app.config["SQLALCHEMY_DATABASE_URI"] = supabase_uri
    
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    with app.app_context():
        check_database_health(db)


    from routes import register_routes

    register_routes(app)

    


    return app

