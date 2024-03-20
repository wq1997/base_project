import React, { useState, useEffect, useRef } from "react";
import { Space, Button } from "antd";

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
                <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
                    <Button type="primary">按月度</Button>
                    <Button>按年度</Button>
                </Radio.Group>
            </div>
        </div>
    );
};

export default Account;
