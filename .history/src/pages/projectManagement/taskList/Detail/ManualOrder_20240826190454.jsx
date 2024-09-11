import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Drawer } from "antd";

const Index = ({ info }) => {
 
    return (
       <>
        <Descriptions title="业务信息">
            
            </Descriptions>
             <div style={{ color: "#fff", paddingLeft: "20px" }}>
             <div style={{ margin: "10px 0" }}>巡检组管理：</div>
             {info?.status == "COMPLETED" ? <Result /> : <Require />}
             <div style={{ margin: "10px 0" }}>巡检备注：</div>
             <Input.TextArea
                 disabled={Boolean(info?.status == "COMPLETED")}
                 rows={4}
                 value={info?.inspectionProcessingResult?.remark}
                 style={{ width: "50%" }}
             />
         </div>
       </>
    );
};

export default Index;
