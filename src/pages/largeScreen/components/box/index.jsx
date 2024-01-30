import Title from "../title";
import styles from "./index.less";

const Box = (props) => {
    return (
        <div className={styles.box}>
            <div className={styles.title}><Title title={props.title} icon={props.icon} /></div>
            <div className={styles.boxContent}>
                {props.children}
            </div>
        </div>
    )
}

export default Box;