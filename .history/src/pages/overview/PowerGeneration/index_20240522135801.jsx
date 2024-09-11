import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import Card from "../Card";

const Index = () => {
    const [data, setData] = useState([
        { value: 1, name: "正常", color: "linear-gradient( 206deg, #79E6FC 0%, #4499F5 100%)" },
        { value: 2, name: "故障", color: "linear-gradient( 117deg, #9E96F7 0%, #5C7FF7 100%)" },
        { value: 3, name: "断连", color: "linear-gradient( 316deg, #EE8F5A 0%, #EA3729 100%)" },
    ]);
    const [options, setOptions] = useState({});

    const getOptions = () => {
        setOptions({
            xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: "bar",
                },
            ],
        });
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <Card
            title="电站状态"
            content={<ReactECharts option={options} style={{ width: "100%", height: "100%" }} />}
        />
    );
};

export default Index;
