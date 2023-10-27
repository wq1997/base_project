import { history, useLocation } from "umi";
import { Tabs, Modal, Form, DatePicker, Select, InputNumber ,Table} from "antd";
import { Header } from "@/components";
import { getQueryString } from "@/utils/utils";
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import { useState, useEffect } from "react";
import styles from "./index.less";
 

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
            <Table
                    pagination={false}
                    columns={[
                        {
                            title: '申报编号',
                            dataIndex: 'code',
                            key: 'code',
                        },
                        {
                            title: '申报时段',
                            dataIndex: 'time',
                            key: 'time',
                        },
                        {
                            title: '申报容量(MWh)',
                            dataIndex: 'capacity',
                            key: 'capacity',
                        },
                        {
                            title: '申报类型',
                            dataIndex: 'type',
                            key: 'type',
                        },
                        {
                            title: '预估响应价格(元/MWh)',
                            dataIndex: 'price',
                            key: 'price'
                        },
                        {
                            title: '限价(元/MWh)',
                            dataIndex: 'price1',
                            key: 'price1'
                        }
                    ]}
                    dataSource={[
                        {
                            code: '202309171800',
                            time: '06:00 ~ 08:00',
                            capacity: 8,
                            type: '放电',
                            price: 2000,
                            price1: 3000
                        },
                        {
                            code: '202309171801',
                            time: '08:00 ~ 09:00',
                            capacity: 6,
                            type: '用电',
                            price: 2000,
                            price1: 3000
                        },
                        {
                            code: '202309171802',
                            time: '09:00 ~ 11:00',
                            capacity: 10,
                            type: '放电',
                            price: 2000,
                            price1: 3000
                        },
                        {
                            code: '202309171803',
                            time: '11:00 ~ 13:00',
                            capacity: 10,
                            type: '放电',
                            price: 2000,
                            price1: 3000
                        },
                        {
                            code: '202309171804',
                            time: '13:00 ~ 15:00',
                            capacity: 10,
                            type: '用电',
                            price: 2000,
                            price1: 3000
                        },
                        {
                            code: '202309171805',
                            time: '15:00 ~ 18:00',
                            capacity: 8,
                            type: '放电',
                            price: 4000,
                            price1: 3000
                        }
                    ]}
                />
            </div>

        </div>
    )
}

export default ToExamine;