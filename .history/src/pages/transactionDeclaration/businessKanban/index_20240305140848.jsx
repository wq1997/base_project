import React, { useState, useEffect, useRef } from "react";
import { Space, Radio } from "antd";

import { SearchInput } from "@/components";
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
                <Radio.Group value={'month'}>
                    <Radio.Button  >按月度</Radio.Button>
                    <Radio.Button>按年度</Radio.Button>
                </Radio.Group>
            </div>
        </div>
    );
};

export default Account;
