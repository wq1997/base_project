import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from "antd";
import "./index.less";
import dayjs from 'dayjs'

const Year = () => {

    const total = [
        { label: '当年累计收益', value: '543132.91' },
        { label: '当年最高月收益', value: '860281' },
        { label: '当年月均收益', value: '817148.21' },
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
