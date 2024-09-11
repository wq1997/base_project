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
        <>
            <Descriptions title="业务信息"></Descriptions>
            <div style={{ color: "#fff", paddingLeft: "20px" }}>
                <div style={{ margin: "10px 0" }}>巡检组管理：</div>
                {info?.status == "COMPLETED" ? <Result /> : <DealWith />}
                <div style={{ margin: "10px 0" }}>工单描述：{info?.description}</div>
                <Input
                    disabled={Boolean(info?.status == "COMPLETED")}
                    value={info?.description}
                    style={{ width: "50%" }}
                />
            </div>
        </>
    );
};

export default Index;
