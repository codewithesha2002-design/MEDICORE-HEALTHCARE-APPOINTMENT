const express = require('express');
const { submitQuery, getQueries } = require('../controllers/helpdeskController');

const router = express.Router();

// Public can submit, but let's encourage logged-in users or handle both via the controller
router.post('/', submitQuery);
router.get('/', getQueries); // Ideally protected for Admin

module.exports = router;
