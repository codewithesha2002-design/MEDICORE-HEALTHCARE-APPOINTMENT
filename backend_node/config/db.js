const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'healthcare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection and initialize tables
const initDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL Connected successfully');
    
    // 1. Create Users Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255),
        googleId VARCHAR(255),
        facebookId VARCHAR(255),
        otp VARCHAR(6),
        otpExpiry DATETIME,
        role ENUM('Patient', 'Admin') DEFAULT 'Patient',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Create Doctors Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        specialization VARCHAR(255) NOT NULL,
        hospital VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        rating FLOAT DEFAULT 4.5,
        availableSlots JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Create Appointments Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        patientName VARCHAR(255) NOT NULL,
        patientId INT,
        doctorId INT,
        date DATE NOT NULL,
        time VARCHAR(50) NOT NULL,
        status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patientId) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (doctorId) REFERENCES doctors(id) ON DELETE CASCADE
      )
    `);

    // 4. Create Helpdesk Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS helpdesk (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status ENUM('Open', 'In Progress', 'Resolved') DEFAULT 'Open',
        response TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Seed dummy doctors if empty
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM doctors');
    if (rows[0].count === 0) {
      console.log('Seeding dummy doctors...');
      const slots = JSON.stringify(['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']);
      await connection.query(`
        INSERT INTO doctors (name, specialization, hospital, location, rating, availableSlots) VALUES 
        ('Dr. Sarah Jenkins', 'Cardiologist', 'City Heart Center', 'Downtown', 4.9, ?),
        ('Dr. Mark Otto', 'Dentist', 'Smile Clinic', 'Westside', 4.7, ?),
        ('Dr. Emily Chen', 'Dermatologist', 'SkinCare Pros', 'Uptown', 4.8, ?),
        ('Dr. Rajesh Kumar', 'Pediatrician', 'KidsCare Hospital', 'Eastside', 4.6, ?),
        ('Dr. Susan Boyle', 'Neurologist', 'Brain Institute', 'Downtown', 4.9, ?)
      `, [slots, slots, slots, slots, slots]);
    }

    // Seed an Admin user if none exists
    const [adminRows] = await connection.query('SELECT COUNT(*) as count FROM users WHERE role = "Admin"');
    if (adminRows[0].count === 0) {
      console.log('Seeding default Admin user...');
      const bcrypt = require('bcryptjs');
      const hash = await bcrypt.hash('admin123', 10);
      await connection.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Super Admin', 'admin@healthcare.com', hash, 'Admin']
      );
    }
    
    connection.release();
  } catch (err) {
    console.error('MySQL initialization error:', err.message);
  }
};

initDB();

module.exports = pool;
