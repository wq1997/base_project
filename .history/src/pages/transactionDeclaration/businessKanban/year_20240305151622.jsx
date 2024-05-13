import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from "antd";
import "./index.less";
import dayjs from "dayjs";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const Year = () => {
    const total = [
        { label: "当年累计收益(元)", value: "543132.91" },
        { label: "当年最高月收益(元)", value: "860281" },
        { label: "当年月均收益(元)", value: "817148.21" },
    ];

    return (
        <div style={{ marginTop: "10px" }}>
            <DatePicker
                defaultValue={dayjs("2015/01", "YYYY/MM")}
                format={"YYYY/MM"}
                picker="month"
            />
            <div className="total">
                {total?.map(item => (
                    <div>
                        <div className="label">{item.label}</div>
                        <div className="value">{item.value}</div>
                    </div>
                ))}
            </div>
            <div className="content" style={{ paddingTop: "30px" }}>
                    <ReactECharts option={options} style={{ width: "100%", height: "100%" }} />
                </div>
        </div>
    );
};

export default Year;