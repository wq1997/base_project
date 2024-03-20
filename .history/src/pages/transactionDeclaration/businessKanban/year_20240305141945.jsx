import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from "antd";
import { SearchInput } from "@/components";
import Year from "./year";
import "./index.less";

const Account = () => {
 
    return (
        <div>
            <DatePicker
                defaultValue={dayjs("2015/01", 'YYYY/MM')}
                format={'YYYY/MM'}
                picker="month"
            />
        </div>
    );
};

export default Account;
