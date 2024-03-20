import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from "antd";
import { SearchInput } from "@/components";
import Year from "./year";
import "./index.less";

const Account = () => {
    const [type, setType] = useState("month");

    return (
        <div>
            <DatePicker
                defaultValue={dayjs("2015/01", monthFormat)}
                format={monthFormat}
                picker="month"
            />
        </div>
    );
};

export default Account;
