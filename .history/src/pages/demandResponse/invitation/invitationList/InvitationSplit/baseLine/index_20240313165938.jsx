import React, { useState, useEffect } from "react";
import { Tabs, Modal, Select, Space, InputNumber } from "antd";
import { getCompanyBaseLine as getCompanyBaseLineServer } from "@/services/electricityLoad";
import ReactECharts from "echarts-for-react";
import "./index.less";

const times = [
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
    "02:15",
    "02:30",
    "02:45",
    "03:00",
    "03:15",
    "03:30",
    "03:45",
    "04:00",
    "04:15",
    "04:30",
    "04:45",
    "05:00",
    "05:15",
    "05:30",
    "05:45",
    "06:00",
    "06:15",
    "06:30",
    "06:45",
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
    "22:00",
    "22:15",
    "22:30",
    "22:45",
    "23:00",
    "23:15",
    "23:30",
    "23:45",
];

const BaseLine = ({ baseLineArgs, onClose }) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];

    const Summary = () => {
         const summaryData = [
            { name: "关口负载功率", data: data?.gatewayBaseLinePowers },
            { name: "削峰能力", data: data?.responsePowers },
            { name: "储能计划出力功率", data: data?.energyStoragePlanPower },2
        ];
         const options = {
            legend: {
                data: summaryData?.map(item => {
                    console.log('name',item)
                    return 1
                }),
            },
            grid: {
                top: "10%",
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: times,
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} kW",
                },
                axisPointer: {
                    snap: true,
                },
            },
            series: summaryData?.map((item, index) => ({
                name: item?.name,
                type: "line",
                smooth: true,
                data: item?.data,
                symbol: "none",
                lineStyle: {
                    width: 3,
                    shadowColor: "rgba(158,135,255, 0.3)",
                    shadowBlur: 10,
                    shadowOffsetY: 20,
                },
                itemStyle: {
                    normal: {
                        color: colorList[index],
                        borderColor: colorList[index],
                    },
                },
            })),
        };

        return (
            <div>
                <div>
                    最大负载：{data?.maxLoad}KW 响应能力：
                    {data?.responsePower}KW
                </div>
                <ReactECharts option={options} style={{ width: "100%", height: "500px" }} />
            </div>
        );
    };

    const Listory = () => {
        // const historyData = [
        //     ...data?.baseLinePowersSource?.map(item => ({
        //         name: `${item?._1} 关口负载功率`,
        //         data: item?._2,
        //     })),
        //     ...data?.energyStoragePowerSource?.map(item => ({
        //         name: `${item?._1} 储能计划出力功率`,
        //         data: item?._2,
        //     })),
        // ];
        // const options = {
        //     legend: {
        //         data: historyData?.map(item => item?.name),
        //     },

        //     tooltip: {
        //         trigger: "axis",
        //         axisPointer: {
        //             type: "cross",
        //         },
        //     },
        //     xAxis: {
        //         type: "category",
        //         boundaryGap: false,
        //         data: times,
        //     },
        //     yAxis: {
        //         type: "value",
        //         axisLabel: {
        //             formatter: "{value} kW",
        //         },
        //         axisPointer: {
        //             snap: true,
        //         },
        //     },
        //     series: historyData?.map((item, index) => ({
        //         name: item?.name,
        //         type: "line",
        //         smooth: true,
        //         data: item?.data,
        //         symbol: "none",
        //         lineStyle: {
        //             width: 3,
        //             shadowColor: "rgba(158,135,255, 0.3)",
        //             shadowBlur: 10,
        //             shadowOffsetY: 20,
        //         },
        //         itemStyle: {
        //             normal: {
        //                 color: colorList[index],
        //                 borderColor: colorList[index],
        //             },
        //         },
        //     })),
        // };

        // return <ReactECharts option={options} style={{ width: "100%", height: "500px" }} />;
    };

    const getCompanyBaseLine = async () => {
        let res = await getCompanyBaseLineServer(baseLineArgs);
        if (res?.data?.status == "SUCCESS") {
            setData(res?.data?.data);
        }
    };

    useEffect(() => {
        if (baseLineArgs) {
            setOpen(true);
            getCompanyBaseLine();
        } else setOpen(false);
    }, [baseLineArgs]);

    const items = [
        {
            key: "1",
            label: "汇总基线",
            children: <Summary />,
        },
        {
            key: "2",
            label: "历史负载",
            children: <Listory />,
        },
    ];

    return (
        <Modal
            title="查看基线"
            width={900}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Tabs defaultActiveKey="1" items={items} />
        </Modal>
    );
};

export default BaseLine;
