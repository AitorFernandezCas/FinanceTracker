from app import db
from datetime import datetime

class Liquidez(db.Model):
    __tablename__ = 'liquidez'

    id_usuario = db.Column(db.Integer, primary_key=True)
    fecha_seguimiento = db.Column(db.Date, primary_key=True)
    id_banco = db.Column(db.Integer, primary_key=True)

    importe = db.Column(db.Float, nullable=False)
    rendimiento = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
