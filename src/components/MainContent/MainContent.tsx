import ActivItem from './ActivItem'
import AssignItem from './AssignItem'
import styles from './MainContent.module.css'

export default function MainContent(){
    return(
        <div className={styles.container}>
            <h2 className='text-center'>My Activity</h2>
            <div className={styles.activContainer}>
                <ActivItem type='pesanan' desc='MAN IC OKI'/>
                <ActivItem type='pengiriman' desc='SMA 3 Kayu Agung'/>
                <ActivItem type='diterima' desc='MAN IC Gorontalo'/>
                <ActivItem type='batal' desc='SMA IGS'/>
            </div>

            <h2 className='text-center'>Assignements</h2>
            <div className={styles.assignContainer}>
                <AssignItem title="Tukerin Workshop Batch 2" deadline='10 Januari 2026' /> 
                <AssignItem title="Tukerin Workshop Batch 3" deadline='15 Januari 2026' /> 
            </div>
        </div>
    )
}