import React, { useState, useEffect } from "react";
import { Badge, Descriptions } from "antd";

const Index = ({ info }) => {
    const inspections =
        info?.statusZh == "已完成" ? info?.inspectionProcessingResult : info?.inspectionRequire;

    const Result = ()=>{
        return 
    }    

    return (
        <>
            <Descriptions title="业务信息">
            </Descriptions>
            <div style={{ color: "#fff", paddingLeft: "20px" }}>
                <div>巡检组管理：</div>
                
                
            </div>
        </>
    );
};

export default Index;
