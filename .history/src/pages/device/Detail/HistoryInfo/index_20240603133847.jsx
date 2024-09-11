import React, { useState, useEffect, useRef } from "react";
import { Tabs, Drawer, DatePicker, Space, Button } from "antd";
import { SearchInput } from "@/components";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {
    const deviceTypeRef = useRef();
    const [deviceType, setDeviceType] = useState();
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);

    const handleSearch = () => {};

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        deviceTypeRef.current = undefined;
        setDeviceType();
    };

    return (
        <>
            <Space>
                <DatePicker format="YYYY-MM-DD" />
                <SearchInput
                    label=""
                    value={deviceType}
                    type="select"
                    options={deviceTypeOptions}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        deviceTypeRef.current = value;
                        setDeviceType(value);
                    }}
                />
                <Button type="primary" onClick={handleSearch}>
                    查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
        </>
    );
};

export default Index;
