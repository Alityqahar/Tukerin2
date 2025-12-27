import MainContent from '../MainContent/MainContent';
import SideContentLeft from '../SideContentLeft/SideContentLeft';
import SideContentRight from '../SideContentRight/SideContentRight';
import styles from './DashboardContainer.module.css';

interface DashboardContainerProps {
    userId: string;
    userRole: string;
}

export default function DashboardContainer({ userId, userRole }: DashboardContainerProps) {
    // Minimal placeholder UserProfile object
    const userProfile = {
        school_id: "",
        school_name: "",
        full_name: "",
        profile_photo: "",
        role: userRole,
        // ...add any other required UserProfile fields if necessary...
    };

    return (
        <div className={styles.container}>
            {/* Desktop: SideContentRight visible */}
            <div className={styles.item}>
                <SideContentRight userProfile={userProfile} />
            </div>
            
            <div className={styles.item}>
                <MainContent userId={userId} userRole={userRole} />
            </div>
            
            <div className={styles.item}>
                <SideContentLeft userId={userId} />
            </div>
        </div>
    );
}