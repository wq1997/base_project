import { history, useLocation } from "umi";
import { Tabs, Modal, Form, DatePicker, Row, Button, Table, Pagination, Space } from "antd";
import { Header, Search } from "@/components";
import { getQueryString } from "@/utils/utils";
import { STATUS_ENUM, STATUS_COLOR } from "@/utils/constants";
import { useState, useEffect } from "react";
import styles from "./index.less";

const defaultPageType = "LIST";
const PageTypeList = [
    { label: "申报列表", key: "LIST" },
    { label: "申报总览", key: "INFO" },
];

const ToExamine = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const { pathname } = location;
    const [type, setType] = useState(getQueryString("type") || defaultPageType);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);

    const onChangeTab = key => {
        setType(key);
        history.push(`${pathname}?type=${key}`);
    };

    const [statistical, setStatistical] = useState([
        {
            code: "202309171800",
            status: "Declared",
            period: "06:00 ~ 08:00",
            creator: "江苏海四达动力科技有限公司",
            capacity: 8,
            type: "放电",
            price: 2000,
            price1: 3000,
            time: "2023-08-13 15:12:05",
        },
    ]);

    return (
        <div className={styles.create}>
            <Header title={"中标下发"} description={"运营商申报审核由采日VPP聚合平台“AI”决策"} />
            <div className={styles.content}>
                <div className={styles.contentData}>
                    <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
                        <Space>
                            <Search style={{ width: 250 }} />
                            <DatePicker style={{ width: 250 }} />
                        </Space>

                    </Row>
                    <Table
                        pagination={false}
                        columns={[
                            {
                                title: "申报编号",
                                dataIndex: "code",
                                key: "code",
                            },
                            {
                                title: "申报状态",
                                dataIndex: "status",
                                key: "status",
                                render: (_, { status }) => (
                                    <div
                                        style={{
                                            padding: "3px 10px",
                                            border: `1px solid ${STATUS_COLOR[status]}`,
                                            borderRadius: "5px",
                                            color: `${STATUS_COLOR[status]}`,
                                            fontSize: "10px",
                                            width: "fit-content",
                                        }}
                                    >
                                        {STATUS_ENUM[status]}
                                    </div>
                                ),
                            },
                            {
                                title: "申报运营商",
                                dataIndex: "creator",
                                key: "creator",
                            },
                            {
                                title: "申报时段",
                                dataIndex: "period",
                                key: "period",
                            },
                            {
                                title: "申报容量(MWh)",
                                dataIndex: "capacity",
                                key: "capacity",
                            },
                            {
                                title: "申报类型",
                                dataIndex: "type",
                                key: "type",
                            },
                            {
                                title: "预估响应价格(元/MWh)",
                                dataIndex: "price",
                                key: "price",
                            },
                            {
                                title: "限价(元/MWh)",
                                dataIndex: "price1",
                                key: "price1",
                            },
                            {
                                title: "申报时间",
                                dataIndex: "time",
                                key: "time",
                            },
                            {
                                title: "操作",
                                dataIndex: "",
                                key: "operate",
                                render: () => (
                                    <Space>
                                        <Button type="text">详情</Button>
                                        <Button type="link">审核</Button>
                                        <Button danger type="link">
                                            删除
                                        </Button>
                                    </Space>
                                ),
                            },
                        ]}
                        dataSource={statistical}
                    />
                    <div className={styles.pagination}>
                        <Pagination simple defaultCurrent={1} total={50} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToExamine;
