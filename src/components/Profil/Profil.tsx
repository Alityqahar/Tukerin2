import styles from './Profil.module.css'
import { useState } from 'react';

type props = {
    noid: number;
    name: string;
};

export default function Profil({ noid, name }: props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(noid.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div className={styles.container}>
            <div className={styles.avatarWrapper}>
                <img src="foto-profil.webp" className={styles.foto} alt="Foto Profil" />
            </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.id}>
                <span className={styles.noid}>{noid}</span>
                <button className={styles.btn} onClick={handleCopy} title="Copy ID">
                    <i className="bi bi-copy"></i>
                </button>
                {copied && <span className={styles.copied}>Copied!</span>}
            </div>
        </div>
    )
}