import styles from "./index.less";

const  Title = ({title}) => {
    return (
        <div className={styles.title} style={{width:'100%'}} >
            <span>{title}</span>
        </div>
    )
}

export default Title;