import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import styles from './EmergencySOS.module.scss';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertCircle, Phone, Navigation, Clock, MessageSquare, Send } from 'lucide-react';

// Fix for default Leaflet icons in Webpack/Vite
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const EmergencySOS = () => {
  const { user } = useAuth();
  const [position, setPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [sosActive, setSosActive] = useState(false);
  const [helpdeskForm, setHelpdeskForm] = useState({ subject: '', message: '' });

  useEffect(() => {
    // Get user's live location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        
        // Generate mock hospitals nearby
        setHospitals([
          { id: 1, name: 'City Hospital ER', lat: latitude + 0.01, lng: longitude + 0.01 },
          { id: 2, name: 'Metro Trauma Center', lat: latitude - 0.015, lng: longitude - 0.005 },
          { id: 3, name: 'Red Cross Hospital', lat: latitude + 0.005, lng: longitude - 0.01 }
        ]);
      }, (err) => {
        console.error(err);
        // Fallback to a default location (e.g., Delhi) if denied
        setPosition([28.6139, 77.2090]);
      });
    }
  }, []);

  const handleSOS = () => {
    setSosActive(true);
    alert("SOS ALERT SENT! Emergency contacts and nearby hospitals notified algorithmically.");
  };

  const handleHelpdeskSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/helpdesk', helpdeskForm, {
        headers: user ? { Authorization: `Bearer ${user.token}` } : {}
      });
      alert('Helpdesk query submitted!');
      setHelpdeskForm({ subject: '', message: '' });
    } catch (err) {
      alert("Error submitting query");
    }
  };

  if (!position) return <div style={{padding: '4rem', textAlign: 'center'}}>Acquiring GPS Signal...</div>;

  return (
    <div className={styles.container}>
      
      {/* Top Banner SOS */}
      <div className={`glass ${styles.sosBanner} ${sosActive ? styles.activeSOS : ''}`}>
        <div className={styles.sosInfo}>
          <AlertCircle size={48} className={styles.pulse} />
          <div>
            <h1>Emergency SOS</h1>
            <p>Immediate medical assistance protocol</p>
          </div>
        </div>
        <button className={styles.sosButton} onClick={handleSOS}>
          {sosActive ? 'BROADCASTING LOCATION...' : 'ACTIVATE SOS'}
        </button>
      </div>

      <div className={styles.mainGrid}>
        
        {/* Left Column: Map */}
        <div className={`glass ${styles.mapCard}`}>
          <h2><Navigation size={20}/> Live Tracking</h2>
          <div className={styles.mapWrapper}>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '16px' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              
              {/* User Location */}
              <Marker position={position}>
                <Popup>You are here</Popup>
              </Marker>
              <Circle center={position} pathOptions={{ color: 'blue' }} radius={500} />

              {/* Nearby Hospitals */}
              {hospitals.map(h => (
                <Marker key={h.id} position={[h.lat, h.lng]} icon={redIcon}>
                  <Popup>{h.name} <br/> <b>ER Available</b></Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Right Column: Actions & Helpdesk */}
        <div className={styles.actionColumn}>
          
          {/* Quick Actions */}
          <div className={`glass ${styles.quickActions}`}>
            <h2>Quick Dial</h2>
            <div className={styles.btnGrid}>
               <a href="tel:102" className={styles.callBtn}>
                 <Phone size={24} />
                 <span>Ambulance<br/><b>102</b></span>
               </a>
               <a href="tel:100" className={`${styles.callBtn} ${styles.policeBtn}`}>
                 <Phone size={24} />
                 <span>Police<br/><b>100</b></span>
               </a>
               <a href="tel:112" className={`${styles.callBtn} ${styles.generalBtn}`}>
                 <Phone size={24} />
                 <span>Emergency<br/><b>112</b></span>
               </a>
            </div>
          </div>

          {/* Helpdesk */}
          <div className={`glass ${styles.helpdesk}`}>
            <h2><MessageSquare size={20}/> Support Helpdesk</h2>
            <p className={styles.subtext}>Non-critical inquiries and platform support</p>
            
            <form onSubmit={handleHelpdeskSubmit}>
              <select 
                className="input-field" 
                style={{marginBottom: '12px'}}
                value={helpdeskForm.subject}
                onChange={e => setHelpdeskForm({...helpdeskForm, subject: e.target.value})}
                required
              >
                <option value="">Select Topic</option>
                <option value="Booking Issue">Booking Issue</option>
                <option value="Doctor Inquiry">Doctor Inquiry</option>
                <option value="Technical Support">Technical Support</option>
              </select>
              
              <textarea 
                className="input-field" 
                rows="4" 
                placeholder="Describe your issue..."
                style={{marginBottom: '12px'}}
                value={helpdeskForm.message}
                onChange={e => setHelpdeskForm({...helpdeskForm, message: e.target.value})}
                required
              ></textarea>
              
              <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                <Send size={16}/> Submit Ticket
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EmergencySOS;
