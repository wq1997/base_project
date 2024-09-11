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

    const CheckOrder = () => {
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

    const ImplementOrder = () => {
        return (
            <Descriptions title="业务信息">
                <Descriptions.Item label="巡检组管理">
                    <div>
                        <div>
                            <div>
                                <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                <span>发货阶段</span>
                            </div>
                            <div style={{ position: "relative", left: "15px" }}>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>到货签收单附件：</span>
                                    <a style={{ marginRight: "10px" }}>电芯附件.xlsx</a>
                                    <a style={{ marginRight: "10px" }}>消防总成附件.xlsx</a>
                                    <a style={{ marginRight: "10px" }}>传感器附件.xlsx</a>
                                    <a style={{ marginRight: "10px" }}>转接线.xlsx</a>
                                </div>
                                <div>
                                    <span>备注：到货数量，批次号，生产日期等信息录入系统</span>
                                </div>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>实际处理人：王**</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                <span>调试阶段</span>
                            </div>
                            <div style={{ position: "relative", left: "15px" }}>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>调试报告附件：</span>{" "}
                                    <a style={{ marginRight: "10px" }}>温度采样分析报告.xlsx</a>
                                    <a style={{ marginRight: "10px" }}>电芯老化测试.xlsx</a>
                                    <a style={{ marginRight: "10px" }}>SOC差值检测.xlsx</a>
                                </div>
                                <div>
                                    <span>备注：保存调试源文件，上传至系统</span>
                                </div>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>实际处理人：张**</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Badge color={"blue"} style={{ marginRight: "10px" }} />
                                <span>验收阶段</span>
                            </div>
                            <div style={{ position: "relative", left: "15px" }}>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>项目验收单附件：</span>
                                    <a style={{ marginRight: "10px" }}>项目总成明细表.xlsx</a>
                                    <a style={{ marginRight: "10px" }}>验收测试项文件.xlsx</a>
                                </div>
                                <div>
                                    <span>备注：需满足验收标准，负责人签字</span>
                                </div>
                                <div style={{ margin: "10px 0 " }}>
                                    <span>实际处理人：李**</span>
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
                <Descriptions.Item label="工单名称">{info?.title}</Descriptions.Item>
                <Descriptions.Item label="关联项目名称">{info?.project?.name}</Descriptions.Item>
                <Descriptions.Item label="处理人">{info?.currentProcessorName}</Descriptions.Item>
                <Descriptions.Item label="工单类型">{info?.typeZh}</Descriptions.Item>
                <Descriptions.Item label="计划开始时间">{info?.planStartDate}</Descriptions.Item>
                <Descriptions.Item label="计划结束时间">{info?.planEndDate}</Descriptions.Item>
                <Descriptions.Item label="发起人">{info?.initiatorName}</Descriptions.Item>
            </Descriptions>

            {detailRow?.type == "巡检工单" ? <CheckOrder /> : <ImplementOrder />}
        </Drawer>
    );
};

export default Detail;
