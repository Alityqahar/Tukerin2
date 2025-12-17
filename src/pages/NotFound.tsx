import { Link, useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound(){
const navigate = useNavigate();

return (
<section className={styles.notFoundSection} aria-labelledby="nf-title">
    <div className={styles.notFoundCard} role="main">
    <h1 id="nf-title" className={styles.nfTitle}>404</h1>

    <h2 className={styles.nfSubtitle}>Halaman Tidak Ditemukan</h2>

    <p className={styles.nfText}>
        Maaf, halaman yang Anda cari tidak tersedia atau alamatnya salah.
        Coba kembali ke beranda atau gunakan tombol untuk kembali ke halaman sebelumnya.
    </p>

    <div className={styles.nfActions}>
        <Link to="/" className={styles.nfBtnPrimary} aria-label="Kembali ke Beranda">← Beranda</Link>
        <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.nfBtnGhost}
        aria-label="Kembali ke Halaman Sebelumnya"
        >
        Kembali
        </button>
    </div>
    </div>
</section>
);
}