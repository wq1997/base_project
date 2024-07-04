
import styles from "./index.less";
import ball1Img from "../../../../../public/images/ball1Img.svg";
import ball2Img from "../../../../../public/images/ball2Img.svg";
import ball3Img from "../../../../../public/images/ball3Img.svg";

const DeviceRunDesc = ({dataSource}) => {
    return (
        <div className={styles.circle}>
            {/* 正常 */}
            <div className={styles.ball1}>
                <div className={styles.data1} style={{color: '#01FF23'}}>{dataSource?.onlineCount||0}</div>
                <div className={styles.font}>在线</div>
                <img src={ball1Img} />
            </div>

            {/* 告警 */}
            <div className={styles.ball2}>
                <div className={styles.data2} style={{color: '#FF0000'}}>{dataSource?.nowAlarmCount||0}</div>
                <div className={styles.font}>告警</div>
                <img src={ball2Img} />
            </div>

            {/* 离线 */}
            <div className={styles.ball3}>
                <div className={styles.data3} style={{color: '#E3E3E3'}}>{dataSource?.offlineCount||0}</div>
                <div className={styles.font}>离线</div>
                <img src={ball3Img} />
            </div>
        </div>
    )
}

export default DeviceRunDesc;