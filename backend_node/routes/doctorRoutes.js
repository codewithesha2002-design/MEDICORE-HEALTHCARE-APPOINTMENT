const express = require('express');
const { getDoctors, getDoctorById } = require('../controllers/doctorController');

const router = express.Router();

router.route('/').get(getDoctors);
router.route('/:id').get(getDoctorById);

module.exports = router;
