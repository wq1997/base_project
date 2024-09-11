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
            
        </>
    );
};

export default Index;
