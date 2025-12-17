import Profil from "../Profil/Profil";
import styles from "./SideContentRight.module.css";

export default function SideContentRight(){
    return(
        <aside className="w-full md:w-80 bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-6">
            <Profil noid={954040} name="MAN IC OKI"/>
            <div className="w-full mt-3">
                <ul className={styles.navList}>
                    <li>
                        <a href="/" className={styles.navItem}>
                            <i className="bi bi-house-door"></i>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/profile" className={styles.navItem}>
                            <i className="bi bi-person-circle"></i>
                            Profile
                        </a>
                    </li>
                    <li>
                        <a href="/settings" className={styles.navItem}>
                            <i className="bi bi-gear"></i>
                            Settings
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}