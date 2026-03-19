const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  // Find a user by email
  findByEmail: async (email) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  // Create a new user
  create: async (userData) => {
    const { name, email, password, googleId = null, facebookId = null } = userData;
    let hashedPassword = password;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, googleId, facebookId) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, googleId, facebookId]
    );
    
    // Return the newly inserted user
    const [newUser] = await pool.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);
    return newUser[0];
  },

  // Update OTP
  setOtp: async (email, otp, expiryDate) => {
    await pool.execute(
      'UPDATE users SET otp = ?, otpExpiry = ? WHERE email = ?',
      [otp, expiryDate, email]
    );
  },

  // Clear OTP
  clearOtp: async (email) => {
    await pool.execute(
      'UPDATE users SET otp = NULL, otpExpiry = NULL WHERE email = ?',
      [email]
    );
  },

  // Compare passwords
  matchPassword: async (enteredPassword, storedHash) => {
    if (!storedHash) return false;
    return await bcrypt.compare(enteredPassword, storedHash);
  }
};

module.exports = User;
