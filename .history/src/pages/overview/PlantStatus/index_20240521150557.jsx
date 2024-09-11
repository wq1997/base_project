import { useState, useEffect } from "react";
import { Button, message, Popconfirm } from "antd";
import styles from "./index.less";
import ReactECharts from "echarts-for-react";
import Card from "../Card";

const Index = () => {
    const [data, setData] = useState([
        { value: 1, name: "正常", color: "linear-gradient( 206deg, #79E6FC 0%, #4499F5 100%)" },
        { value: 2, name: "故障", color: "linear-gradient( 117deg, #9E96F7 0%, #5C7FF7 100%);" },
        { value: 3, name: "断连", color: "linear-gradient( 316deg, #EE8F5A 0%, #EA3729 100%);" },
    ]);
    const [options, setOptions] = useState({});

    const getOptions = () => {
        setOptions({
            tooltip: {
                trigger: "item",
            },
            legend: {
                show: false,
            },
            series: [
                {
                    name: "Access From",
                    type: "pie",
                    radius: ["70%", "80%"],

                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderColor: "#fff",
                        borderWidth: 2,
                    },
                    label: {
                        show: false,
                        position: "center",
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: "bold",
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: data,
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
            content={
                <div style={{ height: "100%", display: "flex" }}>
                    <div style={{ flex: 2 }}>
                        <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        {data?.map(item => (
                            <div>
                                <div style={{width:'8px',height}}></div>
                                <span>{item.name}</span>
                                <span>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
        />
    );
};

export default Index;
