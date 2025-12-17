import styles from './Notif.module.css'
import NotifItem from './NotifItem'

export default function Notif(){
    return(
        <div className={styles.container}>
            <h2 className='text-center mt-5'>Notifications</h2>
            <div className={styles.notifContainer}>
                <NotifItem title='Task WorkShop Batch 1' deadline='9 Januari 2025' />
            </div>
        </div>
    )
}