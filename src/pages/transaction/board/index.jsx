import React, { useState, useEffect, useRef } from "react";
import { Space, Radio, DatePicker } from "antd";
import Year from "./year";
import Month from "./month";
import dayjs from "dayjs";
import { SearchInput, CardPage } from "@/components";
import "./index.less";

const Account = () => {
    const [type, setType] = useState("month");

    return (
        <CardPage>
            <div>
                <Space>
                    <Radio.Group value={type} onChange={e => setType(e.target.value)}>
                        <Radio.Button value={"month"}>按月度</Radio.Button>
                        <Radio.Button value={"year"}>按年度</Radio.Button>
                    </Radio.Group>
                    <SearchInput
                        label="场站切换"
                        type="select"
                        value={1}
                        options={[{ name: "测试电站", code: 1 }]}
                    />
                    <DatePicker
                        defaultValue={dayjs("2015/02", "YYYY/MM")}
                        format={"YYYY/MM"}
                        picker="month"
                    />
                </Space>
            </div>
            {type == "month" ? <Month /> : <Year />}
        </CardPage>
    );
};

export default Account;
