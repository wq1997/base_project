import React, { useState, useEffect } from "react";
import { Tabs, Drawer, DatePicker, Space } from "antd";
import { SearchInput } from "@/components";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {
    const deviceTypeRef = useRef();
    const [deviceType, setDeviceType] = useState();
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);

    const handleSearch =()=>{

    }


    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        deviceTypeRef.current = undefined;
        setDeviceType();
        plantNameRef.current = undefined;
        setPlantName();
        communicationStatusRef.current = undefined;
        setCommunicationStatus();
        deviceNameRef.current = undefined;
        setDeviceName();
        snRef.current = undefined;
        setSn();
        deviceModelRef.current = undefined;
        setDeviceModel();
        getList();
    };

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
                <Button type="primary" onClick={handleSearch}>
                    查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
        </>
    );
};

export default Index;
