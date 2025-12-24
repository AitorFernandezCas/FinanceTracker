from app import db

class Liquidez(db.Model):
    __tablename__ = 'Liquidez'

    id_usuario = db.Column(db.Integer,primary_key = True)
    fecha_seguimiento = db.Column(db.Date,primary_key = True)
    id_banco = db.Column(db.Intger,primary_key = True)

    importe = db.Column(db.Float)
    rendimiento = db.Column(db.Float)
    created_at = db.Column(db.Datetime)