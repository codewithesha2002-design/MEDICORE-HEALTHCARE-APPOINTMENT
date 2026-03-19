import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPage.module.scss';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgot', 'otp'
  const { login, signup, forgotPassword, verifyOtp } = useAuth();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await login(formData.email, formData.password);
    if (!res.success) setError(res.message);
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await signup(formData.name, formData.email, formData.password);
    if (!res.success) setError(res.message);
    setLoading(false);
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await forgotPassword(formData.email);
    if (res.success) {
      setMode('otp');
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await verifyOtp(formData.email, formData.otp);
    if (!res.success) setError(res.message);
    setLoading(false);
  };

  const handleSocialLogin = (provider) => {
    // Stub for OAuth integration
    alert(`Initiating ${provider} login... Ensure backend keys are set!`);
  };

  return (
    <div className={styles.authContainer}>
      <div className={`glass ${styles.authCard} animate-fade-in`}>
        <div className={styles.header}>
          <h1>
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
            {mode === 'otp' && 'Verify OTP'}
          </h1>
          <p>
            {mode === 'login' && 'Login to access your appointments'}
            {mode === 'signup' && 'Join us for better healthcare'}
            {mode === 'forgot' && 'Enter email to receive an OTP'}
            {mode === 'otp' && `Enter the OTP sent to ${formData.email}`}
          </p>
        </div>

        {error && <div style={{ color: 'var(--danger-color)', textAlign: 'center', fontSize: '0.9rem', background: '#fee2e2', padding: '10px', borderRadius: '8px' }}>{error}</div>}

        {mode === 'login' && (
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label className="label">Email Address</label>
              <input type="email" name="email" className="input-field" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label className="label">Password</label>
              <input type="password" name="password" className="input-field" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
              <div className={styles.forgotPassword}>
                <button type="button" onClick={() => setMode('forgot')}>Forgot Password?</button>
              </div>
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'} <ArrowRight size={18} />
            </button>
          </form>
        )}

        {mode === 'signup' && (
          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.formGroup}>
              <label className="label">Full Name</label>
              <input type="text" name="name" className="input-field" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label className="label">Email Address</label>
              <input type="email" name="email" className="input-field" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label className="label">Password</label>
              <input type="password" name="password" className="input-field" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
              {loading ? 'Creating...' : 'Sign Up'} <ArrowRight size={18} />
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <form className={styles.form} onSubmit={handleForgot}>
            <div className={styles.formGroup}>
              <label className="label">Registered Email</label>
              <input type="email" name="email" className="input-field" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'} <ArrowRight size={18} />
            </button>
            <div className={styles.footer} style={{ marginTop: '8px' }}>
              <button type="button" onClick={() => setMode('login')}>Return to Login</button>
            </div>
          </form>
        )}

        {mode === 'otp' && (
          <form className={styles.form} onSubmit={handleOtp}>
            <div className={styles.formGroup}>
              <label className="label">6-Digit OTP</label>
              <input type="text" name="otp" className="input-field" placeholder="123456" value={formData.otp} onChange={handleChange} required autoFocus />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Login'} <ArrowRight size={18} />
            </button>
          </form>
        )}

        {(mode === 'login' || mode === 'signup') && (
          <>
            <div className={styles.divider}>Or continue with</div>
            <div className={styles.socialGroup}>
              <button type="button" className={`btn ${styles.socialBtn}`} onClick={() => handleSocialLogin('Google')}>
                <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button type="button" className={`btn ${styles.socialBtn}`} onClick={() => handleSocialLogin('Facebook')}>
                <svg viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
            </div>
            
            <div className={styles.footer}>
              {mode === 'login' ? (
                <span>Don't have an account? <button type="button" onClick={() => setMode('signup')}>Sign up</button></span>
              ) : (
                <span>Already have an account? <button type="button" onClick={() => setMode('login')}>Log in</button></span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
