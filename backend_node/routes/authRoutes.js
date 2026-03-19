const express = require('express');
const { registerUser, authUser, forgotPassword, verifyOtp, socialLoginStub } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/social', socialLoginStub);

module.exports = router;
