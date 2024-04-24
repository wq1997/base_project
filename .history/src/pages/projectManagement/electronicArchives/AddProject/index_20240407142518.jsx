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
    Tooltip,
    Collapse,
    Radio,
} from "antd";
import dayjs from "dayjs";
import { Title } from "@/components";
import { ExclamationCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./index.less";

const { Panel } = Collapse;

const AddProject = ({ detailRow, open, onClose, editCurrentStep }) => {
    console.log(detailRow)
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
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
        const { appointedTimeFrom, appointedTimeTo } = values;
        const res = await saveEnterRecordServer({
            ...values,
            appointedTimeFrom: dayjs(appointedTimeFrom).format("YYYY-MM-DD HH:mm"),
            appointedTimeTo: dayjs(appointedTimeTo).format("YYYY-MM-DD HH:mm"),
        });
        if (res?.data?.status == "SUCCESS") {
            message.success("录入成功");
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        setCurrentStep(editCurrentStep);
    }, [editCurrentStep]);

    return (
        <Modal
            title={<Title>新增项目</Title>}
            width={1200}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(true)}
        >
            <Steps
                style={{ margin: "20px 0" }}
                current={currentStep}
                onChange={step => setCurrentStep(step)}
                items={[
                    {
                        title: "项目基础资料维护",
                    },
                    {
                        title: "项目详细资料维护",
                    },
                    {
                        title: "维护实施管理信息",
                    },
                    {
                        title: "运维管理信息",
                    },
                ]}
            />
            <Form
                style={{
                    width: currentStep == 1 || currentStep == 3 ? "100%" : "50%",
                    margin: "0 auto",
                }}
                name="basic"
                labelCol={{
                    span: 9,
                }}
                wrapperCol={{
                    span: 16,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                initialValues={detailRow}
            >
                {currentStep == 0 && (
                    <>
                        <Form.Item
                            label="立项时间"
                            name='time'
                            rules={[
                                {
                                    required: true,
                                    message: "请选择立项时间",
                                },
                            ]}
                        >
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                       
                    </>
                )}

                 

                <Form.Item
                    wrapperCol={{
                        offset: 11,
                        span: 5,
                    }}
                >
                    <Space>
                        <Button htmlType="submit">保存</Button>
                        {currentStep != 0 && (
                            <Button type="primary" onClick={() => setCurrentStep(currentStep - 1)}>
                                上一步
                            </Button>
                        )}
                        {currentStep != 3 && (
                            <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                                下一步
                            </Button>
                        )}
                    </Space>
                    {/* <Space>
                        <Button onClick={() => onClose(true)}>取消</Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Space> */}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProject;
