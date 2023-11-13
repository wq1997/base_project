import styles from "./index.less";

const Title = ({title}) => {
    return (
        <div className={styles.title}>
            {title}
        </div>
    )
}

export default Title;