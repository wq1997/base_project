import { useEffect, useState } from "react";
import classNames from "classnames";
import { Form, Select, Input, Badge } from "antd";
import styles from "./index.less";
import Card from "../Card";
import { Charts3D, Charts2_5D, ScrollTable } from "@/components";

const Index = ({   data: { total, totalCapacity, totalPlant } }) => {
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
                    </div>
                </div>
            }
        />
    );
};

export default Index;
