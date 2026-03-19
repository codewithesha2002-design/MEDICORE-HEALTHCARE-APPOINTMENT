import os
import re

NAVBAR_HTML = """<nav class="navbar navbar-expand-lg fixed-top navbar-custom py-2 shadow-sm animate-fade-in bg-white">
        <div class="container-fluid px-4">
            <!-- [Logo] -->
            <a class="navbar-brand d-flex align-items-center me-4" href="index.html">
                <i class="fas fa-hospital-symbol fa-2x me-2" style="color: var(--primary-color);"></i>
                <span class="fs-4 fw-bolder" style="color: var(--primary-color); letter-spacing: -0.5px;">HealthCore</span>
            </a>

            <!-- Mobile Toggler -->
            <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarEnterprise">
                <i class="fas fa-bars fa-lg" style="color: var(--primary-color);"></i>
            </button>

            <!-- Navbar Content -->
            <div class="collapse navbar-collapse" id="navbarEnterprise">
                <!-- [Search Bar] -->
                <form class="d-flex me-auto my-2 my-lg-0" style="max-width: 350px; width: 100%;">
                    <div class="input-group">
                        <span class="input-group-text bg-light border-end-0 rounded-start-pill"><i class="fas fa-search text-muted"></i></span>
                        <input class="form-control bg-light border-start-0 rounded-end-pill shadow-none" type="search" placeholder="Search doctors, symptoms..." aria-label="Search">
                    </div>
                </form>

                <ul class="navbar-nav align-items-lg-center">
                    
                    <!-- [Specialties ▼] -->
                    <li class="nav-item dropdown me-2">
                        <a class="nav-link dropdown-toggle fw-semibold text-dark" href="#" role="button" data-bs-toggle="dropdown">
                            Specialties
                        </a>
                        <ul class="dropdown-menu border-0 shadow rounded-4 mt-2">
                            <li><a class="dropdown-item py-2 fw-semibold" href="doctors.html"><i class="fas fa-heartbeat me-2 text-danger"></i>Cardiology</a></li>
                            <li><a class="dropdown-item py-2 fw-semibold" href="doctors.html"><i class="fas fa-brain me-2 text-info"></i>Neurology</a></li>
                            <li><a class="dropdown-item py-2 fw-semibold" href="doctors.html"><i class="fas fa-baby me-2 text-warning"></i>Pediatrics</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item py-2 fw-bold text-primary-custom" href="doctors.html">View All Specialties</a></li>
                        </ul>
                    </li>

                    <!-- [Book Now] -->
                    <li class="nav-item me-2">
                        <a class="nav-link fw-semibold text-dark" href="booking.html">Book Now</a>
                    </li>

                    <!-- [My Appointments] -->
                    <li class="nav-item me-2">
                        <a class="nav-link fw-semibold text-dark" href="dashboard_patient.html">My Appointments</a>
                    </li>

                    <!-- [AI Assistant] -->
                    <li class="nav-item me-3">
                        <a class="btn btn-outline-primary-custom rounded-pill fw-bold px-3 py-1 btn-sm" href="#" data-bs-toggle="modal" data-bs-target="#aiModal">
                            <i class="fas fa-robot me-1"></i> Ask AI
                        </a>
                    </li>

                    <!-- [🔔] Notification Bell -->
                    <li class="nav-item me-3">
                        <a class="nav-link position-relative text-dark" href="#">
                            <i class="fas fa-bell fa-lg"></i>
                            <span class="position-absolute top-25 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                <span class="visually-hidden">New alerts</span>
                            </span>
                        </a>
                    </li>

                    <!-- [👤 Profile ▼] -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle d-flex align-items-center text-dark fw-semibold" href="#" role="button" data-bs-toggle="dropdown">
                            <img src="https://ui-avatars.com/api/?name=User&background=006d77&color=fff&rounded=true" alt="Profile" width="32" height="32" class="me-2 shadow-sm rounded-circle">
                            Profile
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow rounded-4 mt-2">
                            <li><a class="dropdown-item py-2 fw-semibold" href="dashboard_patient.html"><i class="fas fa-user-injured me-2 text-muted"></i>Patient Portal</a></li>
                            <li><a class="dropdown-item py-2 fw-semibold" href="dashboard_doctor.html"><i class="fas fa-user-md me-2 text-muted"></i>Doctor Portal</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item py-2 fw-bold text-danger" href="#"><i class="fas fa-sign-out-alt me-2"></i>Sign Out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>"""

MODAL_HTML = """
    <!-- AI Assistant Modal -->
    <div class="modal fade" id="aiModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-0 border-0 shadow-lg" style="border-radius: 20px; overflow: hidden;">
                <div class="modal-header border-0 bg-primary-custom text-white p-4">
                    <h5 class="modal-title fw-bold"><i class="fas fa-robot me-2 text-white"></i>Ask AI ML Assistant</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4" style="background: var(--silver-bg);">
                    <div class="chat-container mb-3 shadow-sm bg-white" id="chatContainer" style="height: 350px; border-radius: 15px;">
                        <div class="chat-message bot animate-fade-in">Hello! I am your ML Health Assistant. Describe your symptoms (e.g. 'I have a severe headache' or 'Chest pain'), and I will route you to the best specialist!</div>
                    </div>
                    <form id="ai-chat-form" class="d-flex">
                        <input type="text" class="form-control me-2 shadow-sm" id="symptomInput" placeholder="Describe your symptoms..." style="border-radius: 30px; padding: 12px 20px;" autocomplete="off">
                        <button type="submit" class="btn btn-primary-custom shadow-sm rounded-circle px-3 py-2"><i class="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        </div>
    </div>
"""

base_dir = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend"

for root, dirs, files in os.walk(base_dir):
    for filename in files:
        filepath = os.path.join(root, filename)
        if filename.endswith(".html"):
            with open(filepath, "r", encoding='utf-8') as f:
                content = f.read()
            
            # Replace the Navbar entirely safely using regex
            content = re.sub(r'<nav.*?</nav>', NAVBAR_HTML, content, flags=re.DOTALL)
            
            # Remove old static Smart Assistant section if it exists
            content = re.sub(r'<!-- Smart ML Assistant Section -->.*?<!-- Doctors Search Section -->', '<!-- Doctors Search Section -->', content, flags=re.DOTALL)
            
            # Inject Modal before "<!-- Scripts -->" if not exists
            if 'id="aiModal"' not in content:
                content = content.replace("<!-- Scripts -->", MODAL_HTML + "\n    <!-- Scripts -->")
            
            with open(filepath, "w", encoding='utf-8') as f:
                f.write(content)

print("Updated AI Modal across all files.")
