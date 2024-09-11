 
import styles from "./index.less";
 
const Index = ({title}) => {
 
    return (
        <div className={styles.index}>
            <div className={styles.header}>
                <span className={styles.name}>
                    <div className={styles.cicle}></div>
                    {title}
                </span>
            </div>
            <div className={styles.content}></div>
        </div>
    );
};

export default Index;
