const pool = require('../config/db');

// @desc    Get all doctors & search by specialization/location
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  const { specialization, search } = req.query;
  try {
    let query = 'SELECT * FROM doctors WHERE 1=1';
    const queryParams = [];

    if (specialization) {
      query += ' AND specialization = ?';
      queryParams.push(specialization);
    }
    
    if (search) {
      query += ' AND (name LIKE ? OR location LIKE ? OR hospital LIKE ?)';
      const searchWildcard = `%${search}%`;
      queryParams.push(searchWildcard, searchWildcard, searchWildcard);
    }

    const [doctors] = await pool.execute(query, queryParams);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    const [doctor] = await pool.execute('SELECT * FROM doctors WHERE id = ?', [req.params.id]);
    if (doctor.length > 0) {
      res.json(doctor[0]);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDoctors, getDoctorById };
