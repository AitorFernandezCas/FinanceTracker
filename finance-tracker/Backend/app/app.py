from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.secret_key = "SOME_KEY"
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "postgresql://postgres:I0uARCKH5Ryml7st"
        "@db.nppktgavaulgidxqegse.supabase.co:5432/postgres"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    migrate = Migrate(app, db)

    return app

