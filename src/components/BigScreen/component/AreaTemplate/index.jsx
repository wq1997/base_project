import styles from "./index.less";

const AreaTemplate = ({
    title,
    children
}) => {
    return (
        <div className={styles.area}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{children}</div>
        </div>
    )
}

export default AreaTemplate;