import ActivItem from './ActivItem'
import AssignItem from './AssignItem'
import styles from './MainContent.module.css'

export default function MainContent(){
    return(
        <div className={styles.container}>
            <div className={styles.sectionHeader}>
                <i className="bi bi-activity"></i>
                <h2>My Activity</h2>
            </div>
            <div className={styles.activContainer}>
                <ActivItem type='pesanan' desc='MAN IC OKI'/>
                <ActivItem type='pengiriman' desc='SMA 3 Kayu Agung'/>
                <ActivItem type='diterima' desc='MAN IC Gorontalo'/>
                <ActivItem type='batal' desc='SMA IGS'/>
            </div>

            <div className={styles.sectionHeader}>
                <i className="bi bi-clipboard-check"></i>
                <h2>Assignments</h2>
            </div>
            <div className={styles.assignContainer}>
                <AssignItem title="Tukerin Workshop Batch 2" deadline='10 Januari 2026' /> 
                <AssignItem title="Tukerin Workshop Batch 3" deadline='15 Januari 2026' /> 
            </div>
        </div>
    )
}