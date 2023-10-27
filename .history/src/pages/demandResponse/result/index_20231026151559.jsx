import { history, useLocation } from "umi";
import { Switch, Typography, Form, List, Row, Button, Table, Pagination, Space } from "antd";
import { AndroidOutlined } from "@ant-design/icons";
import { Header, Search, StatisticalCard, Title } from "@/components";
import { getQueryString } from "@/utils/utils";
import { STATUS_ENUM, STATUS_COLOR } from "@/utils/constants";
import { useState, useEffect } from "react";
import styles from "./index.less";
import AbilityCurve from "./AbilityCurve";
import IncomeCurve from './IncomeCurve'

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

    const onChangeTab = key => {
        setType(key);
        history.push(`${pathname}?type=${key}`);
    };

    const [total, setTotal] = useState([
        {
            label: "中标容量",
            value: 230,
            unit: "MWh",
        },
        {
            label: "实际响应容量",
            value: 200,
            unit: "MWh",
        },
        {
            label: "有效响应量",
            value: 30,
            unit: "MWh",
        },

    ]);

    const [total1, setTotal1] = useState([
        {
            label: "响应收益",
            value: 50,
            unit: "万元",
        },
        {
            label: "用户收益",
            value: 15,
            unit: "万元",
        },
        {
            label: "聚合商收益",
            value: 35,
            unit: "万元",
        },
    ]);

    const [statistical, setStatistical] = useState([
        {
            creator: "江苏海四达动力科技有限公司",
            price: 2,
            capacity: 8,
            true: 5,
            price1: 3,
            time: "2023-10-07 09:11:25",
            number: 0.8,
            rate: "75%",
        },
        {
            creator: "江苏海四达动力科技有限公司",
            price: 2,
            capacity: 8,
            true: 5,
            price1: 3,
            time: "2023-10-07 09:11:25",
            number: 0.8,
            rate: "75%",
        },
        {
            creator: "江苏海四达动力科技有限公司",
            price: 2,
            capacity: 8,
            true: 5,
            price1: 3,
            time: "2023-10-07 09:11:25",
            number: 0.8,
            rate: "75%",
        },
        {
            creator: "江苏海四达动力科技有限公司",
            price: 2,
            capacity: 8,
            true: 5,
            price1: 3,
            time: "2023-10-07 09:11:25",
            number: 0.8,
            rate: "75%",
        },
        {
            creator: "江苏海四达动力科技有限公司",
            price: 2,
            capacity: 8,
            true: 5,
            price1: 3,
            time: "2023-10-07 09:11:25",
            number: 0.8,
            rate: "75%",
        },
        {
            creator: "江苏海四达动力科技有限公司",
            price: 2,
            capacity: 8,
            true: 5,
            price1: 3,
            time: "2023-10-07 09:11:25",
            number: 0.8,
            rate: "75%",
        },
        {
            creator: "江苏海四达动力科技有限公司",
            price: 2,
            capacity: 8,
            true: 5,
            price1: 3,
            time: "2023-10-07 09:11:25",
            number: 0.8,
            rate: "75%",
        },
        {
            creator: "江苏海四达动力科技有限公司",
            price: 2,
            capacity: 8,
            true: 5,
            price1: 3,
            time: "2023-10-07 09:11:25",
            number: 0.8,
            rate: "75%",
        },
        {
            creator: "江苏海四达动力科技有限公司",
            price: 2,
            capacity: 8,
            true: 5,
            price1: 3,
            time: "2023-10-07 09:11:25",
            number: 0.8,
            rate: "75%",
        },
    ]);

    const data = [
        ['江苏海四达动力科技有限公司', 200],
        ['阿里巴巴有限公司', 139],
        ['腾讯科技有限公司', 85]
    ];

    return (
        <div className={styles.create}>
            <Header
                title={"响应评价"}
                description={"响应结果将为'AI'决策运行商下次申报做参考，'评价指数'反应响应能力等级"}
            />
            <div className={styles.total}>
                <div>
                    <StatisticalCard
                        cardStyle={{
                            border: "none",
                        }} s
                        showBorder
                        dataSource={total}
                    />
                    <StatisticalCard
                        cardStyle={{
                            border: "none",
                        }}
                        showBorder
                        dataSource={total1}
                    />
                </div>
                <div className={styles.ranking}>
                    {/* <Title.PageSubTitle
                        title={"响应能力排行"}
                        style={{ marginBottom: "10px" }}
                    /> */}
                    <List
                        header={
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>响应能力排行</span>
                                <span>累计响应量</span>
                            </div>
                        }
                        style={{ border: 'none' }}
                        bordered
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <Typography.Text mark>[{index + 1}]</Typography.Text> 
                                <div></div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
            <div className={styles.curve}>
                <div>
                    <Title.PageSubTitle
                        title={"响应能力曲线"}
                        style={{ marginBottom: "10px" }}
                    />
                    <AbilityCurve />
                </div>
                <div>
                    <Title.PageSubTitle title={"收益曲线"} style={{ marginBottom: "10px" }} />
                    <IncomeCurve />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.contentData}>
                    <Table
                        pagination={false}
                        columns={[
                            {
                                title: "申报运营商",
                                dataIndex: "creator",
                                key: "creator",
                            },
                            {
                                title: "中标价格(元/MWh)",
                                dataIndex: "price",
                                key: "price",
                            },
                            {
                                title: "中标容量(MWh)",
                                dataIndex: "capacity",
                                key: "capacity",
                            },
                            {
                                title: "实际响应(MWh)",
                                dataIndex: "true",
                                key: "true",
                            },
                            {
                                title: "用户收益(万元)",
                                dataIndex: "price",
                                key: "price",
                            },
                            {
                                title: "聚合商收益(万元)",
                                dataIndex: "price1",
                                key: "price1",
                            },
                            {
                                title: "响应完成时间",
                                dataIndex: "time",
                                key: "time",
                            },
                            {
                                title: "评价指数",
                                dataIndex: "number",
                                key: "number",
                            },
                            {
                                title: "收益率",
                                dataIndex: "rate",
                                key: "rate",
                            },
                            {
                                title: "操作",
                                dataIndex: "",
                                key: "operate",
                                render: () => (
                                    <Space>
                                        <Button type="link">详情</Button>
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
