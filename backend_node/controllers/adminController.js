const pool = require('../config/db');

// @desc    Add a new doctor
// @route   POST /api/admin/doctors
// @access  Private/Admin
const addDoctor = async (req, res) => {
  const { name, specialization, hospital, location, availableSlots } = req.body;
  try {
    const slotsJSON = JSON.stringify(availableSlots || ["09:00 AM", "11:00 AM", "02:00 PM"]);
    const [result] = await pool.execute(
      'INSERT INTO doctors (name, specialization, hospital, location, availableSlots) VALUES (?, ?, ?, ?, ?)',
      [name, specialization, hospital, location, slotsJSON]
    );
    res.status(201).json({ message: 'Doctor added successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a doctor
// @route   DELETE /api/admin/doctors/:id
// @access  Private/Admin
const deleteDoctor = async (req, res) => {
  try {
    await pool.execute('DELETE FROM doctors WHERE id = ?', [req.params.id]);
    res.json({ message: 'Doctor removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const [users] = await pool.execute('SELECT id, name, email, role, created_at FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all appointments across system
// @route   GET /api/admin/appointments
// @access  Private/Admin
const getAllAppointments = async (req, res) => {
  try {
    const [appointments] = await pool.execute(`
      SELECT a.*, d.name AS doctorName, u.name AS userName 
      FROM appointments a
      JOIN doctors d ON a.doctorId = d.id
      LEFT JOIN users u ON a.patientId = u.id
      ORDER BY a.date DESC
    `);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addDoctor, deleteDoctor, getUsers, getAllAppointments };
