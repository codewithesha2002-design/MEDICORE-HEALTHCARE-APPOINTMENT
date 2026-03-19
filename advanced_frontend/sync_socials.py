import os

base_dir = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend"

new_socials = """   <a href="https://x.com/codewithesha" class="btn btn-outline-light btn-floating btn-sm m-1 rounded-circle border-0"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/in/codewithesha2002" class="btn btn-outline-light btn-floating btn-sm m-1 rounded-circle border-0"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://github.com/codewithesha2002-design" class="btn btn-outline-light btn-floating btn-sm m-1 rounded-circle border-0"><i class="fab fa-github"></i></a>
                    <a href="https://www.instagram.com/i__hype__in/" class="btn btn-outline-light btn-floating btn-sm m-1 rounded-circle border-0"><i class="fab fa-instagram"></i></a>"""

for root, dirs, files in os.walk(base_dir):
    for filename in files:
        if filename != "doctors.html" and filename.endswith(".html"):
            filepath = os.path.join(root, filename)
            with open(filepath, "r", encoding='utf-8') as f:
                content = f.read()
            

print("Socials synced to all pages.")
