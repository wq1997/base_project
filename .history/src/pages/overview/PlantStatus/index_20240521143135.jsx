import { useState } from "react";
import { Button, message, Popconfirm } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import Card from "../Card";

const Index = () => {
 

    return (
        <Card
            title="电站状态"
            content={<ReactECharts  
                option={options} 
                style={{ width: '100%', height: '100%' }} 
            />}
        />
    );
};

export default Index;
