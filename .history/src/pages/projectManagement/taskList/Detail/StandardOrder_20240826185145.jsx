import React, { useState, useEffect } from "react";
import { Badge, Descriptions } from "antd";

const Index = ({ info }) => {
    const inspections =
        info?.statusZh == "已完成" ? info?.inspectionProcessingResult : info?.inspectionRequire;

    return (
        <>
            <Descriptions title="业务信息">
            </Descriptions>
            <div style={{ color: "#fff", paddingLeft: "20px" }}>
                <div>巡检组管理：</div>
                {
                     info?.statusZh == "已完成" ? 
                }
                {inspections?.map((group, index) => {
                    return (
                        <div style={{ margin: "10px" }}>
                            <div>
                                <Badge status="success" style={{ marginRight: "10px" }} />
                                <span>{group.name}</span>
                            </div>
                            {group?.items?.map(item => {
                                return (
                                    <div>
                                        <div>
                                            <Badge
                                                status="success"
                                                style={{ marginRight: "10px" }}
                                            />
                                            <span>{item.name}</span>
                                        </div>
                                        {item?.photos?.map(img => (
                                            <img
                                                src={img}
                                                alt=""
                                                style={{ width: "100px", height: "120px" }}
                                            />
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Index;
