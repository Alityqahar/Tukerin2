import MainContent from '../MainContent/MainContent';
import SideContentLeft from '../SideContentLeft/SideContentLeft';
import SideContentRight from '../SideContentRight/SideContentRight';
import styles from './DashboardContainer.module.css';

export default function DashboardContainer(){
    return(
        <div className={styles.container}>
            <div className={styles.item}>
                <SideContentRight />
            </div>
            <div className={styles.item}>
                <MainContent />
            </div>
            <div className={styles.item}>
                <SideContentLeft />
            </div>
        </div>
    )
}