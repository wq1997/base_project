import styles from "./circle.less";
import ballImg from "@/assets/ball.gif";
import Card from "../Card";

const Circle = ({ dataSource }) => {
    return (
        <Card
        title="电站概览"
        content={
            <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1 }}>
                    <Charts3D
                        colorList={[
                            "#34FFFD",
                            "#FFF073",
                            "#76B3FF",
                            "#E8A7FF",
                            "#01F29B",
                            "#FF9960",
                        ]}
                        data={total}
                    />
                </div>
                <div className={styles.areaContentData}>
                    <div className={styles.areaContentDataItem}>
                        <Badge
                            color="#54CFFF"
                            text={<span style={{ color: "#FFFFFF" }}>总装机容量</span>}
                        />
                        <div className={styles.areaContentDataItemData}>
                            <span className={styles.areaContentDataItemData1}>
                                {totalCapacity}
                            </span>
                            <span className={styles.areaContentDataItemData2}>MW</span>
                        </div>
                    </div>
                    <div className={styles.areaContentDataItem}>
                        <Badge
                            color="#54CFFF"
                            text={<span style={{ color: "#FFFFFF" }}>电站个数</span>}
                        />
                        <div className={styles.areaContentDataItemData}>
                            <span className={styles.areaContentDataItemData1}>
                                {totalPlant}
                            </span>
                            <span className={styles.areaContentDataItemData2}>个</span>
                        </div>
                    </div>
                </div>
            </div>
        }
    />
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
    );
};

export default Circle;
