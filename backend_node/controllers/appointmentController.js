const pool = require('../config/db');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  const { patientName, doctorId, date, time } = req.body;
  
  try {
    // Basic validation
    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const patientId = req.user.id;

    // Check if slot is taken
    const [existing] = await pool.execute(
      'SELECT id FROM appointments WHERE doctorId = ? AND date = ? AND time = ?',
      [doctorId, date, time]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Time slot already booked for this doctor' });
    }

    const [result] = await pool.execute(
      'INSERT INTO appointments (patientName, patientId, doctorId, date, time, status) VALUES (?, ?, ?, ?, ?, "Confirmed")',
      [patientName || req.user.name, patientId, doctorId, date, time]
    );

    res.status(201).json({ message: 'Appointment booked successfully', appointmentId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user appointments
// @route   GET /api/appointments
// @access  Private
const getMyAppointments = async (req, res) => {
  try {
    const [appointments] = await pool.execute(`
      SELECT a.*, d.name AS doctorName, d.specialization, d.hospital, d.location 
      FROM appointments a
      JOIN doctors d ON a.doctorId = d.id
      WHERE a.patientId = ?
      ORDER BY a.date DESC
    `, [req.user.id]);
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAppointment, getMyAppointments };
