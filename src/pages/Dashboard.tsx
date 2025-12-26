import { useState, useEffect } from "react"
import ClickSpark from "../components/ClickSpark/ClickSpark"
import DashboardContainer from "../components/Dashboard/DashboardContainer"
import SideContentRight from "../components/SideContentRight/SideContentRight"
import styles from "./Dashboard.module.css"

export default function Dashboard(){
    const [ecoScore, setEcoScore] = useState(0);
    const [carbonSaved, setCarbonSaved] = useState(0);

    useEffect(() => {
        const targetEco = 1247;
        const targetCarbon = 85.3;
        
        const timer = setInterval(() => {
            setEcoScore(prev => {
                if (prev < targetEco) return Math.min(prev + Math.ceil(targetEco / 50), targetEco);
                return prev;
            });
            setCarbonSaved(prev => {
                if (prev < targetCarbon) return Math.min(prev + (targetCarbon / 50), targetCarbon);
                return prev;
            });
        }, 30);

        return () => clearInterval(timer);
    }, []);

    return(
        <section className={styles.dashboardSection}>
            {/* Decorative Background Elements */}
            <div className={styles.bgDecor}>
                <span className={`${styles.decorCircle} ${styles.circle1}`} />
                <span className={`${styles.decorCircle} ${styles.circle2}`} />
                <span className={`${styles.decorCircle} ${styles.circle3}`} />
            </div>

            <div className={styles.dashboardWrapper}>
                {/* Mobile: SideContentRight & Header in row */}
                <div className={styles.mobileTopRow}>
                    {/* Side Content - Left on Mobile */}
                    <div className={styles.mobileSideContent}>
                        <SideContentRight />
                    </div>
                    
                    {/* Header Section - Right on Mobile */}
                    <div className={styles.dashboardHeader}>
                        <div className={styles.headerContent}>
                            <div className={styles.welcomeSection}>
                                <h1 className={styles.welcomeTitle}>
                                    <i className="bi bi-grid-fill"></i>
                                    Dashboard
                                </h1>
                                <p className={styles.welcomeSubtitle}>
                                    Selamat datang kembali! Pantau aktivitas dan progres Anda
                                </p>
                            </div>
                            
                            {/* Quick Stats */}
                            <div className={styles.quickStats}>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>
                                        <i className="bi bi-trophy-fill"></i>
                                    </div>
                                    <div className={styles.statInfo}>
                                        <span className={styles.statValue}>{ecoScore.toLocaleString('id-ID')}</span>
                                        <span className={styles.statLabel}>Eco-Score</span>
                                    </div>
                                </div>
                                
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>
                                        <i className="bi bi-tree-fill"></i>
                                    </div>
                                    <div className={styles.statInfo}>
                                        <span className={styles.statValue}>{carbonSaved.toFixed(1)} kg</span>
                                        <span className={styles.statLabel}>CO₂ Dikurangi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <ClickSpark
                    sparkColor='#4a7c23'
                    sparkSize={10}
                    sparkRadius={15}
                    sparkCount={8}
                    duration={400}
                >
                    <DashboardContainer />
                </ClickSpark>
            </div>
        </section>
    )
}