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

    useEffect(() => {
        setData([
            {
                time: '09-17 18:00~22:00',
                status: "Declared",
                demandType: '用电',
                demandCount: '20',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202309171800',
                price: '3000'
            },
            {
                time: '08-14 11:00~18:00',
                status: "Declared",
                demandType: '放电',
                demandCount: '30',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202308141100',
                price: '3000'
            },
            {
                time: '07-14 11:00~18:00',
                status: "Winning",
                demandType: '用电',
                demandCount: '40',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202307141100',
                price: '3000'
            },
            {
                time: '06-14 11:00~18:00',
                status: "Lose",
                demandType: '放电',
                demandCount: '20',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202306141100',
                price: '3000'
            },
            {
                time: '07-14 11:00~18:00',
                status: "Winning",
                demandType: '用电',
                demandCount: '40',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202307141100',
                price: '3000'
            },
            {
                time: '06-14 11:00~18:00',
                status: "Lose",
                demandType: '放电',
                demandCount: '20',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202306141100',
                price: '3000'
            },
            {
                time: '07-14 11:00~18:00',
                status: "Winning",
                demandType: '用电',
                demandCount: '40',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202307141100',
                price: '3000'
            },
            {
                time: '06-14 11:00~18:00',
                status: "Lose",
                demandType: '放电',
                demandCount: '20',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202306141100',
                price: '3000'
            },
            {
                time: '09-17 18:00~22:00',
                status: "Created",
                demandType: '放电',
                demandCount: '20',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202309171800',
                price: '3000'
            },
            {
                time: '08-14 11:00~18:00',
                status: "Declared",
                demandType: '用电',
                demandCount: '30',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202308141100',
                price: '3000'
            },
            {
                time: '07-14 11:00~18:00',
                status: "Winning",
                demandType: '放电',
                demandCount: '40',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202307141100',
                price: '3000'
            },
            {
                time: '06-14 11:00~18:00',
                status: "Lose",
                demandType: '用电',
                demandCount: '20',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202306141100',
                price: '3000'
            },
            {
                time: '07-14 11:00~18:00',
                status: "Winning",
                demandType: '放电',
                demandCount: '40',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202307141100',
                price: '3000'
            },
            {
                time: '06-14 11:00~18:00',
                status: "Lose",
                demandType: '放电',
                demandCount: '20',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202306141100',
                price: '3000'
            },
            {
                time: '07-14 11:00~18:00',
                status: "Winning",
                demandType: '用电',
                demandCount: '40',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202307141100',
                price: '3000'
            },
            {
                time: '06-14 11:00~18:00',
                status: "Lose",
                demandType: '用电',
                demandCount: '20',
                creator: '江苏海四达动力科技有限公司',
                demandCode: '202306141100',
                price: '3000'
            }
        ])
    }, [])
    return (
        <div className={styles.create}>
            <Header
                title={'中标下发'}
                description={""}
            />
            <div className={styles.content}>
                <Tabs
                    activeKey={type}
                    onChange={onChangeTab}
                    items={PageTypeList}
                />
                <div className={styles.contentData}>
                <Review />
                </div>
            </div>
            
        </div>
    )
}

export default ToExamine;