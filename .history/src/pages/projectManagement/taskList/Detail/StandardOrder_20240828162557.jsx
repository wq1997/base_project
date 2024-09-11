import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Input } from "antd";
import { jsonToUrlParams } from "@/utils/utils";
import {   DOWNLOAD_URL } from "@/utils/constants";

const Index = ({ info }) => {
    const getResult = (groupName, itemId) => {
        const result = info?.inspectionProcessingResult?.inspectionItemExecuteResults;
        if (result) {
            const findItemResult = result
                ?.filter(group => group.groupName == groupName)
                ?.find(item => item.refBasId == itemId);

            return findItemResult;
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
                                <div style={{ margin: "10px 20px", fontSize: 13 }}>
                                    <div>
                                        <Badge status="success" style={{ marginRight: "10px" }} />
                                        <span>
                                            巡检项：{itemIndex}：{item.name}
                                        </span>
                                    </div>
                                    <div style={{ margin: "10px 15px" }}>
                                        巡检结果：
                                        <span style={{ marginRight: 10 }}>
                                            {getResult(group.name, item.id)?.remark}
                                        </span>
                                        {getResult(group.name, item.id)?.photos?.map(imgId => {
                                            return (
                                                <a
                                                    href={`${DOWNLOAD_URL}/${imgId}${jsonToUrlParams(
                                                        {
                                                            access_token:
                                                                localStorage.getItem("Token"),
                                                        }
                                                    )}`}
                                                >
                                                    imgId
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            <div style={{ margin: "10px 0" }}>
                巡检备注：{info?.inspectionProcessingResult?.remark}
            </div>
        </div>
    );
};

export default Index;
