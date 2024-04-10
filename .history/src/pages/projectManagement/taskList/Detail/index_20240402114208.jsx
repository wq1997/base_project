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
import "./index.less";

const Detail = ({ detailRow, onClose }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(3);
    const [checkGroup, setCheckGroup] = useState([]);
    const [responseTypeList, setResponseTypeList] = useState();
    const [responseTimeTypeList, setResponseTimeTypeList] = useState();

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { responseTypes, responseTimeTypes } = res?.data?.data;
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    const onFinish = async values => {
        return;
    };

    useEffect(() => {
        setOpen(Boolean(detailRow));
    }, [detailRow]);

    const CheckOrder = () => {
        return (
            <Descriptions title="业务信息">
                <Descriptions.Item label="关联项目">{detailRow?.projectName}</Descriptions.Item>
                <Descriptions.Item label="计划开始时间">{detailRow?.start}</Descriptions.Item>
                <Descriptions.Item label="计划结束时间">{detailRow?.end}</Descriptions.Item>
                <Descriptions.Item label="巡检组管理">
                    <div>
                        <div>
                            <div>
                                <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                <span>巡检组1</span>
                            </div>
                            <div style={{ position: "relative", left: "15px" }}>
                                <div style={{ margin: "10px 0 " }}>
                                    <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                    <span>巡检事项1：xxxxxxxx，xxxxxxxxxx</span>
                                    <div
                                        style={{
                                            position: "relative",
                                            left: "15px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                    </div>
                                </div>
                                <div>
                                    <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                    <span>巡检事项2：xxxxxxxx，xxxxxxxxxx</span>
                                    <div
                                        style={{
                                            position: "relative",
                                            left: "15px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: "10px 0 " }}>
                            <div>
                                <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                <span>巡检组2</span>
                            </div>
                            <div style={{ position: "relative", left: "15px" }}>
                                <div style={{ margin: "10px 0 " }}>
                                    <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                    <span>巡检事项1：xxxxxxxx，xxxxxxxxxx</span>
                                    <div
                                        style={{
                                            position: "relative",
                                            left: "15px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                    </div>
                                </div>
                                <div>
                                    <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                    <span>巡检事项2：xxxxxxxx，xxxxxxxxxx</span>
                                    <div
                                        style={{
                                            position: "relative",
                                            left: "15px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Descriptions.Item>
            </Descriptions>
        );
    };

    const ImplementOrder = () => {
        return (
            <Descriptions title="业务信息">
                <Descriptions.Item label="工单描述" span={3}>
                    Zhou Maomao
                </Descriptions.Item>
                <Descriptions.Item label="巡检组管理">
                    <div>
                        <div>
                            <div>
                                <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                <span>发货阶段</span>
                            </div>
                            <div style={{ position: "relative", left: "15px" }}>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>
                                        到货签收单附件：
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                        <FileTextFilled className="file" />
                                    </span>
                                </div>
                                <div>
                                    <span>备注：xxxxxxxx，xxxxxxxxxx</span>
                                </div>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>实际处理人：xxxxxxxx，xxxxxxxxxx</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                <span>发货阶段</span>
                            </div>
                            <div style={{ position: "relative", left: "15px" }}>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>
                                        调试报告附件：
                                        <span>
                                            到货签收单附件：
                                            <FileTextFilled className="file" />
                                            <FileTextFilled className="file" />
                                            <FileTextFilled className="file" />
                                            <FileTextFilled className="file" />
                                            <FileTextFilled className="file" />
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <span>备注：xxxxxxxx，xxxxxxxxxx</span>
                                </div>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>实际处理人：xxxxxxxx，xxxxxxxxxx</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                <span>发货阶段</span>
                            </div>
                            <div style={{ position: "relative", left: "15px" }}>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>
                                        项目验收单附件：
                                        <span>
                                            到货签收单附件：
                                            <FileTextFilled className="file" />
                                            <FileTextFilled className="file" />
                                            <FileTextFilled className="file" />
                                            <FileTextFilled className="file" />
                                            <FileTextFilled className="file" />
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <span>备注：xxxxxxxx，xxxxxxxxxx</span>
                                </div>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>实际处理人：xxxxxxxx，xxxxxxxxxx</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Descriptions.Item>
            </Descriptions>
        );
    };

    return (
        <Drawer
            title={"工单详情"}
            width={"90%"}
            confirmLoading={true}
            open={open}
            footer={null}
            onClose={() => onClose(false)}
        >
            <Descriptions title="基础信息">
                <Descriptions.Item label="工单名称">{detailRow?.projectName}</Descriptions.Item>
                <Descriptions.Item label="工单类型">{detailRow?.projectName}</Descriptions.Item>
                <Descriptions.Item label="计划结束时间">{detailRow?.projectName}</Descriptions.Item>
                a
                <Descriptions.Item label="关联项目名称">{detailRow?.projectName}</Descriptions.Item>
                <Descriptions.Item label="工单场景">{detailRow?.projectName}</Descriptions.Item>
                <Descriptions.Item label="发起人">**</Descriptions.Item>
                <Descriptions.Item label="处理人">**</Descriptions.Item>
                <Descriptions.Item label="计划开始时间">{detailRow?.start}</Descriptions.Item>
            </Descriptions>

            {detailRow?.type == "巡检工单" ? <CheckOrder /> : <ImplementOrder />}
        </Drawer>
    );
};

export default Detail;
