import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from 'antd';
import { SearchInput } from "@/components";
import Year from './year'
import "./index.less";

const Account = () => {
    const [type, setType] = useState("month");

    return (
        <div>
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
            </div>
            <Year />
        </div>
    );
};

export default Account;
