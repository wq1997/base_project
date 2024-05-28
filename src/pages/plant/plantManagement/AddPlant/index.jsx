import React, { useState, useEffect } from "react";
import {
    message,
    Button,
    Select,
    Form,
    Input,
    Modal,
    Row,
    Col,
    Radio,
    Space,
    InputNumber,
    DatePicker,
    Tooltip,
} from "antd";
import { MyUpload, AuthImg } from "@/components";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { savePlant as savePlantServer } from "@/services/plant";
import { getPlantType as getPlantTypeServer } from "@/services/plant";
import dayjs from "dayjs";

const uploadUrl = process.env.API_URL_1 + "/api/v1/plant/upload";

const Plant = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [editData, setEditData] = useState();
    const [plantTypeOptions, setPlantTypeOptions] = useState([]);

    const getPlantType = async () => {
        const res = await getPlantTypeServer();
        if (res?.data?.data) {
            setPlantTypeOptions(res?.data?.data);
        }
    };

    const onFinish = async (values, commit) => {
        if (!commit) {
            console.log(form.getFieldsValue());
        }
        return;
        const res = await savePlantServer({
            id: editId,
            commit,
            ...values,
            gridTime: dayjs(values?.gridTime).format("YYYY-MM-DD"),
            logo: values?.logo?.[0]?.fileName,
            photo: values?.photo?.[0]?.fileName,
        });
        if (res?.data?.code == 200) {
            message.success(`${commit ? "添加" : "保存"}成功`);
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        getPlantType();
        // open && getPlantType();
    }, [open]);

    return (
        <Modal
            title={editId ? "编辑电站" : "新增电站"}
            width={900}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Form
                id="form"
                name="basic"
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 12,
                }}
                form={form}
                onFinish={values => onFinish(values, true)}
                autoComplete="off"
            >
                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="所属公司"
                            name="company"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入所属公司",
                                },
                            ]}
                        >
                            <Input placeholder="请输入所属公司" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="电站名称"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入电站名称",
                                },
                            ]}
                        >
                            <Input
                                placeholder="请输入电站名称"
                                onBlur={() => {
                                    console.log("onBlur");
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="电站类型"
                            name="plantType"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择电站类型",
                                },
                            ]}
                        >
                            <Select
                                placeholder="请选择电站类型"
                                fieldNames={{ label: "displayName", value: "name" }}
                                options={plantTypeOptions}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="并网时间"
                            name="gridTime"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择并网时间",
                                },
                            ]}
                        >
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="联系人" name="contact">
                            <Input placeholder="请输入联系人" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="联系方式" name="contactWay">
                            <Input placeholder="请输入联系方式" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="电站地址"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入电站地址",
                                },
                            ]}
                        >
                            <Input placeholder="请输入电站地址" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="电站组串总容量(kWp)"
                            name="totalCapacity"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入电站组串总容量",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入电站组串总容量"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="经度"
                            name="longitude"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入经度",
                                },
                            ]}
                        >
                            <InputNumber placeholder="请输入经度" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="纬度"
                            name="latitude"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入经纬度",
                                },
                            ]}
                        >
                            <InputNumber placeholder="请输入纬度" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Tooltip
                            style={{ position: "relative" }}
                            title="逆变器统计时，电站累计发电量从设备并网发电时刻开始统计"
                        >
                            <QuestionCircleOutlined
                                style={{ position: "absolute", top: "-6px", left: "160px" }}
                            />
                        </Tooltip>
                        <Form.Item
                            label="累计发电量统计模式"
                            name="statisticalModel"
                            initialValue={"逆变器统计"}
                        >
                            <Input disabled={true} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={24}>
                        <Form.Item
                            label="电站简介"
                            name="description"
                            labelCol={{
                                span: 5,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                        >
                            <Input.TextArea style={{ width: "100%" }} showCount maxLength={800} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={24}>
                        <Form.Item
                            label="电站logo"
                            name="logo"
                            labelCol={{
                                span: 5,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                        >
                            <MyUpload
                                accept=".jpg,.png,.jpeg,.bmp"
                                url={uploadUrl}
                                maxCount={1}
                                maxSizeMB={5}
                                files={editData?.contractAtt?.map(item => ({
                                    ...item,
                                    name: item.fileName,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={24}>
                        <Form.Item
                            label="电站图片"
                            name="photo"
                            labelCol={{
                                span: 5,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                        >
                            <MyUpload
                                accept=".jpg,.png,.jpeg,.bmp"
                                url={uploadUrl}
                                maxCount={1}
                                maxSizeMB={20}
                                files={editData?.contractAtt?.map(item => ({
                                    ...item,
                                    name: item.fileName,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    wrapperCol={{
                        offset: 17,
                        span: 5,
                    }}
                >
                    <Space style={{ position: "relative", left: 8 }}>
                        <Button onClick={() => onClose(false)}>取消</Button>
                        <Button
                            type="primary"
                            ghost
                            form="form"
                            onClick={values => onFinish(values, false)}
                        >
                            保存
                        </Button>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Plant;
