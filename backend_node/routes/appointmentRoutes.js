const express = require('express');
const { createAppointment, getMyAppointments } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createAppointment)
  .get(protect, getMyAppointments);

module.exports = router;
