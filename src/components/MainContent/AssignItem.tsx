import styles from './MainContent.module.css'

type props = {
    title:string,
    deadline:string;
}

export default function AssignItem({title,deadline}:props){
    return(
        <div className={`${styles.assignItem}`}>
            <div className={styles.task}>
                <span className={styles.title}>{title}</span>
                <div className="d-flex gap-2 align-items-center">
                <i className="bi bi-calendar4"></i>
                <span className={styles.deadline}>{deadline}</span>
                </div>
            </div>
            <button className={styles.btn}>See Details</button>
        </div>
    )
}