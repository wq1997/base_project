import styles from "./circle.less";
import ballImg from "@/assets/ball.gif";
import Card from "../Card";

const Circle = ({ data }) => {
    return (
        <Card
            title="设备状态"
            content={
                <div className={styles.circle}>
                    {/* 正常 */}
                    <div className={styles.ball1}>
                        <div className={styles.data1} style={{ color: "#01FF23" }}>
                            {dataSource?.normal || 0}
                        </div>
                        <img src={ballImg} />
                        <div className={styles.font}>在线</div>
                    </div>
                    {/* 离线 */}
                    <div className={styles.ball3}>
                        <div className={styles.data3} style={{ color: "#E3E3E3" }}>
                            {dataSource?.offline || 0}
                        </div>
                        <img src={ballImg} />
                        <div className={styles.font}>离线</div>
                    </div>
                    {/* 告警 */}
                    <div className={styles.ball2}>
                        <div className={styles.data2} style={{ color: "#FF0000" }}>
                            {dataSource?.warn || 0}
                        </div>
                        <img src={ballImg} />
                        <div className={styles.font}>告警</div>
                    </div>
                </div>
            }
        />
    );
};

export default Circle;
