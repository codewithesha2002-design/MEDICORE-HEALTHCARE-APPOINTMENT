document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const alertBox = document.getElementById('booking-alert');
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
            
            const appointmentData = {
                patient_name: document.getElementById('patient_name').value,
                patient_email: document.getElementById('patient_email').value,
                patient_phone: document.getElementById('patient_phone').value,
                doctor_name: document.getElementById('doctor_name').value,
                appointment_date: document.getElementById('appointment_date').value,
                appointment_time: document.getElementById('appointment_time').value + ':00',
                symptoms: document.getElementById('symptoms').value
            };

            try {
                const response = await fetch('http://127.0.0.1:8000/api/appointments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(appointmentData)
                });

                if (response.ok) {
                    const data = await response.json();
                    alertBox.className = 'alert alert-success';
                    alertBox.textContent = `Success! Appointment booked for ${data.patient_name} with ${data.doctor_name}.`;
                    alertBox.classList.remove('d-none');
                    bookingForm.reset();
                } else {
                    const errorData = await response.json();
                    alertBox.className = 'alert alert-danger';
                    alertBox.textContent = `Failed to book: ${errorData.detail || 'Unknown error'}`;
                    alertBox.classList.remove('d-none');
                }
            } catch (error) {
                alertBox.className = 'alert alert-danger';
                alertBox.textContent = 'Server connection error. Ensure the Python backend is running.';
                alertBox.classList.remove('d-none');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Confirm Booking';
                setTimeout(() => alertBox.classList.add('d-none'), 5000);
            }
        });
    }

    // Dashboard logic
    const appointmentsTable = document.getElementById('appointments-body');
    if (appointmentsTable) {
        loadAppointments();
    }

    async function loadAppointments() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/appointments');
            if (response.ok) {
                const appointments = await response.json();
                appointmentsTable.innerHTML = '';
                
                if (appointments.length === 0) {
                    appointmentsTable.innerHTML = '<tr><td colspan="7" class="text-center">No appointments found.</td></tr>';
                    return;
                }

                appointments.forEach(apt => {
                    const row = `
                        <tr>
                            <td>#${apt.id}</td>
                            <td>${apt.patient_name}</td>
                            <td>${apt.doctor_name}</td>
                            <td>${apt.appointment_date}</td>
                            <td>${apt.appointment_time}</td>
                            <td>${apt.patient_phone}</td>
                            <td>
                                <span class="badge bg-success">Confirmed</span>
                            </td>
                        </tr>
                    `;
                    appointmentsTable.innerHTML += row;
                });
            }
        } catch (error) {
            appointmentsTable.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Failed to load appointments. Server offline?</td></tr>';
        }
    }
});
