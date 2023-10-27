import { history, useLocation } from "umi";
import { Switch, Select, Form, DatePicker, Row, Button, Table, Pagination, Space } from "antd";
import { AndroidOutlined } from "@ant-design/icons";
import { Header, Search, StatisticalCard, Title } from "@/components";
import { getQueryString } from "@/utils/utils";
import { STATUS_ENUM, STATUS_COLOR } from "@/utils/constants";
import { useState, useEffect } from "react";
import styles from "./index.less";
import AbilityCurve from './AbilityCurve' 

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
            value: 16,
            unit: "MWh",
        },
        {
            label: "实际响应容量",
            value: 200,
            unit: "MWh",
        },
        {
            label: "有效响应容量",
            value: 150,
            unit: "MWh",
        },
        {
            label: "申报放电总量",
            value: 50,
            unit: "MWh",
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

    return (
        <div className={styles.create}>
            <Header
                title={"响应评价"}
                description={"响应结果将为'AI'决策运行商下次申报做参考，'评价指数'反应响应能力等级"}
            />
            <StatisticalCard
                cardStyle={{
                    border: "none",
                }}
                showBorder
                dataSource={total}
            />
         
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
