import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Image, Space } from "antd";
import { jsonToUrlParams } from "@/utils/utils";
import { DOWNLOAD_URL } from "@/utils/constants";

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
        <div>
            <div style={{ margin: "10px 0" }}>巡检组管理：</div>
            {info?.inspectionRequire?.map((group, groupIndex) => {
                return (
                    <div style={{ marginLeft: 10 }}>
                        <div>
                            <Badge status="success" style={{ marginRight: "10px" }} />
                            <span>巡检组：{group.name}</span>
                        </div>
                        {group?.items?.map((item, itemIndex) => {
                            return (
                                <div style={{ margin: "10px 15px", fontSize: 13 }}>
                                    <div>
                                        <Badge status="success" style={{ marginRight: "10px" }} />
                                        <span>巡检项：{item.name}</span>
                                    </div>
                                    <div style={{ margin: "10px 15px", display: "flex" }}>
                                        <div>巡检结果：</div>
                                        <div>
                                            <div style={{ marginRight: 10, marginBottom: 5 }}>
                                                {getResult(group.name, item.id)?.remark}
                                            </div>
                                            <div>
                                                <Space>
                                                    {getResult(group.name, item.id)?.photos?.map(
                                                        item => {
                                                            return (
                                                                // <a
                                                                //     href={`${DOWNLOAD_URL}/${item?.id}${jsonToUrlParams(
                                                                //         {
                                                                //             access_token:
                                                                //                 localStorage.getItem("Token"),
                                                                //         }
                                                                //     )}`}
                                                                // >
                                                                //     {item?.fileName}
                                                                // </a>
                                                                <Image
                                                                    src={`${DOWNLOAD_URL}/${item?.id}`}
                                                                    width={100}
                                                                    height={80}
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </Space>
                                            </div>
                                        </div>
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
