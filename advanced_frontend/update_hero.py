import codecs

filepath = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend\index.html"
with codecs.open(filepath, "r", "utf-8") as f:
    content = f.read()

# Revert previous mistaken replacement in login block if it exists
mistake_line1 = '<div class="glass-panel p-2 text-center mb-4" style="border-radius: 30px; overflow: hidden; max-height: 500px;">'
mistake_line2 = '<img src="images/healthcare.jpg" alt="Healthcare Cover" class="img-fluid w-100 h-100 object-fit-cover shadow-sm" style="border-radius: 20px;">'
mistake_line3 = '</div>'

# We'll just carefully replace the flaticon string
old_hero = '<img src="https://cdn-icons-png.flaticon.com/512/3305/3305803.png" alt="Doctor 3D" class="img-fluid w-75 drop-shadow" style="filter: drop-shadow(0 20px 20px rgba(0,0,0,0.15));">'
new_hero = '<div style="border-radius: 30px; overflow: hidden; border: 4px solid white; box-shadow: 0 15px 35px rgba(0,109,119,0.2);"><img src="images/healthcare.jpg" alt="Healthcare Professional" class="img-fluid w-100 h-100 object-fit-cover" style="max-height: 450px;"></div>'

content = content.replace(old_hero, new_hero)

with codecs.open(filepath, "w", "utf-8") as f:
    f.write(content)

print("Hero image updated.")
