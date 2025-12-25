from sqlalchemy import text
from sqlalchemy.exc import OperationalError



def check_db_connection(db):
    """
    Returns (True, "ok") if DB reachable, otherwise (False, error_message).
    Call inside `with app.app_context():`.
    """
    try:
        # open a short-lived connection and run a simple query
        with db.engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return True, "ok"
    except OperationalError as oe:
        return False, f"OperationalError: {oe}"
    except Exception as e:
        return False, f"{type(e).__name__}: {e}"