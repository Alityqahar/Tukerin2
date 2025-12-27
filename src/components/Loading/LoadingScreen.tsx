import React from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen: React.FC = () => (
  <div className={styles.loadingOverlay} role="status" aria-label="Memuat halaman">
    <div className={styles.loaderBox}>
      <span className={styles.leafIcon}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <ellipse cx="24" cy="24" rx="20" ry="20" fill="#e8f5e9"/>
          <path d="M24 40c8-8 8-24 0-32-8 8-8 24 0 32z" fill="#4a7c23"/>
          <path d="M24 40c-8-8-8-24 0-32" stroke="#8bc34a" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </span>
      <span className={styles.loadingText}>
        Memuat
        <span className={styles.dot} style={{ animationDelay: "0s" }}>.</span>
        <span className={styles.dot} style={{ animationDelay: ".15s" }}>.</span>
        <span className={styles.dot} style={{ animationDelay: ".3s" }}>.</span>
      </span>
    </div>
  </div>
);

export default LoadingScreen;
