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
import StandardOrder from './StandardOrder'
import "./index.less";

const Detail = ({ detailId, onClose }) => {
    const detailRow = {};
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(3);
    const [info, setInfo] = useState([]);

    const getInfo = async () => {
        const res = await workOrderInfoServer(detailId);
        if (res?.data?.status == "SUCCESS") {
            setInfo(res?.data?.data);
        }
    };

    const onFinish = async values => {
        return;
    };

    useEffect(() => {
        if (detailId) {
            setOpen(true);
            getInfo();
        } else {
            setOpen(false);
        }
    }, [detailId]);

    // 标准工单
    const StandardOrder = () => {
       
    };

    // 手工工单
    const ManualOrder = () => {
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

   

 
    return    (
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
