// src/pages/Register.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import styles from './Login.module.css'; // Reuse login styles

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    school_id: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validasi input
    if (!formData.email.trim()) {
      setError('Email harus diisi');
      setLoading(false);
      return;
    }

    if (!formData.full_name.trim()) {
      setError('Nama lengkap harus diisi');
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Password harus diisi');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      setLoading(false);
      return;
    }

    try {
      const { user, error: registerError } = await authService.register({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        school_id: formData.school_id || undefined
      });

      if (registerError || !user) {
        setError(registerError || 'Registrasi gagal');
        setLoading(false);
        return;
      }

      // Success
      setSuccess(true);
      setLoading(false);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch{
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setLoading(false);
    }
  };

  if (success) {
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
              <div style={{
                textAlign: 'center',
                padding: '40px 20px'
              }}>
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
                  Registrasi Berhasil!
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#5a7c3c',
                  lineHeight: '1.6',
                  marginBottom: '25px'
                }}>
                  Kami telah mengirim email verifikasi ke <strong>{formData.email}</strong>
                </p>
                <div style={{
                  background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid #ffb74d',
                  marginBottom: '25px',
                  textAlign: 'left'
                }}>
                  <p style={{
                    margin: '0 0 10px 0',
                    fontWeight: '600',
                    color: '#ef6c00',
                    fontSize: '1rem'
                  }}>
                    <i className="bi bi-info-circle-fill" style={{ marginRight: '8px' }}></i>
                    Langkah Selanjutnya:
                  </p>
                  <ol style={{
                    margin: '0',
                    paddingLeft: '20px',
                    color: '#5a7c3c',
                    fontSize: '0.95rem'
                  }}>
                    <li>Buka inbox email Anda</li>
                    <li>Klik link verifikasi yang kami kirim</li>
                    <li>Login dengan akun Anda</li>
                  </ol>
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#999',
                  marginBottom: '20px'
                }}>
                  Anda akan dialihkan ke halaman login dalam beberapa detik...
                </p>
                <a
                  href="/login"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #4a7c23, #8bc34a)',
                    color: 'white',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                  Login Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scaleIn {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className={styles.loginSection}>
      <div className={styles.bgDecor}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.circle3} />
      </div>

      <div className={styles.loginContainer}>
        {/* Left Panel - Branding */}
        <div className={styles.leftPanel}>
          <div className={styles.brandingContent}>
            <div className={styles.logoWrapper}>
              <img src="/nav-logo.png" alt="Tukerin Logo" className={styles.logo} />
            </div>
            <h1 className={styles.brandTitle}>
              Bergabung dengan <span className={styles.highlight}>Tukerin</span>
            </h1>
            <p className={styles.brandSubtitle}>
              Daftar sekarang dan mulai kontribusi untuk lingkungan yang lebih hijau
            </p>
            
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <i className="bi bi-check-circle-fill"></i>
                <span>Gratis selamanya</span>
              </div>
              <div className={styles.featureItem}>
                <i className="bi bi-check-circle-fill"></i>
                <span>Akses ke semua fitur</span>
              </div>
              <div className={styles.featureItem}>
                <i className="bi bi-check-circle-fill"></i>
                <span>Komunitas eco-friendly</span>
              </div>
            </div>

            <div className={styles.statsPreview}>
              <div className={styles.statItem}>
                <i className="bi bi-people-fill"></i>
                <div>
                  <strong>47,593+</strong>
                  <span>Pengguna Aktif</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <i className="bi bi-arrow-repeat"></i>
                <div>
                  <strong>15,832+</strong>
                  <span>Barang Ditukar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Register Form */}
        <div className={styles.rightPanel}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Buat Akun Baru</h2>
              <p className={styles.formSubtitle}>
                Isi form di bawah untuk memulai perjalanan eco-friendly Anda
              </p>
            </div>

            {error && (
              <div className={styles.errorAlert}>
                <i className="bi bi-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.inputGroup}>
                <label htmlFor="full_name" className={styles.label}>
                  <i className="bi bi-person"></i>
                  Nama Lengkap
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  className={styles.input}
                  placeholder="Nama lengkap Anda"
                  value={formData.full_name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  <i className="bi bi-envelope"></i>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder="nama@sekolah.sch.id"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="school_id" className={styles.label}>
                  <i className="bi bi-building"></i>
                  ID Sekolah (Opsional)
                </label>
                <input
                  id="school_id"
                  name="school_id"
                  type="text"
                  className={styles.input}
                  placeholder="Contoh: 954040"
                  value={formData.school_id}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  <i className="bi bi-lock"></i>
                  Password
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={styles.input}
                    placeholder="Minimal 6 karakter"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  <i className="bi bi-lock-fill"></i>
                  Konfirmasi Password
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={styles.input}
                    placeholder="Ketik ulang password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner}></span>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus"></i>
                    <span>Daftar Sekarang</span>
                  </>
                )}
              </button>
            </form>

            <div className={styles.formFooter}>
              <p>
                Sudah punya akun?{' '}
                <a href="/login" className={styles.registerLink}>
                  Login di sini
                </a>
              </p>
            </div>

            <div className={styles.divider}>
              <span>atau daftar dengan</span>
            </div>

            <div className={styles.socialLogin}>
              <button type="button" className={styles.socialBtn}>
                <i className="bi bi-google"></i>
                <span>Google</span>
              </button>
              <button type="button" className={styles.socialBtn}>
                <i className="bi bi-microsoft"></i>
                <span>Microsoft</span>
              </button>
            </div>

            <div className={styles.backToHome}>
              <a href="/" className={styles.homeLink}>
                <i className="bi bi-arrow-left"></i>
                <span>Kembali ke Beranda</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}