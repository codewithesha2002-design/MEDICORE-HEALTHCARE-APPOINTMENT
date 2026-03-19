const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// Import DB pool so the initialization runs
const pool = require('./backend/config/db');
const authRoutes = require('./backend/routes/authRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const doctorRoutes = require('./backend/routes/doctorRoutes');
const appointmentRoutes = require('./backend/routes/appointmentRoutes');
const adminRoutes = require('./backend/routes/adminRoutes');
const helpdeskRoutes = require('./backend/routes/helpdeskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/helpdesk', helpdeskRoutes);

app.get('/', (req, res) => {
  res.send('MySQL Healthcare Auth API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
