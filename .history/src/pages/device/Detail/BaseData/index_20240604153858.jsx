import React, { useState, useEffect } from "react";
import { Tabs, Table, Descriptions, Divider } from "antd";
import { getDeviceInfo as getDeviceInfoServer } from "@/services/device";
import "./index.less";

const Index = ({ deviceInfo }) => {
    const [realData, setRealData] = useState([
        { label: "设备状态", key: "inverterStatus", value: "" },
        { label: "当日发电量", key: "dailyGeneration", value: "" },
        { label: "累计发电量", key: "totalGeneration", value: "" },
        { label: "功率因数", key: "powerFactor", value: "" },
        { label: "有功功率", key: "activePower", value: "" },
        { label: "无功功率", key: "reactivePower", value: "" },
        { label: "逆变器额定功率", key: "ratedPower", value: "" },
        { label: "电网频率", key: "gridFrequency", value: "" },
        { label: "输出方式", key: "outputMode", value: "" },
        { label: "内部温度", key: "internalTemperature", value: "" },
        { label: "电网A相电流", key: "gridCurrentA", value: "" },
        { label: "电网A相电压", key: "gridVoltageA", value: "" },
        { label: "电网B相电流", key: "gridCurrentB", value: "" },
        { label: "电网B相电压", key: "gridVoltageB	", value: "" },
        { label: "电网C相电流", key: "gridCurrentC", value: "" },
        { label: "电网C相电压", key: "gridVoltageC", value: "" },
        { label: "开机时间", key: "inverterStartTime", value: "" },
        { label: "关机时间", key: "inverterStopTime", value: "" },
        { label: "绝缘阻抗值", key: "insulationResistance", value: "" },
    ]);
    const [dataSource, setDataSource] = useState([["组串"], ["输入电压(V)"], ["输入电流(A)"]]);

    useEffect(() => {
        if (!deviceInfo) return;
        const { inverterInfo, realtimeList } = deviceInfo;
        const _dataSource = [...dataSource];
        Object.keys(realtimeList || {})
            .sort((a, b) => Number(a.match(/\d+/g)[0]) - Number(b.match(/\d+/g)[0]))
            .forEach(key => {
                _dataSource[0].push(key);
                _dataSource[1].push(realtimeList?.[key]?.V);
                _dataSource[2].push(realtimeList?.[key]?.A);
            });
        setDataSource(_dataSource);
        setRealData(
            [...realData]?.map(item => ({
                ...item,
                value: inverterInfo?.[item.key],
            }))
        );
    }, [deviceInfo]);

    return (
        <>
            <Descriptions title="基础信息">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
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
                                <Input placeholder="请输入设备名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="设备类型"
                                name="type"
                                 
                            >
                                <Input  />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="关联电站"
                                name="plantId"
                                 
                            >
                                <Input  />
                            </Form.Item>
                        </Col> 
                        <Col span={12}>
                            <Form.Item label="质保有效期" name="warrantyPeriod">
                                <DatePicker format="YYYY-MM-DD" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="sn号码"
                                name="snNumber"
                                 
                            >
                                <Input  />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="设备型号"
                                name="model"
                                 
                            >
                                <Input   />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row span={24}>
                        <Col span={12}>
                            <Form.Item
                                label="功率因数调节"
                                name="powerFactorAdjustment"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入功率因数调节",
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="请输入功率因数调节"
                                    style={{ width: "100%" }}
                                    min={-0.999}
                                    max={1}
                                    precision={3}
                                />
                            </Form.Item>
                            <div
                                style={{
                                    marginTop: "5px",
                                    color: "#999",
                                    position: "relative",
                                    left: "140px",
                                }}
                            >
                                (-1.000 ~ -0.800] U [0.800 ~ 1.000]
                            </div>
                        </Col>
                    </Row>

                    <Form.Item
                        wrapperCol={{
                            offset: 19,
                            span: 5,
                        }}
                    >
                        <Space style={{ position: "relative", left: 8 }}>
                            <Button onClick={() => onCancel(false)}>取消</Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Descriptions>
            <Descriptions title="实时数据">
                <Descriptions.Item label="" span={3}>
                    <div className="table">
                        {dataSource?.map(item => (
                            <div className="item">
                                {item?.map(value => (
                                    <div className="cell">{value}</div>
                                ))}
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
