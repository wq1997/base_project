import { theme, Space } from "antd";
import styles from "./index.less";

const OverView = () => {
    const { token } = theme.useToken();
    return (
        <div 
            className={styles.overView}
            style={{ 
                background: token.bgcColorB_l
            }}
        >
                <div className={styles.top}>

                </div>
                <div className={styles.center}>
                    <div className={styles.centerLeft}>
                        <div className={styles.centerLeftOne}></div>
                        <div className={styles.centerLeftTwo}></div>
                        <div className={styles.centerLeftThree}></div>
                    </div>
                    <div className={styles.centerRight}>
                        
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.bottomOne}></div>
                    <div className={styles.bottomTwo}></div>
                    <div className={styles.bottomThree}></div>
                </div>
        </div>
    )
}

export default OverView;