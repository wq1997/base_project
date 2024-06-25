import { Badge } from "antd";
import Title from "../Title";
import { Charts3D } from "@/components";
import styles from "./index.less";
import Circle from "./circle";

const Business = () => {
    return (
        <div className={styles.container}>
            {/* 电量统计 */}
            <div className={styles.area1}>
                <Title title={"电量统计"}/>
                <div className={styles.areaContent}>
                    <div className={styles.areaContentChart}>
                        <Charts3D 
                            colorList={['#17A6FF', '#FF63DD', '#FFCD18', '#61F671', '#07FCDD', '#5B5EF7']}
                            data={[
                                {
                                    name: 'PM2.5',
                                    value: 134,
                                },
                                {
                                    name: 'VOC',
                                    value: 56,
                                },
                                {
                                    name: 'T',
                                    value: 57,
                                },
                                {
                                    name: 'CH2O',
                                    value: 36,
                                },
                                {
                                    name: 'CO2',
                                    value: 51,
                                },
                                {
                                    name: 'RH',
                                    value: 51,
                                },
                            ]}
                        />
                    </div>
                    <div className={styles.areaContentData}>
                        <div className={styles.areaContentDataItem}>
                            <Badge color="#54CFFF" text={<span style={{color: '#FFFFFF'}}>总装机容量</span>} />
                            <div className={styles.areaContentDataItemData}>
                                <span className={styles.areaContentDataItemData1}>XXXX</span> 
                                <span className={styles.areaContentDataItemData2}>MW</span>
                            </div>
                        </div>
                        <div className={styles.areaContentDataItem}>
                            <Badge color="#54CFFF" text={<span style={{color: '#FFFFFF'}}>电站个数</span>} />
                            <div className={styles.areaContentDataItemData}>
                                <span className={styles.areaContentDataItemData1}>18</span> 
                                <span className={styles.areaContentDataItemData2}>个</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.area4}>
                <Title title={"设备运行情况"}/>
                <div className={styles.areaContent}>
                    <Circle />
                </div>
            </div>
            <div className={styles.area2}>
                <Title title={"电量排行"}/>
                <div className={styles.areaContent}>
                    
                </div>
            </div>
            <div className={styles.area3}>3</div>
            <div className={styles.area6}>6</div>
            <div className={styles.area5}>5</div>
            <div className={styles.area8}>8</div>
            <div className={styles.area7}>7</div>
        </div>
    )
}

export default Business;