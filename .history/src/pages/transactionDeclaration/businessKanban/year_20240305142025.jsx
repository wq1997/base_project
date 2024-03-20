import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from "antd";
import { SearchInput } from "@/components";
import "./index.less";

const Year = () => {
 
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

export default Year;
