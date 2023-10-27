import { history, useLocation } from "umi";
import { Tabs, Modal, Form, DatePicker, Select, InputNumber } from "antd";
import { Header } from "@/components";
import { getQueryString } from "@/utils/utils";
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import { useState, useEffect } from "react";
import styles from "./index.less";
import List from "./components/List";
import Review from "./components/Review";

const defaultPageType = 'LIST';
const PageTypeList = [
    { label: "申报列表", key: 'LIST' },
    { label: "申报总览", key: 'INFO' }
];

const ToExamine = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const { pathname } = location;
    const [type, setType] = useState(getQueryString('type') || defaultPageType);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false)

    const onChangeTab = (key) => {
        setType(key);
        history.push(`${pathname}?type=${key}`);
    };

    const [statistical, setStatistical] = useState([
        {
            label: '已申报响应总量',
            value: 200,
            unit: 'MWh'
        },
        {
            label: '待审核响应总量',
            value: 50,
            unit: 'MWh'
        },
        {
            label: '已中标响应总量',
            value: 80,
            unit: 'MWh'
        },
        {
            label: '未中标响应总量',
            value: 70,
            unit: 'MWh'
        },
        {
            label: '预估响应收益',
            value: 9.28,
            unit: '万元'
        },
        {
            label: '实际响应收益',
            value: 6.496,
            unit: '万元'
        },
        {
            label: '聚合商收益',
            value: 2.784,
            unit: '万元'
        },
    ])


    return (
        <div className={styles.create}>
            <Header
                title={'中标下发'}
                description={""}
            />
            <div className={styles.content}>
                <Review />
            </div>

        </div>
    )
}

export default ToExamine;