def send_email_confirmation(email: str, appointment_details: dict):
    """Mock Email Sending Service."""
    print(f"--- EMAIL SENT TO {email} ---")
    print(f"Subject: Appointment Confirmation")
    print(f"Body: Your appointment on {appointment_details.get('date')} at {appointment_details.get('time')} is confirmed.")
    print("-------------------------------")
    return True
