import React, { useState, useEffect } from "react";
import { Badge, Descriptions } from "antd";

const Index = ({ info }) => {
    const inspections =
        info?.statusZh == "已完成" ? info?.inspectionProcessingResult : info?.inspectionRequire;

    return (
        <>
            <Descriptions title="业务信息">
                {/* <Descriptions.Item label="巡检组管理">
                    <div>
                        <div>
                            <div>
                                <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                <span>{detailRow?.groupName}</span>
                            </div>
                            <div style={{ position: "relative", left: "15px" }}>
                                {detailRow?.checkInfo?.map((item, index) => (
                                    <div style={{ margin: "10px 0 " }}>
                                        <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                        <span>
                                            巡检事项{index + 1}：{item.item}
                                        </span>
                                        <div
                                            style={{
                                                position: "relative",
                                                left: "15px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <img
                                                src={item.img}
                                                alt=""
                                                style={{ width: "100px", height: "120px" }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Descriptions.Item> */}
            </Descriptions>
            <div style={{ color: "#fff", paddingLeft: "20px" }}>
                <div>巡检组管理：</div>
                {_info?.map((item, index) => {
                    return (
                        <div style={{ margin: "10px" }}>
                            <div>
                                <Badge status="success" style={{ marginRight: "10px" }} />
                                <span>{item.name}</span>
                            </div>
                            {item?.items?.map(uu => {
                                return (
                                    <div>
                                        <Badge status="success" style={{ marginRight: "10px" }} />
                                        <span>{uu.name}</span>
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
