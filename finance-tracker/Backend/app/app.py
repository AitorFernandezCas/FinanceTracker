from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import socket


db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.secret_key = "SOME_KEY"
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "postgresql+psycopg2://postgres:I0uARCKH5Ryml7st@db.nppktgavaulgidxqegse.supabase.co:5432/postgres?sslmode=require"
    )
    
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)


    try:
        # Use getaddrinfo which returns both A and AAAA records instead of gethostbyname
        addrs = socket.getaddrinfo('db.nppktgavaulgidxqegse.supabase.co', None)
        uniq = sorted({ai[4][0] for ai in addrs})
        print("Resolved addresses:", uniq)
    except socket.gaierror as e:
        # Don't raise during app creation; print useful diagnostic and continue
        print("DNS resolution failed:", e)
    # migrate = Migrate(app, db)
    from routes import register_routes

    register_routes(app,db)


    return app

