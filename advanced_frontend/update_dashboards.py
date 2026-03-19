import os
import re

filepath = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend\dashboard_doctor.html"
with open(filepath, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Wire the Accept buttons
html = html.replace(
    '<button class="btn btn-sm btn-success px-3 me-2">Accept</button>',
    '<button class="btn btn-sm btn-success px-3 me-2 accept-btn">Accept</button>'
)

# 2. Wire the View Record buttons
html = html.replace(
    '<button class="btn btn-sm btn-outline-primary">View Record</button>',
    '<button class="btn btn-sm btn-outline-primary view-btn">View Record</button>'
)

# 3. Add Edit Profile Button next to "Today's Schedule"
header_target = '<h2 class="fw-bold mb-4 animate-fade-in" style="color: var(--primary-blue);">Today\'s Schedule</h2>'
header_replace = """        <div class="d-flex justify-content-between align-items-center mb-4 animate-fade-in">
            <h2 class="fw-bold mb-0" style="color: var(--primary-color);">Today's Schedule</h2>
            <button class="btn btn-primary-custom rounded-pill shadow-sm" data-bs-toggle="modal" data-bs-target="#editProfileModal">
                <i class="fas fa-user-edit me-2"></i>Edit Profile
            </button>
        </div>"""
if header_target in html:
    html = html.replace(header_target, header_replace)

# 4. Inject the Modals before the Footer
modals_html = """
    <!-- Patient Record Modal -->
    <div class="modal fade" id="patientRecordModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-4" style="border-radius: 20px;">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold" style="color: var(--primary-color);"><i class="fas fa-notes-medical me-2"></i>Patient Record</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-4">
                        <img src="https://ui-avatars.com/api/?name=Patient&background=random" id="modalPatientImage" class="rounded-circle shadow-sm mb-3" style="width: 100px; height: 100px; object-fit: cover;">
                        <h4 class="fw-bold mb-0" id="modalPatientName">Patient Name</h4>
                        <p class="text-muted" id="modalPatientAge">Age: 35 | Blood Group: O+</p>
                    </div>
                    <div class="bg-light p-3 rounded-4 mb-3">
                        <h6 class="fw-bold text-dark">Address Details</h6>
                        <p class="mb-0 text-secondary" id="modalPatientAddress">123 Health Ave, Medical City, HC 40291</p>
                    </div>
                    <div class="bg-light p-3 rounded-4">
                        <h6 class="fw-bold text-dark">Reported Symptoms</h6>
                        <p class="mb-0 text-secondary" id="modalPatientSymptoms">Fever, headache, body pain.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Profile Modal -->
    <div class="modal fade" id="editProfileModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-4" style="border-radius: 20px;">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold" style="color: var(--primary-color);"><i class="fas fa-user-cog me-2"></i>Edit My Profile</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="editProfileForm">
                        <div class="mb-3 text-center">
                            <img src="https://ui-avatars.com/api/?name=Dr+Sarah&background=006d77&color=fff" id="profilePreview" class="rounded-circle shadow-sm mb-3 border border-3" style="width: 100px; height: 100px; object-fit: cover; border-color: var(--primary-color) !important;">
                            <input type="file" class="form-control form-control-sm rounded-pill" id="profileImageInput" accept="image/*">
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Full Name</label>
                            <input type="text" class="form-control rounded-pill" id="profileName" value="Dr. Sarah Johnson" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-secondary fw-semibold">Age</label>
                            <input type="number" class="form-control rounded-pill" id="profileAge" value="42" required>
                        </div>
                        <div class="mb-4">
                            <label class="form-label text-secondary fw-semibold">Clinic / Hospital Address</label>
                            <textarea class="form-control rounded-4" id="profileAddress" rows="2" required>456 Care Lane, Downtown Medical Center</textarea>
                        </div>
                        <button type="submit" class="btn btn-primary-custom w-100 rounded-pill shadow-sm py-2">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
"""

# Inject right before footer
if "<!-- Footer -->" in html:
    html = html.replace("<!-- Footer -->", modals_html + "\n    <!-- Footer -->")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(html)


# Now update app.js to include logic
app_js_path = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend\js\app.js"
with open(app_js_path, "r", encoding="utf-8") as f:
    app_js = f.read()

dashboard_logic = """
    // 4. Dashboard Logic (Accept / View Record)
    const acceptBtns = document.querySelectorAll('.accept-btn');
    acceptBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tr = e.target.closest('tr');
            const badge = tr.querySelector('.badge');
            badge.className = 'badge bg-success text-white';
            badge.textContent = 'Accepted';
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-check"></i> Confirmed';
        });
    });

    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tr = e.target.closest('tr');
            const name = tr.cells[1].textContent.trim();
            const symptoms = tr.cells[2].textContent.trim();
            
            document.getElementById('modalPatientName').textContent = name;
            document.getElementById('modalPatientSymptoms').textContent = symptoms;
            document.getElementById('modalPatientImage').src = 'https://ui-avatars.com/api/?name=' + name.replace(' ', '+') + '&background=random';
            
            // Randomize age slightly for realism based on name length
            document.getElementById('modalPatientAge').textContent = 'Age: ' + (20 + name.length * 2) + ' | Blood Group: O+';
            
            const recordModal = new bootstrap.Modal(document.getElementById('patientRecordModal'));
            recordModal.show();
        });
    });

    // 5. Edit Profile Logic
    const profileForm = document.getElementById('editProfileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = document.getElementById('profileName').value;
            // Fake Save - just update DOM elements that reflect user name
            const welcomeText = document.querySelector('.ms-auto.text-primary.fw-bold');
            if (welcomeText) welcomeText.textContent = 'Welcome, ' + newName;
            
            const btnClose = document.querySelector('#editProfileModal .btn-close');
            if(btnClose) btnClose.click();
            
            // Show Success Notification somehow or just alert
            setTimeout(() => { alert("Profile saved successfully!"); }, 300);
        });

        // Image Preview Logic
        const imageInput = document.getElementById('profileImageInput');
        if (imageInput) {
            imageInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                         document.getElementById('profilePreview').src = e.target.result;
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
    }
"""

if "// 4. Dashboard Logic" not in app_js:
    # Insert before the last closing });
    app_js = app_js.rsplit('});', 1)
    app_js = app_js[0] + dashboard_logic + '\n});\n'
    
    with open(app_js_path, "w", encoding="utf-8") as f:
        f.write(app_js)

print("Dashboard interactivity and Edit Profile complete.")
