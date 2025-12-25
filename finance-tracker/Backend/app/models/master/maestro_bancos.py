from app import db
from datetime import datetime

class MaestroBancos(db.Model):
    __tablename__ = 'maestro_bancos'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
