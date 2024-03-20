import React, { useState, useEffect, useRef } from "react";
import { Space, Radio, DatePicker } from "antd";
import Year from "./year";
import Month from "./month";
import dayjs from "dayjs";
import { SearchInput } from "@/components";
import "./index.less";

const Account = () => {
    const [type, setType] = useState("month");

    return (
        <div style={{ height: "100%" }}>
            <Space className="search">
                <SearchInput
                    label="场站切换"
                    type="select"
                    options={[{ name: "测试电站", code: 1 }]}
                />
            </Space>
            <div>
                <Radio.Group value={type} onChange={e => setType(e.target.value)}>
                    <Radio.Button value={"month"}>按月度</Radio.Button>
                    <Radio.Button value={"year"}>按年度</Radio.Button>
                </Radio.Group>
                <DatePicker
                    defaultValue={dayjs("2015/01", "YYYY/MM")}
                    format={"YYYY/MM"}
                    picker="month"
                />
            </div>

            {type == "month" ? <Month /> : <Year />}
        </div>
    );
};

export default Account;
