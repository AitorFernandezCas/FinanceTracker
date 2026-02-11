from flask import Blueprint, request, jsonify, Response
from services.liquidez_service import get_liquidez
from schemas.liquidez import LiquidezResponse
from app import db


liquidez_bp = Blueprint("liquidez", __name__)


@liquidez_bp.route("/get-liquidez", methods=["GET"])
def liquidez() -> Response:
    '''
    curl -X GET http://localhost:5000/api/get-liquidez
    '''
    payload = get_liquidez(db)
    return jsonify(payload)