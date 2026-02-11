from app import db
from datetime import datetime

class Inmuebles(db.Model):
    __tablename__ = 'inmuebles'

    id_usuario = db.Column(db.Integer, primary_key=True)
    fecha_seguimiento = db.Column(db.Date, primary_key=True)
    id_inmueble = db.Column(db.Integer, primary_key=True)

    valor_total = db.Column(db.Float)
    fecha_valoracion = db.Column(db.Date)
    pct_propiedad = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
