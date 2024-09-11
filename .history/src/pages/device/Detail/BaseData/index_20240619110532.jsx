import React, { useState, useEffect } from "react";
import { Space, Button, DatePicker, Input, Descriptions, Form, Row, Col, message } from "antd";
import { updateDevice as updateDeviceServer } from "@/services/device";
import { ALL_SPACE_REG } from "@/utils/constants";
import "./index.less";
import dayjs from "dayjs";

const formatTime = time => (time ? dayjs(time).format("YYYY-MM-DD") : undefined);

const Index = ({ deviceInfo }) => {
    const [form] = Form.useForm();
    const [realData, setRealData] = useState([
        { label: "设备状态", key: "inverterStatus", value: "" },
        { label: "当日发电量", key: "dailyGeneration", value: "", unit: "kWh" },
        { label: "累计发电量", key: "totalGeneration", value: "", unit: "kWh" },
        { label: "功率因数", key: "powerFactor", value: "" },
        { label: "有功功率", key: "activePower", value: "", unit: "kW" },
        { label: "无功功率", key: "reactivePower", value: "", unit: "kVar" },
        { label: "逆变器额定功率", key: "ratedPower", value: "", unit: "kW" },
        { label: "电网频率", key: "gridFrequency", value: "", unit: "" },
        { label: "输出方式", key: "outputMode", value: "" },
        { label: "电网A相电流", key: "gridCurrentA", value: "", unit: "A" },
        { label: "电网B相电流", key: "gridCurrentB", value: "", unit: "A" },
        { label: "电网C相电流", key: "gridCurrentC", value: "", unit: "A" },
        { label: "电网A相电压", key: "gridVoltageA", value: "", unit: "V" },
        { label: "电网B相电压", key: "gridVoltageB	", value: "", unit: "V" },
        { label: "电网C相电压", key: "gridVoltageC", value: "", unit: "V" },
        { label: "开机时间", key: "inverterStartTime", value: "" },
        { label: "关机时间", key: "inverterStopTime", value: "" },
        { label: "绝缘阻抗值", key: "insulationResistance", value: "", unit: "" },
        { label: "内部温度", key: "internalTemperature", value: "", unit: "°C" },
    ]);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (!deviceInfo) return;
        const { inverterInfo, realtimeList } = deviceInfo;
        const _dataSource = [
            {
                title: "组串",
                value: [],
            },
            { title: "输入电压(V)", value: [] },
            {
                title: "输入电流(A)",
                value: [],
            },
        ];
        Object.keys(realtimeList || {})
            .sort((a, b) => Number(a.match(/\d+/g)[0]) - Number(b.match(/\d+/g)[0]))
            .forEach(key => {
                _dataSource[0]?.value?.push(key);
                _dataSource[1]?.value?.push(realtimeList?.[key]?.V);
                _dataSource[2]?.value?.push(realtimeList?.[key]?.A);
            });
        setDataSource(_dataSource);
        setRealData(
            [...realData]?.map(item => ({
                ...item,
                value: inverterInfo?.[item.key],
            }))
        );
        form.setFieldsValue({
            ...deviceInfo,
            warrantyPeriod: deviceInfo?.warrantyPeriod
                ? dayjs(deviceInfo?.warrantyPeriod, "YYYY-MM-DD")
                : null,
        });
    }, [deviceInfo]);

    const onFinish = () => {
        form.validateFields().then(async values => {
            const res = await updateDeviceServer({
                id: deviceInfo?.id,
                name: values?.name,
                warrantyPeriod: values?.warrantyPeriod ? formatTime(values?.warrantyPeriod) : null,
            });
            if (res?.data?.code == 200) {
                message.success(`更新成功`);
            } else {
                message.info(res?.data?.description);
            }
        });
    };

    return (
        <>
            <Descriptions
                title="基础信息"
                extra={
                    <Button type="primary" onClick={onFinish}>
                        保存
                    </Button>
                }
            ></Descriptions>
            <Form
                name="basic"
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 14,
                }}
                form={form}
                autoComplete="off"
                disabled={true}
            >
                <Row span={24}>
                    <Col span={12}>
                        <Form.Item
                            label="设备名称"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入设备名称",
                                },
                                {
                                    pattern: ALL_SPACE_REG,
                                    message: "请输入设备名称",
                                },
                            ]}
                        >
                            <Input placeholder="请输入设备名称" disabled={false} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="设备编码" name="code">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="设备类型" name="typeZh">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="设备型号" name="model">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="sn号" name="snNumber">
                            <Input />
                        </Form.Item>
                    </Col>{" "}
                    <Col span={12}>
                        <Form.Item label="采集器编号" name="collectorCode">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="关联电站" name="plantName">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="电站地址" name="plantAddress">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="质保有效期" name="warrantyPeriod">
                            <DatePicker format="YYYY-MM-DD" disabled={false} allowClear={false} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="组串数量" name="stringCount">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="换机历史" name="deviceSwitchHistoryList">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Descriptions title="实时数据">
                <Descriptions.Item label="" span={3}>
                    <div className="table">
                        {dataSource?.map(item => (
                            <div className="item">
                                <div className="name">{item.title}</div>
                                <div className="cell">
                                    {item?.value?.map(value => (
                                        <div className="value">{value}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Descriptions.Item>
                {realData?.map(item => (
                    <Descriptions.Item label={item.label}>{item.value}</Descriptions.Item>
                ))}
            </Descriptions>
        </>
    );
};

export default Index;
