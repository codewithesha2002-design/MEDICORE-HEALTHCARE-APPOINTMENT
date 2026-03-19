import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.scss';
import { Activity, Globe, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  
  // Use useEffect to test i18n loads properly.
  useEffect(() => {}, [i18n.language]);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <Activity size={28} className={styles.icon} />
          <span>CareBooking</span>
        </Link>
        
        <div className={styles.links}>
          <Link to="/" className={styles.link}>{t('nav.home')}</Link>
          <Link to="/doctors" className={styles.link}>{t('nav.findDoctor')}</Link>
          <Link to="/emergency" className={`${styles.link} ${styles.danger}`}>{t('nav.map')}</Link>
        </div>

        <div className={styles.actions}>
          <div className={styles.langSwitch}>
            <Globe size={18} />
            <select onChange={changeLanguage} defaultValue={i18n.language}>
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="ta">TA</option>
            </select>
          </div>
          
          {user ? (
            <div className={styles.userMenu}>
              <span className={styles.greeting}>Hi, {user.name}</span>
              {user.role === 'Admin' && <Link to="/admin" className={styles.btnOutline}>Admin</Link>}
              <button onClick={logout} className="btn btn-outline" style={{padding: '6px 16px', fontSize: '0.9rem'}}>Logout</button>
            </div>
          ) : (
            <Link to="/auth" className={`btn btn-primary ${styles.loginBtn}`}>
              <UserIcon size={18} /> {t('nav.login')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
