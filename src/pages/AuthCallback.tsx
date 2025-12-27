// src/pages/AuthCallback.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import styles from './Login.module.css';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Memverifikasi email Anda...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { success, error } = await authService.handleEmailVerification();

        if (success) {
          setStatus('success');
          setMessage('Email berhasil diverifikasi! Anda akan dialihkan ke halaman login...');
          
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(error || 'Verifikasi gagal. Silakan coba lagi.');
        }
      } catch{
        setStatus('error');
        setMessage('Terjadi kesalahan saat verifikasi.');
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <section className={styles.loginSection}>
      <div className={styles.bgDecor}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.circle3} />
      </div>

      <div className={styles.loginContainer} style={{ maxWidth: '600px', gridTemplateColumns: '1fr' }}>
        <div className={styles.rightPanel}>
          <div className={styles.formContainer}>
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              {status === 'loading' && (
                <>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    border: '6px solid #e0e7ef',
                    borderTopColor: '#4a7c23',
                    borderRadius: '50%',
                    margin: '0 auto 25px',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: '#2d5016',
                    marginBottom: '15px'
                  }}>
                    Memverifikasi Email
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#5a7c3c',
                    lineHeight: '1.6'
                  }}>
                    {message}
                  </p>
                </>
              )}

              {status === 'success' && (
                <>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #4a7c23, #8bc34a)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 25px',
                    fontSize: '3rem',
                    color: 'white',
                    animation: 'scaleIn 0.5s cubic-bezier(0.2,0.9,0.3,1)'
                  }}>
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: '#2d5016',
                    marginBottom: '15px'
                  }}>
                    Email Terverifikasi!
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#5a7c3c',
                    lineHeight: '1.6',
                    marginBottom: '25px'
                  }}>
                    {message}
                  </p>
                  <a
                    href="/login"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 28px',
                      background: 'linear-gradient(135deg, #4a7c23, #8bc34a)',
                      color: 'white',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: '700',
                      transition: 'all 0.3s ease',
                      fontSize: '1.05rem'
                    }}
                  >
                    <i className="bi bi-box-arrow-in-right"></i>
                    Login Sekarang
                  </a>
                </>
              )}

              {status === 'error' && (
                <>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #ef5350, #e53935)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 25px',
                    fontSize: '3rem',
                    color: 'white',
                    animation: 'shake 0.5s'
                  }}>
                    <i className="bi bi-x-circle-fill"></i>
                  </div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    color: '#c62828',
                    marginBottom: '15px'
                  }}>
                    Verifikasi Gagal
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#5a7c3c',
                    lineHeight: '1.6',
                    marginBottom: '25px'
                  }}>
                    {message}
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <a
                      href="/register"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        background: 'white',
                        color: '#4a7c23',
                        border: '2px solid #8bc34a',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className="bi bi-arrow-clockwise"></i>
                      Daftar Ulang
                    </a>
                    <a
                      href="/"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, #4a7c23, #8bc34a)',
                        color: 'white',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className="bi bi-house"></i>
                      Beranda
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </section>
  );
}