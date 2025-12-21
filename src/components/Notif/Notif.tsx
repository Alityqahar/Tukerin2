import styles from './Notif.module.css'
import NotifItem from './NotifItem'

export default function Notif(){
    return(
        <div className={styles.container}>
            <div className={styles.sectionHeader}>
                <i className="bi bi-bell"></i>
                <h2>Notifications</h2>
            </div>
            <div className={styles.notifContainer}>
                <NotifItem title='Task WorkShop Batch 1' deadline='9 Januari 2025' />
            </div>
        </div>
    )
}