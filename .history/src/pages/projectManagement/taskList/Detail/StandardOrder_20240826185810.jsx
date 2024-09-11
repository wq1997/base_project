import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Input } from "antd";

const Index = ({ info }) => {
    const Require = () => {
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
        <>
            <Descriptions title="业务信息"></Descriptions>
            <div style={{ color: "#fff", paddingLeft: "20px" }}>
                <div style={{ margin: "10px 0" }}>巡检组管理：</div>
                {info?.statusZh == "已完成" ? <Result /> : <Require />}
                <div style={{ margin: "10px 0" }}>巡检备注：</div>
                <Input.TextArea
                    rows={4}
                    value={info?.inspectionProcessingResult?.remark}
                    style={{ width: "50%" }}
                />
            </div>
        </>
    );
};

export default Index;
