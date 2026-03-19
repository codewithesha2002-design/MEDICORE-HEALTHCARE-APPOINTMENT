def suggest_specialist(symptoms: str) -> str:
    """Mock ML Model for symptom-to-specialist mapping."""
    symptoms_low = symptoms.lower()
    if 'heart' in symptoms_low or 'chest pain' in symptoms_low:
        return "Cardiology"
    elif 'headache' in symptoms_low or 'brain' in symptoms_low:
        return "Neurology"
    elif 'child' in symptoms_low or 'fever' in symptoms_low:
        return "Pediatrics"
    elif 'skin' in symptoms_low or 'rash' in symptoms_low:
        return "Dermatology"
    else:
        return "General Physician"
