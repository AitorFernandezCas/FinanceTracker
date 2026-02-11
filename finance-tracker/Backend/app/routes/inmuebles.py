from flask import Blueprint, request, jsonify, Response
from services.inmuebles_services import get_inmuebles
from app import db


inmuebles_bp = Blueprint("inmuebles", __name__)


@inmuebles_bp.route("/get-inmobiliario", methods=["GET"])
def liquidez() -> Response:
    '''
    curl -X GET http://localhost:5000/api/get-inmobiliario
    '''
    payload = get_inmuebles(db)
    return jsonify(payload)