from pydantic import BaseModel, ConfigDict
from datetime import date, time
from typing import Optional

class AppointmentBase(BaseModel):
    patient_name: str
    patient_email: str
    patient_phone: str
    doctor_name: str
    appointment_date: date
    appointment_time: time
    symptoms: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class Appointment(AppointmentBase):
    id: int
    
    model_config = ConfigDict(from_attributes=True)
