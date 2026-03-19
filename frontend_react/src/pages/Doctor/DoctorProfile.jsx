import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import styles from './Doctor.module.scss';
import { MapPin, Star, Calendar, Clock, CheckCircle } from 'lucide-react';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState(''); // 'confirming', 'success', 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/doctors/${id}`);
        setDoctor(data);
        // Default select today
        setSelectedDate(new Date().toISOString().split('T')[0]);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchDoc();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      alert("Please login to book an appointment.");
      return navigate('/auth');
    }
    if (!selectedTime) return alert("Please select a time slot.");

    setBookingStatus('confirming');
    try {
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
      await axios.post('http://localhost:5000/api/appointments', 
        { doctorId: doctor.id, date: selectedDate, time: selectedTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookingStatus('success');
    } catch (err) {
      setBookingStatus('error');
      setErrorMsg(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div style={{padding: '4rem', textAlign: 'center'}}>Loading profile...</div>;
  if (!doctor) return <div style={{textAlign: 'center', padding: '4rem'}}>Doctor not found.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.profileLayout}>
        
        {/* Left Column: Doctor Details */}
        <div className={`glass ${styles.profileCard}`}>
           <div className={styles.profileHeaderBig}>
              <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${doctor.name}`} alt={doctor.name} className={styles.bigAvatar} />
              <div>
                <h1>{doctor.name}</h1>
                <p className={styles.specTitle}>{doctor.specialization}</p>
                
                <div className={styles.badgeGroup}>
                  <span className={styles.ratingBadge}><Star size={14} fill="currentColor"/> {doctor.rating}</span>
                  <span className={styles.locationBadge}><MapPin size={14}/> {doctor.hospital}, {doctor.location}</span>
                </div>
              </div>
           </div>
           
           <div className={styles.aboutSection}>
              <h2>About Doctor</h2>
              <p>Highly experienced {doctor.specialization} serving at {doctor.hospital}. Committed to providing exceptional patient care and utilizing advanced medical technologies.</p>
           </div>
        </div>

        {/* Right Column: Booking Wizard */}
        <div className={`glass ${styles.bookingWizard}`}>
          {bookingStatus === 'success' ? (
            <div className={styles.successState}>
              <CheckCircle size={64} className={styles.successIcon} />
              <h2>Booking Confirmed!</h2>
              <p>Your appointment with {doctor.name} on {selectedDate} at {selectedTime} is scheduled.</p>
              <button className="btn btn-primary" onClick={() => navigate('/')}>Return Home</button>
            </div>
          ) : (
            <>
              <h2>Book Appointment</h2>
              
              <div className={styles.wizardGroup}>
                <label className="label"><Calendar size={16}/> Select Date</label>
                <input 
                  type="date" 
                  className="input-field" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className={styles.wizardGroup}>
                <label className="label"><Clock size={16}/> Available Slots</label>
                <div className={styles.slotGrid}>
                  {doctor.availableSlots ? doctor.availableSlots.map(time => (
                    <button 
                      key={time} 
                      className={`${styles.slotBtn} ${selectedTime === time ? styles.slotSelected : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  )) : <p>No slots available</p>}
                </div>
              </div>

              {bookingStatus === 'error' && <p style={{color: 'red', fontSize: '0.9rem'}}>{errorMsg}</p>}

              <button 
                className="btn btn-primary" 
                style={{width: '100%', marginTop: '1rem', padding: '16px'}}
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || bookingStatus === 'confirming'}
              >
                {bookingStatus === 'confirming' ? 'Processing...' : 'Confirm Appointment'}
              </button>
            </>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default DoctorProfile;
