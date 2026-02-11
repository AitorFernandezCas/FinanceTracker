from flask import Blueprint, request, jsonify, Response
from services.liquidez_service import get_liquidez
from schemas.liquidez import LiquidezResponse

health_bp = Blueprint("health", __name__)


@health_bp.route("/health", methods=["GET"])
def health():
    '''
    curl -X POST http://localhost:5000/health
    '''
    return {"status": "ok"}