import React, { useState, useEffect } from "react";
import { Tabs, Drawer, DatePicker, Space } from "antd";
import { SearchInput } from "@/components";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";

const Index = ({}) => {
    return (
        <>
            <Space>
                <DatePicker format="YYYY-MM-DD" />
            </Space>
        </>
    );
};

export default Index;
