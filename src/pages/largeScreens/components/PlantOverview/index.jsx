import { useEffect, useState } from "react";
import classNames from "classnames";
import { Form, Select, Input, Badge } from "antd";
import styles from "./index.less";
import Card from "../Card";
import { Charts3D, Charts2_5D, ScrollTable } from "@/components";

const Index = ({ data: { total, totalCapacity, totalPlant } }) => {
    return (
        <Card
            title="电站概览"
            content={
                <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ flex: 1 }}>
                        <Charts3D
                            colorList={[
                                "#76B3FF", // 蓝色
                                "#34FFFD",
                                "#FF9960", // 橙色
                                "#E8A7FF",
                                "#01F29B",
                                "#FFF073", // 黄色
                            ]}
                            data={total?.sort((a,b)=>b.value-a.value)}
                        />
                    </div>
                    <div className={styles.areaContentData}>
                        <div className={styles.areaContentDataItem}>
                            <Badge
                                color="#01fff5"
                                text={<span style={{ color: "#FFFFFF" }}>总电站个数</span>}
                            />
                            <div className={styles.areaContentDataItemData}>
                                <span className={styles.areaContentDataItemData1}>
                                    {totalPlant}
                                </span>
                                <span className={styles.areaContentDataItemData2}>个</span>
                            </div>
                        </div>
                        <div className={styles.areaContentDataItem}>
                            <Badge
                                color="#01fff5"
                                text={<span style={{ color: "#FFFFFF" }}>总装机容量</span>}
                            />
                            <div className={styles.areaContentDataItemData}>
                                <span className={styles.areaContentDataItemData1}>
                                    {totalCapacity?._1}
                                </span>
                                <span className={styles.areaContentDataItemData2}>MW</span>
                                /
                                <span className={styles.areaContentDataItemData1}>
                                    {totalCapacity?._2}
                                </span>
                                <span className={styles.areaContentDataItemData2}>MWH</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export default Index;
