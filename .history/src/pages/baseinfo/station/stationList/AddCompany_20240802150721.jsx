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
} from "antd";
import {
    getStationUpdateInitData as getUpdateInitDataServer,
    updateStation as updateCompanyServer,
    getUpdateInitData as getCompanyUpdateInitDataServer,
} from "@/services/sz_index";
import { MyUpload } from "@/components";

const uploadUrl = process.env.API_URL_1 + "/attachment/upload2";

const Company = ({ open, editId, initData, onClose }) => {
    const [form] = Form.useForm();
    const [editData, setEditData] = useState();
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [cloud, setCityList] = useState([]);
    const [stationTypes, setStationTypes] = useState([]);

    const getUpdateInitData = async () => {
        const res = await getUpdateInitDataServer({ id: editId });
        if (res?.data?.status == "SUCCESS") {
            const { editData, provinces, stationTypes, province2Cities } = res?.data?.data;
            editData
                ? form.setFieldsValue({
                      ...editData,
                      longitude: editData?.location?.longitude,
                      latitude: editData?.location?.latitude,
                  })
                : form.resetFields();
            if (editData?.companyId) {
                const res = await getCompanyUpdateInitDataServer({ id: editData?.companyId });
                if (res?.data?.data) {
                    const data = res?.data?.data?.editData;
                    form.setFieldsValue({
                        operator: data?.operator,
                        operatorTel2: data?.operatorTel2,
                        operatorTel1: data?.operatorTel1,
                    });
                }
            }
            setEditData(editData);
            setProvinces(provinces);
            setCityList(province2Cities);
            setStationTypes(stationTypes);
        }
    };

    const getCityByProvince = async province => {
        setCities(cityList[province]);
    };

    const onFinish = async values => {
        const res = await updateCompanyServer({
            id: editId,
            location: {
                longitude: values?.longitude,
                latitude: values?.latitude,
            },
            ...values,
        });

        if (res?.data?.status == "SUCCESS") {
            message.success(`${editId ? "编辑" : "添加"}成功`);
            onClose(true);
        } else {
            message.info(res?.data?.msg);
        }
    };

    useEffect(() => {
        open && getUpdateInitData();
    }, [open]);

    return (
        <Modal
            title={`${editId ? "编辑" : "新增"}场站`}
            width={900}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 14,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <strong className="category-title">站点基础信息</strong>
                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="场站名称"
                            name="resourceName"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入场站名称",
                                },
                            ]}
                        >
                            <Input placeholder="请输入场站名称" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="关联公司"
                            name="companyId"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择关联公司",
                                },
                            ]}
                        >
                            <Select
                                options={initData?.companies?.map(item => ({
                                    label: item?.userName,
                                    value: item?.id,
                                }))}
                                placeholder="请选择关联公司"
                                onChange={async value => {
                                    const res = await getCompanyUpdateInitDataServer({ id: value });
                                    if (res?.data?.data) {
                                        const data = res?.data?.data?.editData;
                                        form.setFieldsValue({
                                            operator: data?.operator,
                                            operatorTel2: data?.operatorTel2,
                                            operatorTel1: data?.operatorTel1,
                                        });
                                    }
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="所在省份"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择所在省份",
                                },
                            ]}
                        >
                            <Select
                                placeholder="请选择所在省份"
                                options={provinces?.map(item => ({ label: item, value: item }))}
                                onSelect={value => getCityByProvince(value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="所在市"
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择所在市",
                                },
                            ]}
                        >
                            <Select
                                placeholder="请选择所在市"
                                options={cities?.map(item => ({ label: item, value: item }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="详细地址"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入详细地址",
                                },
                            ]}
                        >
                            <Input placeholder="请输入详细地址" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="用电户号"
                            name="resourceId"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入用电户号",
                                },
                            ]}
                        >
                            <Input placeholder="请输入用电户号" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="站点经度"
                            name="longitude"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入站点经度",
                                },
                            ]}
                        >
                            <Input placeholder="请输入站点经度" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="站点纬度"
                            name="latitude"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入站点纬度",
                                },
                            ]}
                        >
                            <Input placeholder="请输入站点纬度" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="场站类型"
                            name="stationType"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择场站类型",
                                },
                            ]}
                        >
                            <Select
                                placeholder="请选择场站类型"
                                fieldNames={{
                                    label: "name",
                                    value: "code",
                                }}
                                options={stationTypes}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item label="合同文件" name="contractAtt">
                            <MyUpload
                                url={uploadUrl}
                                files={editData?.contractAtt?.map(item => ({
                                    ...item,
                                    name: item.fileName,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="其他附件" name="otherAtt">
                            <MyUpload
                                url={uploadUrl}
                                files={editData?.otherAtt?.map(item => ({
                                    ...item,
                                    name: item.fileName,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <strong className="category-title">响应能力</strong>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="关联云平台场站"
                            name="stationCode"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入采日云平台登记场站号",
                                },
                            ]}
                        >
                            <Select
                                options={initData?.sePlants?.map(item => ({
                                    label: item?.name,
                                    value: item?.plantId,
                                }))}
                                placeholder="请选择云平台场站"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="是否默认确认任务"
                            name="autoConfirmTask"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择是否默认确认任务",
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="最大调节功率(KW)"
                            name="maxAdjustablePower"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入最大调节功率",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入最大调节功率，要求整数"
                                style={{ width: "100%" }}
                                min={0}
                                precision={0}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="设备最大容量(KWh)"
                            name="deviceMaximumCapacity"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入设备最大容量",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入设备最大容量"
                                style={{ width: "100%" }}
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="最大上升速率(KW/min)"
                            name="increaseRate"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入最大上升速率",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入最大上升速率，要求两位小数"
                                style={{ width: "100%" }}
                                min={0}
                                precision={2}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="最大下降速率(KW/min)"
                            name="decreaseRate"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入最大下降速率",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入最大下降速率，要求两位小数"
                                style={{ width: "100%" }}
                                min={0}
                                precision={2}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="响应时间级别"
                            name="responseLevel"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择响应时间级别",
                                },
                            ]}
                        >
                            <Select
                                placeholder="请选择响应时间级别"
                                options={initData?.responseLevels?.map(item => ({
                                    label: item?.showStr,
                                    value: item?.code,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="邀约平台分润比例"
                            name="platformProfitSharingRatio"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入邀约平台分润比例",
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="请输入邀约平台分润比例"
                                style={{ width: "100%" }}
                                min={0}
                                max={100}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="紧急联系人"
                            name="operator"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入紧急联系人",
                                },
                            ]}
                        >
                            <Input placeholder="请输入紧急联系人名称" disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="紧急联系人电话1"
                            name="operatorTel1"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入紧急联系人电话",
                                },
                            ]}
                        >
                            <Input placeholder="请输入紧急联系人电话" disabled />
                        </Form.Item>
                    </Col>
                </Row>

                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="紧急联系人电话2"
                            name="operatorTel2"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入紧急联系人电话",
                                },
                            ]}
                        >
                            <Input placeholder="请输入紧急联系人电话" disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    wrapperCol={{
                        offset: 19,
                        span: 5,
                    }}
                >
                    <Space style={{ position: "relative", left: 8 }}>
                        <Button onClick={() => onClose(false)}>取消</Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Company;
