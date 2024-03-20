import React, { useState, useEffect, useRef } from "react";
import { Space, } from "antd";

import { SearchInput } from "@/components";
import "./index.less";


const Account = () => {

    const [type, setType] = useState('month')

    return (
        <div>
            <Space className="search">
                <SearchInput
                    label="场站切换"
                    type="select"
                    options={[{ name: "测试电站", code: 1 }]}
                />
            </Space>
            <Button type="primary" onClick={getInviteList}>
                搜索
            </Button>
            <Button onClick={handleReset}>重置</Button>
        </div>
    );
};

export default Account;
