from models import db

class Doctor(db.Model):
    __tablename__ = 'doctors'
    id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
    specialization = db.Column(db.String(100))
    experience_years = db.Column(db.Integer)
    rating = db.Column(db.Float, default=0.0)
    profile_image = db.Column(db.String(255))
    
    # Relationships
    availabilities = db.relationship('Availability', backref='doctor', lazy=True)
    appointments = db.relationship('Appointment', backref='doctor_ref', lazy=True)

class Availability(db.Model):
    __tablename__ = 'availability'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'))
    day_of_week = db.Column(db.Enum('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'))
    start_time = db.Column(db.Time)
    end_time = db.Column(db.Time)
    is_available = db.Column(db.Boolean, default=True)
