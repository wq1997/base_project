import styles from "./index.less";

const Title = ({title}) => {
    return (
        <div className={styles.title}>
            <span>{title}</span>
        </div>
    )
}

export default Title;