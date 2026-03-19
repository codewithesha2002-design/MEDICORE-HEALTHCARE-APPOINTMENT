const express = require('express');
const { addDoctor, deleteDoctor, getUsers, getAllAppointments } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware to ensure admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

router.post('/doctors', protect, adminOnly, addDoctor);
router.delete('/doctors/:id', protect, adminOnly, deleteDoctor);
router.get('/users', protect, adminOnly, getUsers);
router.get('/appointments', protect, adminOnly, getAllAppointments);

module.exports = router;
