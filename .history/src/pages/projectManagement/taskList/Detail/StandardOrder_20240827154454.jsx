import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Input } from "antd";

const Index = ({ info }) => {
    const DealWith = () => {
        return info?.inspectionRequire?.map((group, index) => {
            return (
                <div>
                    <div>
                        <Badge status="success" style={{ marginRight: "10px" }} />
                        <span>{group.name}</span>
                    </div>
                    {group?.items?.map(item => {
                        return (
                            <div>
                                <div>
                                    <Badge status="success" style={{ marginRight: "10px" }} />
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
        });
    };

    const Result = () => {
        return info?.inspectionProcessingResult?.inspectionItemExecuteResults?.map(
            (group, index) => {
                return (
                    <div>
                        <div>
                            <Badge status="success" style={{ marginRight: "10px" }} />
                            <span>{group.groupName}</span>
                        </div>
                        {group?.inspectionItemExecuteResults?.map(item => {
                            return (
                                <div>
                                    <div>
                                        <Badge status="success" style={{ marginRight: "10px" }} />
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
            }
        );
    };

    return (
        <div style={{ color: "#fff", paddingLeft: "20px" }}>
            <div style={{ margin: "10px 0" }}>巡检组管理：</div>
            {info?.inspectionRequire?.map((group, index) => {
                return (
                    <div style={{marginLeft:10}}>
                        <div>
                            <Badge status="success" style={{ marginRight: "10px" }} />
                            <span>巡检组{index}：{group.name}</span>
                        </div>
                        {group?.items?.map(item => {
                            return (
                                <div style={{marginLeft:10}}>
                                    <div>
                                        <Badge status="success" style={{ marginRight: "10px" }} />
                                        <span>巡检组{index}：{item.name}</span>
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
