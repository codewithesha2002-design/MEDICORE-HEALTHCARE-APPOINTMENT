import os

base_dir = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend"

for root, dirs, files in os.walk(base_dir):
    for filename in files:
        if filename.endswith(".html"):
            filepath = os.path.join(root, filename)
            with open(filepath, "r", encoding='utf-8') as f:
                content = f.read()
            
            # Replace empty href="#" for Services with a link to the doctors section on the home page
            # which acts as the main services showcase
            content = content.replace(
                '<p><a href="#" class="text-white-50 text-decoration-none">Services</a></p>',
                '<p><a href="index.html#doctors" class="text-white-50 text-decoration-none">Services</a></p>'
            )

            with open(filepath, "w", encoding='utf-8') as f:
                f.write(content)

print("Service link updated.")
