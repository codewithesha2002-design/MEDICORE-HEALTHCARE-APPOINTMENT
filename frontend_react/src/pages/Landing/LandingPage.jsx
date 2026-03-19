import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './LandingPage.module.scss';
import { Search, MapPin, Stethoscope, Heart, Activity } from 'lucide-react';

const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/doctors?search=${searchQuery}&location=${location}`);
  };

  const categories = [
    { name: 'Dentist', icon: <Activity /> },
    { name: 'Cardiologist', icon: <Heart /> },
    { name: 'Dermatologist', icon: <Stethoscope /> },
    { name: 'Pediatrician', icon: <Activity /> },
    { name: 'Neurologist', icon: <Heart /> }
  ];

  return (
    <div className={styles.landingContainer}>
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={`glass ${styles.heroCard} animate-fade-in`}>
          <div className={styles.heroBadge}>Health Platform</div>
          <h1>{t('hero.title', 'Book Your Doctor Appointment Easily')}</h1>
          <p>{t('hero.subtitle', 'Premium healthcare network for you and your family.')}</p>

          <form onSubmit={handleSearch} className={styles.searchBar}>
            <div className={styles.inputWrapper}>
              <Search size={20} className={styles.icon} />
              <input 
                type="text" 
                placeholder="Search Doctors..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.inputWrapper}>
              <MapPin size={20} className={styles.icon} />
              <input 
                type="text" 
                placeholder="Location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categorySection}>
        <h2>Top Specialties</h2>
        <div className={styles.categoryGrid}>
          {categories.map(cat => (
            <div 
              key={cat.name} 
              className={`glass ${styles.categoryCard}`}
              onClick={() => navigate(`/doctors?specialization=${cat.name}`)}
            >
              <div className={styles.catIcon}>{cat.icon}</div>
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Hospitals (Summary) */}
      <section className={styles.hospitalSection}>
        <div className={styles.hospitalHeader}>
          <h2>Emergency Mapping</h2>
          <button className="btn btn-outline" onClick={() => navigate('/emergency')}>View Full Map</button>
        </div>
        <div className={styles.hospitalPreview}>
          <div className={styles.mockMapArea}>
             <MapPin className={styles.mapPinIcon} size={48} />
             <p>Live GPS Integrations loaded via Leaflet</p>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default LandingPage;
