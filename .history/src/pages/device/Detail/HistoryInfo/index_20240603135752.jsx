import React, { useState, useEffect, useRef } from "react";
import { Tabs, Drawer, DatePicker, Space, Button } from "antd";
import { SearchInput } from "@/components";
import { getSignalPoint as getSignalPointServer } from "@/services/device";

const Index = ({}) => {
    const signalPointRef = useRef();
    const [signalPoint, setSignalPoint] = useState();
    const [signalPointOptions, setSignalPointOptions] = useState([]);

    const handleSearch = () => {};

    const handleReset = () => {
        signalPointRef.current = undefined;
        setSignalPoint();
    };

    const getSignalPoint = async () => {
        const res = await getSignalPointServer(50);
        if (res?.data?.code == 200) {
            setSignalPointOptions(res?.data?.data);
        }
    };

    useEffect(() => {
        getSignalPoint();
    }, []);

    return (
        <>
            <Space>
                <DatePicker format="YYYY-MM-DD" />
                <SearchInput
                    mode="multiple"
                    inputWidth={{ width: "" }}
                    label="信号点"
                    value={signalPoint}
                    type="select"
                    options={signalPointOptions}
                    onChange={value => {
                        signalPointRef.current = value;
                        setSignalPoint(value);
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
