import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from "antd";
import "./index.less";
import dayjs from 'dayjs'

const Year = () => {

    const total =[
        {label:'当年累计收益',value:'1'},
        {label:'当年累计收益',value:'1'},
        {label:'当年累计收益',value:'1'},
    ]

    return (
        <div style={{ marginTop: '10px' }}>
            <DatePicker
                defaultValue={dayjs("2015/01", 'YYYY/MM')}
                format={'YYYY/MM'}
                picker="month"
            />
            <div className="total">
             
            </div>
        </div>
    );
};

export default Year;
