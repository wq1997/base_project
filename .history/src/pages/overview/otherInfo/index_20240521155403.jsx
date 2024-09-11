import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import Card from "../Card";

const Index = () => {
    const [data, setData] = useState([
        { value: 1, name: "电站类型" },
        { value: 1, name: "设备总数" },
        { value: 1, name: "当前功率", unit: "kW" },
        { value: 1, name: "当日等价发电时", unit: "kWh/kWp" },
        { value: 1, name: "当日发电量", unit: "(度)" },
        { value: 1, name: "累计发电量", unit: "(度)" },
        { value: 1, name: "系统效率PR", unit: "(%)" },
        { value: 1, name: "总辐照", unit: "(kWh/㎡)" },
    ]);

    return (
        <Card
            title="其他信息"
            content={
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        grap: "5px",
                    }}
                >
                    {data?.map(item => (
                        <div className={styles.item}>
                            <div>
                                <span className={styles.value}>{item.value}</span>
                                <span className={styles.unit}>{item.unit}</span>
                            </div>
                            <div className={styles.name}>{item.name}</div>
                        </div>
                    ))}
                </div>
            }
        />
    );
};

export default Index;
