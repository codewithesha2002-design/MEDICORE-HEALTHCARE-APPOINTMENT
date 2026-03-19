import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Doctor.module.scss';
import { Star, MapPin, Calendar, Activity } from 'lucide-react';

const DoctorSearch = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const query = new URLSearchParams(useLocation().search);
  const searchParam = query.get('search') || '';
  const specParam = query.get('specialization') || '';

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/doctors?search=${searchParam}&specialization=${specParam}`);
        setDoctors(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchDoctors();
  }, [searchParam, specParam]);

  if (loading) return <div style={{padding: '4rem', textAlign: 'center'}}>Loading specialists...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Find Your Doctor</h1>
        <p>Browse our verified medical specialists across the system</p>
      </div>

      <div className={styles.grid}>
        {doctors.length === 0 ? (
          <div className={styles.noResults}>No doctors found matching your criteria.</div>
        ) : (
          doctors.map(doctor => (
            <div key={doctor.id} className={`glass ${styles.docCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${doctor.name}`} alt={doctor.name} />
                </div>
                <div className={styles.docInfo}>
                  <h3>{doctor.name}</h3>
                  <span className={styles.specialBadge}><Activity size={12}/> {doctor.specialization}</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.infoRow}>
                  <MapPin size={16} /> <span>{doctor.hospital}, {doctor.location}</span>
                </div>
                <div className={styles.infoRow}>
                  <Star size={16} style={{color: '#f59e0b'}} /> <span>{doctor.rating} / 5.0 Rating</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <Link to={`/doctors/${doctor.id}`} className="btn btn-primary" style={{width: '100%'}}>
                  <Calendar size={18} /> Book Appointment
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorSearch;
