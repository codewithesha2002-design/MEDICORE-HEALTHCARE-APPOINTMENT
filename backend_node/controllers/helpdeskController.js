const pool = require('../config/db');

const submitQuery = async (req, res) => {
  const { subject, message } = req.body;
  const userId = req.user ? req.user.id : null;

  try {
    const [result] = await pool.execute(
      'INSERT INTO helpdesk (userId, subject, message) VALUES (?, ?, ?)',
      [userId, subject, message]
    );
    res.status(201).json({ message: 'Query submitted successfully', ticketId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQueries = async (req, res) => {
  try {
    // If admin, show all. If user, show only theirs.
    // For now returning all to Admin, or filtering based on query params.
    const [queries] = await pool.execute('SELECT * FROM helpdesk ORDER BY created_at DESC');
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitQuery, getQueries };
