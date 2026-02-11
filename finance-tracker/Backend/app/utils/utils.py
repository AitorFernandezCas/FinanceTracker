from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

def check_database_health(db):
    try:
        with db.engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        print("✅ Database connection: OK")
        return True
    except SQLAlchemyError as e:
        print("❌ Database connection: FAILED")
        print(e)
        return False
