import React, { useState, useEffect } from "react";
import { Tabs, Drawer, Descriptions, Space } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";
 

const Index = ({   }) => {
 
     

    return (
         <div>
             <Space   >
             <DatePicker format="YYYY-MM-DD" />
             </Space>
         </div>
    );
};

export default Index;
