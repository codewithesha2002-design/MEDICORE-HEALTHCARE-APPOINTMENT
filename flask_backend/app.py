import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import db

# Import routes
from routes.auth import auth_bp
from routes.doctors import doctors_bp
from routes.appointments import appointments_bp
from routes.records import records_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(doctors_bp, url_prefix='/api/doctors')
    app.register_blueprint(appointments_bp, url_prefix='/api/appointments')
    app.register_blueprint(records_bp, url_prefix='/api/records')

    @app.route('/health')
    def health_check():
        return jsonify({"status": "healthy"}), 200

    # Ensure DB is created
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            print(f"Warning: Could not initialize database tables. {e}")

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
