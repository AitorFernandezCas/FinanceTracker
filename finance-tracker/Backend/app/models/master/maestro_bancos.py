from app import db

class Maestro_bancos(db.Model):
    __tablename__ = 'Maestro_bancos'
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(255), nullable = False)
    created_at = db.Column(db.Datetime)