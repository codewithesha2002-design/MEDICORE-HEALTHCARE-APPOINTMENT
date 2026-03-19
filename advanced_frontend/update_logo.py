import os
import re

base_dir = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend"

logo_replacement = """            <!-- [Logo] -->
            <a class="navbar-brand d-flex align-items-center me-4" href="index.html">
                <img src="images/medicore-logo.png" alt="MediCore Logo" height="40">
            </a>"""

for root, dirs, files in os.walk(base_dir):
    for filename in files:
        if filename.endswith(".html"):
            filepath = os.path.join(root, filename)
            with open(filepath, "r", encoding='utf-8') as f:
                content = f.read()
            
            # Regex to safely replace the old logo with the new image logo
            content = re.sub(r'<!-- \[Logo\] -->\s*<a class="navbar-brand d-flex align-items-center me-4" href="index\.html">\s*<i class="fas fa-hospital-symbol fa-2x me-2"[^>]*></i>\s*<span[^>]*>HealthCore</span>\s*</a>', logo_replacement, content, flags=re.DOTALL)
            
            with open(filepath, "w", encoding='utf-8') as f:
                f.write(content)

print("Logo updated across all pages.")
