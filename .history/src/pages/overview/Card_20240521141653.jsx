import styles from "./index.less";

const Index = ({ title,content }) => {
    return (
        <div className={styles.index}>
            <div className={styles.header}>
                <span className={styles.name}>
                    <div className={styles.cicle}></div>
                    {title}
                </span>
            </div>
            <div className={styles.content}>
                {content}
            </div>
        </div>
    );
};

export default Index;
