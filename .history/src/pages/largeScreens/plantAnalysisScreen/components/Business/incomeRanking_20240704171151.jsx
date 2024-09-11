import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import * as echarts from "echarts";
import { MyTab } from "@/components";

const IncomeRanking = ({ profitTop5, profitBottom5 }) => {
    const [options, setOptions] = useState({});
    const [currentType, setCurrentType] = useState("1");

    const getOptions = currentType => {
        const data = currentType == "1" ? profitTop5 : profitBottom5 || [];
        const xData = data?.map(item => item.plantName);
       
    };

    useEffect(() => {
        getOptions();
    }, []);

    useEffect(() => {
        getOptions(currentType);
    }, [currentType]);

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    position: "absolute",
                    right: 5,
                    top: 5,
                    zIndex: 100,
                }}
            >
                <MyTab
                    value={currentType}
                    options={[
                        { value: "1", label: "正序" },
                        { value: "2", label: "倒序" },
                    ]}
                    onChange={value => setCurrentType(value)}
                />
            </div>
            <ReactECharts option={options} style={{ height: "calc(100% - 5px)" }} />
        </div>
    );
};

export default IncomeRanking;
