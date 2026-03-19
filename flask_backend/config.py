import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'super-secret-key-123'
    # Connect to MySQL, will create DB if it doesn't exist in app.py
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql+mysqlconnector://root@localhost/healthcare_enterprise'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
