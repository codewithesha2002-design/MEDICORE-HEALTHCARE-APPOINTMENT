import os
import re

filepath = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    html = f.read()

# Replace the removed content block with the clean image
target = """            <div class="col-lg-6 animate-slide-in mt-5 mt-lg-0">
                <!-- The content of this column was removed as per instruction -->
            </div>"""

replacement = """            <div class="col-lg-6 animate-slide-in mt-5 mt-lg-0 text-center">
                <img src="images/healthcare.jpg" alt="Healthcare Application Interface" class="img-fluid" style="width: 100%; max-width: 600px; height: auto; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,109,119,0.15);">
            </div>"""

if target in html:
    html = html.replace(target, replacement)
else:
    # Regex fallback if whitespace differs
    html = re.sub(r'<div class="col-lg-6 animate-slide-in mt-5 mt-lg-0">\s*<!-- The content of this column was removed as per instruction -->\s*</div>', replacement, html, flags=re.DOTALL)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(html)

print("Hero layout fixed and static image rendered.")
