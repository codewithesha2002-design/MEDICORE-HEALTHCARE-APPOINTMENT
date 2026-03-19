const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    
    if (user && (await User.matchPassword(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await User.setOtp(email, otp, expiryDate);

    // Mock Email Send
    console.log(`[Mock Email] To: ${email} | Subject: Password Reset OTP | Body: Your OTP is ${otp}`);
    
    res.json({ message: 'OTP sent successfully (check console)' });
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp || new Date(user.otpExpiry).getTime() < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Clear OTP and log them in
    await User.clearOtp(email);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      message: 'OTP Verified successfully. You are now logged in.'
    });
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
};

const socialLoginStub = async (req, res) => {
  const { email, name, googleId, facebookId } = req.body;
  try {
    let user = await User.findByEmail(email);
    if (!user) {
      user = await User.create({ name, email, googleId, facebookId });
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { registerUser, authUser, forgotPassword, verifyOtp, socialLoginStub };
