import styles from './Notif.module.css'

type props = {
    title: string;
    deadline:string;
}

export default function NotifItem({title,deadline}:props){
    return(
        <div className={styles.notifItem}>
            <span className={styles.title}>{title}</span>
            <span className={styles.deadline}>{deadline}</span>
        </div>
    )
}