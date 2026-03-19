import os
import re

base_dir = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend"

for root, dirs, files in os.walk(base_dir):
    for filename in files:
        filepath = os.path.join(root, filename)
        if filename.endswith(".html") or filename.endswith(".js"):
            with open(filepath, "r", encoding='utf-8') as f:
                content = f.read()
            
            # 1. Fix broken CSS classes globally
            content = content.replace("btn-primary-custom-custom", "btn-primary-custom")
            content = content.replace("text-primary-custom-custom", "text-primary-custom")
            content = content.replace("btn-outline-primary-custom-custom", "btn-outline-primary-custom")
            
            # 2. Inject IDs into doctors.html search form
            if filename == "doctors.html":
                content = content.replace('placeholder="Search by name..."', 'id="searchName" placeholder="Search by name..."')
                
                # We need to replace only the specific selects, or just replace both occurrences carefully.
                content = re.sub(r'<select class="form-select rounded-pill px-4">\s*<option selected>All Specializations</option>', 
                                 '<select id="filterSpecialty" class="form-select rounded-pill px-4">\n                        <option selected>All Specializations</option>', content)
                                 
                content = re.sub(r'<select class="form-select rounded-pill px-4">\s*<option selected>Experience \(Any\)</option>', 
                                 '<select id="filterExp" class="form-select rounded-pill px-4">\n                        <option selected>Experience (Any)</option>', content)
                
                content = content.replace('<button type="button" class="btn btn-primary-custom w-100"><i class="fas fa-search"></i> Search</button>', 
                                          '<button type="button" id="searchBtn" class="btn btn-primary-custom w-100"><i class="fas fa-search"></i> Search</button>')
                
                # Clear static HTML doctors so JS can populate
                content = re.sub(r'<div class="row g-4" id="doctors-directory">.*?</div>\n    </div>', '<div class="row g-4" id="doctors-directory">\n            <!-- JS loaded doctors -->\n        </div>\n    </div>', content, flags=re.DOTALL)

            with open(filepath, "w", encoding='utf-8') as f:
                f.write(content)

print("Doctors form linked and CSS fixed.")
