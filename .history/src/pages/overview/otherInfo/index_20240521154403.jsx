import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import Card from "../Card";

const Index = () => {
    const [data, setData] = useState([
        { value: 1, name: "电站类型" },
        { value: 1, name: "设备总数" },
        { value: 1, name: "当前功率",unit:'(kW)' },
        { value: 1, name: "当日等价发电时(kWh/kWp)" ,unit:'(kW)' },
        { value: 1, name: "当日发电量(度)" ,unit:'(kW)' },
        { value: 1, name: "累计发电量(度)" },
        { value: 1, name: "系统效率PR(%)" },
        { value: 1, name: "总辐照(kWh/㎡)" },
    ]);

    return (
        <Card title="其他信息" content={<div style={{ height: "100%", display: "flex" }}></div>} />
    );
};

export default Index;
