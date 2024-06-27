
import styles from "./circle.less";
import ballImg from "../../../../assets/ball.gif";

const Circle = () => {
    return (
        <div className={styles.circle}>
            {/* 正常 */}
            <div className={styles.ball1}>
                <div className={styles.data1} style={{color: '#01FF23'}}>8</div>
                <div className={styles.font}>正常</div>
                <img src={ballImg} />
            </div>

            {/* 告警 */}
            <div className={styles.ball2}>
                <div className={styles.data2} style={{color: '#FF0000'}}>8</div>
                <div className={styles.font}>告警</div>
                <img src={ballImg} />
            </div>

            {/* 离线 */}
            <div className={styles.ball3}>
                <div className={styles.data3} style={{color: '#E3E3E3'}}>8</div>
                <div className={styles.font}>离线</div>
                <img src={ballImg} />
            </div>
        </div>
    )
}

export default Circle;