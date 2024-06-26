import styles from "./index.less";
import titleImg from "../../../../../public/images/title.svg";

const Title = ({title}) => {
    return (
        <div className={styles.title}>
            <img src={titleImg} />
            <span>{title}</span>
        </div>
    )
}

export default Title;