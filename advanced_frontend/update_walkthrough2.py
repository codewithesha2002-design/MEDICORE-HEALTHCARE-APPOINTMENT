import codecs

filepath = r"C:\Users\kanik\.gemini\antigravity\brain\410fea6f-94e4-4420-98c2-9725edfa3572\walkthrough.md"

new_content = """

## Interactive Doctor Dashboard
The `dashboard_doctor.html` interface now features interactive JavaScript integration:
- **Appointment Management**: Doctors can click "Accept" on pending rows, immediately updating the status badge to a green "Accepted" state.
- **Patient Records**: Clicking "View Record" launches a beautifully designed Bootstrap Modal pane generating the selected patient's specific symptoms, randomized age, and UI-Avatars mapped to their name.
- **Profile Customization**: Doctors possess an "Edit Profile" button to bring up a Settings Modal supporting Live Profile Photo Uploads via `FileReader`, Name, Age, and Address data modification linked back to their UI displays.

### Watch the Dashboard Demo:
![Dashboard Features](/C:/Users/kanik/.gemini/antigravity/brain/410fea6f-94e4-4420-98c2-9725edfa3572/dashboard_logic_1773932641964.webp)
"""

with codecs.open(filepath, "a", "utf-8") as f:
    f.write(new_content)

print("Dashboard Walkthrough updated.")
