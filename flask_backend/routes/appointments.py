from flask import Blueprint, request, jsonify
from models import db
from models.appointment import Appointment
from utils.auth_decorators import token_required, role_required
from services.notification import send_email_confirmation
from services.ml_symptom import suggest_specialist

appointments_bp = Blueprint('appointments', __name__)

@appointments_bp.route('/smart-suggest', methods=['POST'])
def smart_suggest():
    data = request.json
    symptoms = data.get('symptoms', '')
    specialist = suggest_specialist(symptoms)
    return jsonify({'recommended_specialist': specialist}), 200

@appointments_bp.route('/book', methods=['POST'])
@token_required
@role_required('patient')
def book_appointment(current_user):
    data = request.json
    
    # Check double booking
    existing = Appointment.query.filter_by(
        doctor_id=data['doctor_id'],
        appointment_date=data['date'],
        appointment_time=data['time']
    ).first()
    
    if existing:
        return jsonify({'message': 'Slot already booked. Please choose another time.'}), 409
        
    new_app = Appointment(
        patient_id=current_user['user_id'],
        doctor_id=data['doctor_id'],
        appointment_date=data['date'],
        appointment_time=data['time']
    )
    db.session.add(new_app)
    db.session.commit()
    
    # Notification Service
    user_email = "patient@example.com" # Should fetch from DB in production
    send_email_confirmation(user_email, {"date": data['date'], "time": data['time']})
    
    return jsonify({'message': 'Appointment booked successfully', 'id': new_app.id}), 201
