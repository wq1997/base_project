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
import {
    getPlantType as getPlantTypeServer,
    getPlantInfoById as getPlantInfoByIdServer,
    savePlant as savePlantServer,
    updatePlant as updatePlantServer,
} from "@/services/plant";
import { ALL_SPACE_REG } from "@/utils/constants";
import dayjs from "dayjs";

const baseUrl = process.env.API_URL_1;
const uploadUrl = baseUrl + "/api/v1/plant/upload";

const formatTime = time => (time ? dayjs(time).format("YYYY-MM-DD") : undefined);

const Plant = ({ open, editId, onClose }) => {
    const [form] = Form.useForm();
    const [editData, setEditData] = useState();
    const [plantTypeOptions, setPlantTypeOptions] = useState([]);

    const getPlantType = async () => {
        const res = await getPlantTypeServer();
        if (res?.data?.code == 200) {
            setPlantTypeOptions(res?.data?.data);
        }
    };

    const getPlantInfo = async () => {
        const res = await getPlantInfoByIdServer(editId);
        if (res?.data?.code == 200) {
            const values = res?.data?.data || {};
            form.setFieldsValue({
                ...values,
                gridTime: dayjs(values?.gridTime, "YYYY-MM-DD"),
                logo: values?.logo ? [{ fileName: values?.logo }] : undefined,
                photo: values?.photo ? [{ fileName: values?.photo }] : undefined,
            });
            setEditData({
                ...values,
                logo: values?.logo ? [{ fileName: values?.logo }] : undefined,
                photo: values?.photo ? [{ fileName: values?.photo }] : undefined,
            });
        }
    };

    const onFinish = async (commit, values) => {
        if (!commit) values = form.getFieldsValue();
        const fn = editId ? updatePlantServer : savePlantServer;
        const res = await fn({
            id: editId,
            commit,
            ...values,
            gridTime: formatTime(values?.gridTime),
            logo: values?.logo?.[0]?.fileName || null,
            photo: values?.photo?.[0]?.fileName || null,
        });
        if (res?.data?.code == 200) {
            message.success(`${editId ? "保存" : "添加"}成功`);
            localStorage.removeItem("plantDraft");
            onCancel(true);
        } else {
            message.info(res?.data?.description);
        }
    };

    useEffect(() => {
        getPlantType();
        if (open) {
            if (editId) {
                getPlantInfo();
            } else {
                const plantDraft = JSON.parse(localStorage.getItem("plantDraft"));
                if (plantDraft) {
                    setEditData(plantDraft);
                    form.setFieldsValue({
                        ...plantDraft,
                        gridTime: plantDraft?.gridTime
                            ? dayjs(plantDraft?.gridTime, "YYYY-MM-DD")
                            : undefined,
                    });
                }
            }
        }
    }, [open]);

    const onCancel = isSaveOK => {
        if (!editId && !isSaveOK) {
            localStorage.setItem("plantDraft", JSON.stringify(form.getFieldsValue()));
        }
        setEditData();
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title={editId ? "编辑电站" : "新增电站"}
            width={900}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onCancel(false)}
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
                onFinish={values => onFinish(true, values)}
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
                                {
                                    pattern: ALL_SPACE_REG,
                                    message: "请输入所属公司",
                                },
                            ]}
                        >
                            <Input placeholder="请输入所属公司" disabled={Boolean(editId)} />
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
                                {
                                    pattern: ALL_SPACE_REG,
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
                            label="电站名称"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入电站名称",
                                },
                                {
                                    pattern: ALL_SPACE_REG,
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
                    <Col span={12}>
                        <Form.Item label="电站类型" name="plantType">
                            <Select
                                allowClear={true}
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
                            <Input placeholder="请输入手机号或邮箱" />
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
                                {
                                    pattern: ALL_SPACE_REG,
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
                                min={0}
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
                            <InputNumber
                                placeholder="请输入经度"
                                min={-180}
                                max={180}
                                precision={6}
                                style={{ width: "100%" }}
                            />
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
                            <InputNumber
                                placeholder="请输入纬度"
                                min={-90}
                                max={90}
                                precision={6}
                                style={{ width: "100%" }}
                            />
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
                                files={
                                    editData?.logo?.length
                                        ? editData?.logo?.map(item => ({
                                              url: `${baseUrl}${item?.fileName}`,
                                              status: "done",
                                          }))
                                        : undefined
                                }
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
                                maxSizeMB={5}
                                files={
                                    editData?.photo?.length
                                        ? editData?.photo?.map(item => ({
                                              url: `${baseUrl}${item?.fileName}`,
                                              status: "done",
                                          }))
                                        : undefined
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    wrapperCol={{
                        offset: 19,
                        span: 4,
                    }}
                >
                    <Space style={{ position: "relative", left: 8 }}>
                        <Button onClick={() => onCancel(false)}>取消</Button>
                        {/* <Button type="primary" ghost form="form" onClick={() => onFinish(false)}>
                            保存
                        </Button> */}
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
