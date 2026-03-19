import codecs

filepath = r"C:\Users\kanik\.gemini\antigravity\brain\410fea6f-94e4-4420-98c2-9725edfa3572\walkthrough.md"
with codecs.open(filepath, "r", "utf-8") as f:
    content = f.read()

new_content = """

## Global Application Footer
Implemented a professional, unified `bg-dark` footer spanning all system pages (`index`, `doctors`, `booking`, `contact`, `dashboards`).
- **Contact Details**: Hard-bound custom support email and phone number per request.
- **Social Media Map**: Interlinked your personal Twitter, LinkedIn, GitHub, and Instagram endpoints!

### Watch the Footer Demo:
![Footer Subagent Recording](/C:/Users/kanik/.gemini/antigravity/brain/410fea6f-94e4-4420-98c2-9725edfa3572/footer_demo_1773931840755.webp)
"""

if "Global Application Footer" not in content:
    with codecs.open(filepath, "a", "utf-8") as f:
        f.write(new_content)

print("Walkthrough updated.")
