import React, { useState, useEffect } from "react";
import { Tabs, Drawer, Descriptions } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";
import Settings from "./Settings";
import BaseData from "./BaseData";

const Index = ({}) => {
    return (
        <>
            <Settings />
            <BaseData />
        </>
    );
};

export default Index;
