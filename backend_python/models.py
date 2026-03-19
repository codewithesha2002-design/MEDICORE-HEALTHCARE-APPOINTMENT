from sqlalchemy import Column, Integer, String, Date, Time, Text
from database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String(100), index=True)
    patient_email = Column(String(100))
    patient_phone = Column(String(20))
    doctor_name = Column(String(100))
    appointment_date = Column(Date)
    appointment_time = Column(Time)
    symptoms = Column(Text)
