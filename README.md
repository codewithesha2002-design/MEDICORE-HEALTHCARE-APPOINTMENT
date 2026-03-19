<img width="1798" height="867" alt="image" src="https://github.com/user-attachments/assets/a62fba20-7ddc-4f1e-afbf-9d346a3cbd7b" />
# 🏥 Medicore — Healthcare Appointment Platform

## Overview

Medicore is a full-stack healthcare platform built to streamline **doctor discovery, appointment scheduling, and emergency assistance**.

The system integrates secure authentication, role-based access control, multilingual support, and location-based emergency services within a modern, responsive interface.

---

## Key Features

### Authentication & Access Control

* Secure JWT-based authentication
* Role-based authorization (Patient, Admin)
* Protected API routes and dashboards

---

### Doctor Discovery

* Search doctors by specialization and location
* Structured doctor profiles
* Admin-controlled doctor management

---

### Appointment Management

* Seamless appointment booking workflow
* User-specific appointment tracking
* Centralized admin visibility

---

### Multilingual Support

* Internationalization using i18next
* Supported languages:

  * English
  * Hindi
  * Tamil

---

### Emergency Assistance

* Real-time geolocation integration
* Interactive maps powered by Leaflet
* Nearby healthcare facility detection
* Quick access actions for emergency services

---

### Administrative Dashboard

* Centralized management interface
* Control over:

  * Users
  * Doctors
  * Appointments
  * Helpdesk queries
* Restricted and secure access

---

## Technology Stack

**Frontend**

* React (Vite)
* SCSS (Glassmorphism UI)
* react-i18next
* react-leaflet

**Backend**

* Node.js
* Express.js
* MySQL
* JWT Authentication

---

## Database Design

Relational schema with the following core entities:

* Users
* Doctors
* Appointments
* Helpdesk

Database initialization is automated via `initDB()` with seeded doctor data for immediate usability.

---

## Project Structure

```
backend/
 ├── config/
 ├── controllers/
 ├── routes/

frontend/
 ├── src/
 │   ├── pages/
 │   ├── components/
 │   ├── i18n.js
 │   └── App.jsx
```

---

## Setup Instructions

### Clone Repository

```
git clone https://github.com/your-username/medicore.git
cd medicore
```

### Backend

```
cd backend
npm install
```

Create `.env`:

```
PORT=5000 #must change
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=medicore
JWT_SECRET=your_secret_key
```

Run:

```
npm run dev
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## API Overview

**Doctors**

* `GET /api/doctors`
* `POST /api/doctors` (Admin)

**Appointments**

* `GET /api/appointments`
* `POST /api/appointments`

---

## Validation Checklist

* Database initialization verified
* API endpoints functioning correctly
* Authentication and authorization enforced
* Multilingual support operational
* Appointment workflow tested
* Emergency module rendering accurately

---

## Disclaimer

This platform is intended for informational and operational purposes only.
It does not provide medical diagnosis or treatment recommendations.

---

## Future Scope

* Payment gateway integration
* Real-time availability tracking
* Telemedicine (video consultations)
* AI-powered assistance

---

## Author

Esha
Software Engineer

---

## License

MIT License
