import os
import re

base_dir = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend"

for root, dirs, files in os.walk(base_dir):
    for filename in files:
        if filename.endswith(".html"):
            filepath = os.path.join(root, filename)
            with open(filepath, "r", encoding='utf-8') as f:
                content = f.read()
            
            # Using regex to remove the notification bell block
            content = re.sub(
                r'<!-- \[🔔\] Notification Bell -->\s*<li class="nav-item me-3">\s*<a class="nav-link position-relative text-dark" href="#">\s*<i class="fas fa-bell fa-lg"></i>\s*<span class="position-absolute top-25 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">\s*<span class="visually-hidden">New alerts</span>\s*</span>\s*</a>\s*</li>',
                '', content, flags=re.DOTALL
            )

            with open(filepath, "w", encoding='utf-8') as f:
                f.write(content)

print("Bell icon removed from all pages.")
