from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os
from models import db
from models.user import User
from models.doctor import Doctor

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    
    new_user = User(
        name=data['name'],
        email=data['email'],
        password_hash=hashed_password,
        role=data.get('role', 'patient')
    )
    db.session.add(new_user)
    db.session.commit()
    
    # If doctor, create doctor profile
    if new_user.role == 'doctor':
        doctor_profile = Doctor(id=new_user.id, specialization=data.get('specialization', 'General'))
        db.session.add(doctor_profile)
        db.session.commit()
        
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
        
    token = jwt.encode({
        'user_id': user.id,
        'role': user.role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, os.environ.get('SECRET_KEY', 'super-secret-key-123'), algorithm="HS256")
    
    return jsonify({'token': token, 'role': user.role, 'name': user.name})
