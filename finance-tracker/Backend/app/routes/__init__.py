from .liquidez import liquidez_bp
from .inmuebles import inmuebles_bp

def register_routes(app):
    app.register_blueprint(liquidez_bp, url_prefix="/api")
    app.register_blueprint(inmuebles_bp, url_prefix="/api")
