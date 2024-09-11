import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Input } from "antd";

const Index = ({ info }) => {
    const getResult = (groupName, itemId) => {
        const result = info?.inspectionProcessingResult?.inspectionItemExecuteResults;
       console.log(result?.find(group => group.groupName == groupName))
        if (result) {
            const findItemResult = result?.filter(group => group.groupName == groupName)?.find(item=>item.id==itemId);
            console.log(findItemResult)
        }
    };

    return (
        <div style={{ color: "#fff", paddingLeft: "20px" }}>
            <div style={{ margin: "10px 0" }}>巡检组管理：</div>
            {info?.inspectionRequire?.map((group, groupIndex) => {
                return (
                    <div style={{ marginLeft: 10 }}>
                        <div>
                            <Badge status="success" style={{ marginRight: "10px" }} />
                            <span>
                                巡检组{groupIndex}：{group.name}
                            </span>
                        </div>
                        {group?.items?.map((item, itemIndex) => {
                            return (
                                <div style={{ marginLeft: 10 }}>
                                    <div>
                                        <Badge status="success" style={{ marginRight: "10px" }} />
                                        <span>
                                            巡检项：{itemIndex}：{item.name}
                                        </span>
                                    </div>
                                    {getResult(group.name, item.id)}
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
            <div style={{ margin: "10px 0" }}>巡检备注：</div>
            <Input.TextArea
                disabled={Boolean(info?.status == "COMPLETED")}
                rows={4}
                value={info?.inspectionProcessingResult?.remark}
                style={{ width: "50%" }}
            />
        </div>
    );
};

export default Index;
