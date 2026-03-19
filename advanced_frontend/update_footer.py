import os
import re

base_dir = r"c:\Users\kanik\OneDrive\Desktop\Healthcare Appointment Booking\advanced_frontend"

footer_only = """
    <!-- Footer -->
    <footer class="bg-dark text-light pt-5 pb-4 mt-5">
        <div class="container text-center text-md-start">
            <div class="row text-center text-md-start">
                
                <!-- About -->
                <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
                    <h5 class="text-uppercase mb-4 fw-bold" style="color: var(--primary-color);">About</h5>
                    <p class="text-white-50">Providing reliable healthcare services for you & your family.</p>
                </div>

                <!-- Links -->
                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h5 class="text-uppercase mb-4 fw-bold" style="color: var(--primary-color);">Links</h5>
                    <p><a href="index.html" class="text-white-50 text-decoration-none">Home</a></p>
                    <p><a href="#" class="text-white-50 text-decoration-none">Services</a></p>
                    <p><a href="doctors.html" class="text-white-50 text-decoration-none">Doctors</a></p>
                    <p><a href="booking.html" class="text-white-50 text-decoration-none">Appointments</a></p>
                </div>

                <!-- Contact -->
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h5 class="text-uppercase mb-4 fw-bold" style="color: var(--primary-color);">Contact</h5>
                    <p class="text-white-50"><i class="fas fa-envelope me-3"></i> support@medicore.com</p>
                    <p class="text-white-50"><i class="fas fa-phone me-3"></i> +91-XXXX-XXXX</p>
                </div>
            </div>

            <hr class="mb-4" style="border-color: rgba(255,255,255,0.1);">

            <!-- Social Media & Copyright -->
            <div class="row align-items-center">
                <div class="col-md-7 col-lg-8">
                    <p class="text-white-50 mb-0">© 2026 Medicore Healthcare. All rights reserved.</p>
                </div>
                <div class="col-md-5 col-lg-4 text-center text-md-end mt-3 mt-md-0">
                    <a href="#" class="btn btn-outline-light btn-floating btn-sm m-1 rounded-circle border-0"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="btn btn-outline-light btn-floating btn-sm m-1 rounded-circle border-0"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="btn btn-outline-light btn-floating btn-sm m-1 rounded-circle border-0"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#" class="btn btn-outline-light btn-floating btn-sm m-1 rounded-circle border-0"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </footer>
"""

for root, dirs, files in os.walk(base_dir):
    for filename in files:
        if filename.endswith(".html"):
            filepath = os.path.join(root, filename)
            with open(filepath, "r", encoding='utf-8') as f:
                content = f.read()
            
            if "<!-- Footer -->" in content:
                content = re.sub(r'<!-- Footer -->.*?</footer>', '', content, flags=re.DOTALL)
                
            if '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>' in content:
                 script_point = '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>'
                 content = content.replace(script_point, footer_only + '\n    ' + script_point)
            else:
                 content = content.replace('</body>', footer_only + '\n</body>')

            with open(filepath, "w", encoding='utf-8') as f:
                f.write(content)

print("Footer injected globally.")
