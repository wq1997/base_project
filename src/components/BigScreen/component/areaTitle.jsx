import styles from "./index.less";
import AreaTitleImg from "../../../../public/images/area_title.png";

const AreaTitle = ({title}) => {
    return (
        <div className={styles.areaTitle}>
            <img src={AreaTitleImg} />
            <div className={styles.areaTitleText}>{title}</div>
        </div>
    )
}

export default AreaTitle;