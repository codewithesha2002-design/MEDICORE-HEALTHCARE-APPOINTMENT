import os
import re

app_js_path = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend\js\app.js"
with open(app_js_path, "r", encoding='utf-8') as f:
    app_js = f.read()

# 1. Update FakeDoctorsDB to include all the images dynamically
new_db = """    const fakeDoctorsDB = [
        { id: 1, name: "Dr. Sarah Johnson", spec: "Cardiology", exp: 12, rating: 4.9, image: "images/Dr. Sarah Johnson.jpg" },
        { id: 2, name: "Dr. Michael Chen", spec: "Neurology", exp: 8, rating: 4.7, image: "images/Dr. Michael Chen.jpg" },
        { id: 3, name: "Dr. Emily Davis", spec: "Pediatrics", exp: 15, rating: 5.0, image: "images/Dr. Emily Davis.jpg" },
        { id: 4, name: "Dr. James Wilson", spec: "Orthopedics", exp: 10, rating: 4.5, image: "images/Dr. James Wilson.jpg" },
        { id: 5, name: "Dr. Olivia Martinez", spec: "Dermatology", exp: 7, rating: 4.8, image: "images/Dr. Olivia Martinez.jpg" },
        { id: 6, name: "Dr. William Taylor", spec: "ENT", exp: 6, rating: 4.4, image: "images/Dr. William Taylor.jpg" },
        { id: 7, name: "Dr. Robert Garcia", spec: "Psychiatry", exp: 14, rating: 4.9, image: "images/Dr. Robert Garcia.jpg" },
        { id: 8, name: "Dr. Linda White", spec: "General Physician", exp: 20, rating: 4.9, image: "images/Dr. Linda White.jpg" }
    ];"""

app_js = re.sub(r'const fakeDoctorsDB = \[\s*.*?\];', new_db, app_js, flags=re.DOTALL)

# 2. Fix grammatical wording and format
# "consultation with a <b>${specialist}</b>." -> "consultation with a <b>${specialist} specialist</b>."
app_js = app_js.replace("consultation with a <b>${specialist}</b>", "consultation with a <b>${specialist} specialist</b>")

# Convert **Text** to <b>Text</b> in the medicine recommendations
app_js = app_js.replace("**Paracetamol**", "<b>Paracetamol</b>")
app_js = app_js.replace("**Ibuprofen**", "<b>Ibuprofen</b>")
app_js = app_js.replace("**Paracetamol (Tylenol)**", "<b>Paracetamol (Tylenol)</b>")
app_js = app_js.replace("**Acetaminophen**", "<b>Acetaminophen</b>")
app_js = app_js.replace("**Pepto-Bismol**", "<b>Pepto-Bismol</b>")
app_js = app_js.replace("**Naproxen**", "<b>Naproxen</b>")
app_js = app_js.replace("**Cetirizine**", "<b>Cetirizine</b>")
app_js = app_js.replace("**Chest pain can be serious.**", "<b>Chest pain can be serious.</b>")


with open(app_js_path, "w", encoding='utf-8') as f:
    f.write(app_js)

print("DB images synced and Markdown fixed to HTML.")
