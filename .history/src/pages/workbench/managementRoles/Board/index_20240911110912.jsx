import React, { useRef, useEffect, useState } from "react";
import { theme } from "antd";
import { SearchInput } from "@/components";
import ReactECharts from "echarts-for-react";
import styles from "./index.less";
import classNames from "classnames";

const Board = ({ data }) => {
    const { token } = theme.useToken();
    const chartRef = useRef(null);
    const [options, setOpitons] = useState({});
    const [dataType, setDataType] = useState("phase2Count");

    const getOptions = () => {
        const dataSource = data?.projectSummery?.[dataType] || [];
        const options = {
            color: ["#00FFF8", "#8FC0FF"],
            tooltip: {
                trigger: "item",
            },
            legend: {
                orient: "vertical",
                left: 8,
                top: 30,
                textStyle: {
                    color: token.color1,
                },
            },
            series: [
                {
                    type: "pie",
                    radius: ["50%", "70%"],
                    selectedMode: "single",
                    data: dataSource?.map(item => {
                        return {
                            name: item?._1,
                            value: item?._2,
                        };
                    }),
                    label: {
                        normal: {
                            textStyle: {
                                color: "#fff",
                            },
                            formatter: "{b}{c|{c}}\n{d|{d}%}",
                            rich: {
                                b: {
                                    color: "#12EABE",
                                    align: "left",
                                    padding: 4,
                                },
                                d: {
                                    color: "#fff",
                                    align: "left",
                                    padding: 4,
                                },
                                c: {
                                    color: "#fff",
                                    align: "left",
                                    padding: 4,
                                },
                            },
                        },
                    },
                },
            ],
        };
        setOpitons(options);
    };

    useEffect(() => {
        getOptions();
    }, [data, dataType]);

    return (
        <div className={styles.board} style={{ background: token.color12 }}>
            <div classNames={classNames()}>
                <span>在途项目看板</span>
                <SearchInput
                    label="数据维度"
                    type="select"
                    value={dataType}
                    options={[
                        {
                            name: "项目阶段图",
                            code: "phase2Count",
                        },
                        {
                            name: "项目类型图",
                            code: "type2Count",
                        },
                    ]}
                    onChange={setDataType}
                />
            </div>
            <ReactECharts ref={chartRef} option={options} style={{ width: "100%", flex: 1 }} />
        </div>
    );
};

export default Board;
