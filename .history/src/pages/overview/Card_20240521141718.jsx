import styles from "./index.less";

const Index = ({ title, others, content }) => {
    return (
        <div className={styles.index}>
            <div className={styles.header}>
                <span className={styles.name}>
                    <div className={styles.cicle}></div>
                    {title}
                </span>
                {others}
            </div>
            <div className={styles.content}>{content}</div>
        </div>
    );
};

export default Index;
