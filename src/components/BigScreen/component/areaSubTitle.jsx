import styles from "./index.less";

const AreaSubTitle = ({title}) => {
    return (
        <div className={styles.areaSubTitle}>
            <div className={styles.areaSubTitleContent}>{title}</div>
        </div>
    )
}

export default AreaSubTitle;