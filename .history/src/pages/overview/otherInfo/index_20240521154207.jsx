import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import Card from "../Card";

const Index = () => {
    const [data, setData] = useState([
        { value: 1, name: "正常",  },
        { value: 2, name: "故障", color: "linear-gradient( 117deg, #9E96F7 0%, #5C7FF7 100%)" },
        { value: 3, name: "断连", color: "linear-gradient( 316deg, #EE8F5A 0%, #EA3729 100%)" },
    ]);
    

    return (
        <Card
            title="其他信息"
            content={
                <div style={{ height: "100%", display: "flex" }}>
                    
                </div>
            }
        />
    );
};

export default Index;
