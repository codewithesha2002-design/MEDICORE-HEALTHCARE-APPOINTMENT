import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminPanel.module.scss';
import { Users, Activity, Calendar, HelpCircle, Plus, Trash2 } from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [stats, setStats] = useState({ users: 0, appointments: 0, queries: 0 });
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  // New Doctor Form
  const [docForm, setDocForm] = useState({ name: '', specialization: '', hospital: '', location: '' });

  const fetchTab = async (tab) => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      let res;
      if (tab === 'users') res = await axios.get('http://localhost:5000/api/admin/users', config);
      if (tab === 'appointments') res = await axios.get('http://localhost:5000/api/admin/appointments', config);
      if (tab === 'doctors') res = await axios.get('http://localhost:5000/api/doctors');
      if (tab === 'helpdesk') res = await axios.get('http://localhost:5000/api/helpdesk', config);
      setDataList(res ? res.data : []);
      
      // Update quick stats if returning to dashboard
      if (tab === 'dashboard') {
        const u = await axios.get('http://localhost:5000/api/admin/users', config);
        const a = await axios.get('http://localhost:5000/api/admin/appointments', config);
        const h = await axios.get('http://localhost:5000/api/helpdesk', config);
        setStats({ users: u.data.length, appointments: a.data.length, queries: h.data.length });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.token) fetchTab(activeTab);
  }, [activeTab, user]);

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/doctors', docForm, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert("Doctor Added Successfully");
      setDocForm({ name: '', specialization: '', hospital: '', location: '' });
      fetchTab('doctors');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding doctor');
    }
  };

  const handeDeleteDoctor = async (id) => {
    if(!window.confirm("Delete this doctor?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/doctors/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchTab('doctors');
    } catch (err) {
      alert(err.message);
    }
  }

  const renderContent = () => {
    if (loading) return <div>Loading records...</div>;

    switch(activeTab) {
      case 'dashboard':
        return (
          <div className={styles.statsGrid}>
            <div className={`glass ${styles.statCard}`}>
              <Users size={32} />
              <div><h3>Total Users</h3><p>{stats.users}</p></div>
            </div>
            <div className={`glass ${styles.statCard}`}>
              <Calendar size={32} />
              <div><h3>Appointments</h3><p>{stats.appointments}</p></div>
            </div>
            <div className={`glass ${styles.statCard}`}>
              <HelpCircle size={32} />
              <div><h3>Open Queries</h3><p>{stats.queries}</p></div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className={`glass ${styles.tableCard}`}>
            <h2>Registered Users</h2>
            <table className={styles.table}>
              <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr></thead>
              <tbody>
                {dataList.map(u => (
                  <tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'doctors':
        return (
          <div className={styles.docManagement}>
            <div className={`glass ${styles.tableCard}`}>
              <h2>Platform Doctors</h2>
              <table className={styles.table}>
                <thead><tr><th>Name</th><th>Specialty</th><th>Hospital</th><th>Actions</th></tr></thead>
                <tbody>
                  {dataList.map(d => (
                    <tr key={d.id}><td>{d.name}</td><td>{d.specialization}</td><td>{d.hospital}</td>
                      <td><button onClick={() => handeDeleteDoctor(d.id)} className={styles.iconBtn}><Trash2 size={16}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <form onSubmit={handleAddDoctor} className={`glass ${styles.addDocForm}`}>
              <h2>Add Doctor</h2>
              <input required type="text" className="input-field" placeholder="Dr. Name" value={docForm.name} onChange={e=>setDocForm({...docForm, name: e.target.value})} />
              <input required type="text" className="input-field" placeholder="Specialization" value={docForm.specialization} onChange={e=>setDocForm({...docForm, specialization: e.target.value})} />
              <input required type="text" className="input-field" placeholder="Hospital" value={docForm.hospital} onChange={e=>setDocForm({...docForm, hospital: e.target.value})} />
              <input required type="text" className="input-field" placeholder="Location" value={docForm.location} onChange={e=>setDocForm({...docForm, location: e.target.value})} />
              <button type="submit" className="btn btn-primary"><Plus size={16}/> Save</button>
            </form>
          </div>
        );
      case 'appointments':
        return (
           <div className={`glass ${styles.tableCard}`}>
            <h2>All Appointments</h2>
            <table className={styles.table}>
              <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th></tr></thead>
              <tbody>
                {dataList.map(a => (
                  <tr key={a.id}><td>{a.userName || a.patientName}</td><td>{a.doctorName}</td><td>{new Date(a.date).toLocaleDateString()}</td><td>{a.time}</td><td><span className={styles.statusBadge}>{a.status}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      default: return null;
    }
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={`glass ${styles.sidebar}`}>
        <div className={styles.sidebarHeader}>Admin Portal</div>
        <button className={activeTab === 'dashboard' ? styles.active : ''} onClick={() => setActiveTab('dashboard')}><Activity size={18}/> Dashboard</button>
        <button className={activeTab === 'users' ? styles.active : ''} onClick={() => setActiveTab('users')}><Users size={18}/> Users</button>
        <button className={activeTab === 'appointments' ? styles.active : ''} onClick={() => setActiveTab('appointments')}><Calendar size={18}/> Appointments</button>
        <button className={activeTab === 'doctors' ? styles.active : ''} onClick={() => setActiveTab('doctors')}><Activity size={18}/> Doctors</button>
        <button className={activeTab === 'helpdesk' ? styles.active : ''} onClick={() => setActiveTab('helpdesk')}><HelpCircle size={18}/> Helpdesk</button>
      </aside>

      <main className={styles.mainContent}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;
