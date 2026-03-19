import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';

// Page Imports
import AuthPage from './pages/Auth/AuthPage';
import LandingPage from './pages/Landing/LandingPage';
import DoctorSearch from './pages/Doctor/DoctorSearch';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import EmergencySOS from './pages/Emergency/EmergencySOS';
import AdminPanel from './pages/Admin/AdminPanel';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" />;
  if (requireAdmin && user.role !== 'Admin') return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/doctors" element={<DoctorSearch />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/emergency" element={<EmergencySOS />} />
        
        {/* Protected Dashboard */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
