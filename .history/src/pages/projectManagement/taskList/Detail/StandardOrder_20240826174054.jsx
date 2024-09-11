import React, { useState, useEffect } from "react";
import {
    message,
    Button,
    Form,
    Input,
    Modal,
    Steps,
    DatePicker,
    Space,
    Select,
    Row,
    Col,
    Badge,
    Descriptions,
    Drawer,
} from "antd";
import dayjs from "dayjs";
import { Title } from "@/components";
import { ExclamationCircleOutlined, FileTextFilled } from "@ant-design/icons";
import { workOrderInfo as workOrderInfoServer } from "@/services/workOrder";
import StandardOrder from "./StandardOrder";
import "./index.less";

const Detail = ({ info }) => {
    return (
        <Descriptions title="业务信息">
            <Descriptions.Item label="巡检组管理">
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
            </Descriptions.Item>
        </Descriptions>
    );
};

export default Detail;
