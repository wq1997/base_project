import styles from "./index.less";
import TitleBgImg from "../../../../../public/images/area_title_bg.png"

const AreaTemplate = ({
    title,
    children
}) => {
    return (
        <div className={styles.area}>
            <div className={styles.title}>
                <img src={TitleBgImg} />
                <div className={styles.titleText}>{title}</div>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    )
}

export default AreaTemplate;