from models.liquidez import Liquidez
from flask import jsonify
from utils.utils import check_db_connection

def register_routes(app,db):
    @app.route('/get-liquidez',methods = ["GET","POST"])
    def get_liquidez():
        liquidez = Liquidez.query.all()
        # return jsonify([l.to_dict() for l in liquidez])
        return {"status": "ok"}

    @app.route("/health")
    def health():
        return {"status": "ok"}
    


    @app.route("/db-check")
    def db_check_route():
        ok, msg = check_db_connection(db)
        if ok:
            return {"status": "ok"}
        return {"status": "error", "error": msg}, 500