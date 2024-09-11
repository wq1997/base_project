import React, { useState, useEffect } from "react";
import { Tabs, Drawer, DatePicker, Space } from "antd";
import { SearchInput } from "@/components";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {
    const deviceTypeRef = useRef();
    const [deviceType, setDeviceType] = useState();
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);

    return (
        <>
            <Space>
                <DatePicker format="YYYY-MM-DD" />
                <SearchInput
                    label="设备类型"
                    value={deviceType}
                    type="select"
                    options={deviceTypeOptions}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        deviceTypeRef.current = value;
                        setDeviceType(value);
                    }}
                />
            </Space>
        </>
    );
};

export default Index;
