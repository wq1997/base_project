import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import Card from "../Card";

const Index = () => {
    const [data, setData] = useState([
        { value: 1, name: "电站类型" },
        { value: 1, name: "设备总数" },
        { value: 1, name: "正常" },
        { value: 1, name: "正常" },
        { value: 1, name: "正常" },
        { value: 1, name: "正常" },
        { value: 1, name: "正常" },
        { value: 1, name: "正常" },
    ]);

    return (
        <Card title="其他信息" content={<div style={{ height: "100%", display: "flex" }}></div>} />
    );
};

export default Index;
