from flask import Blueprint, request, jsonify
from models.user import User
from models.doctor import Doctor

doctors_bp = Blueprint('doctors', __name__)

@doctors_bp.route('/', methods=['GET'])
def get_doctors():
    spec = request.args.get('specialization')
    query = Doctor.query
    if spec:
        query = query.filter(Doctor.specialization.ilike(f"%{spec}%"))
        
    doctors = query.all()
    result = []
    for doc in doctors:
        user = User.query.get(doc.id)
        result.append({
            'doctor_id': doc.id,
            'name': user.name,
            'specialization': doc.specialization,
            'experience': doc.experience_years,
            'rating': doc.rating
        })
    return jsonify(result), 200
