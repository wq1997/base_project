import { history, useLocation } from "umi";
import { Tabs, Modal, Form, DatePicker, Select, InputNumber } from "antd";
import { Header } from "@/components";
import { getQueryString } from "@/utils/utils";
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import { useState, useEffect } from "react";
import styles from "./index.less";
import List from "./components/List";

const defaultPageType = 'LIST';
const PageTypeList = [
  { label: "需求列表", key: 'LIST' },
  { label: "需求信息", key: 'INFO' }
];

const Create = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const { pathname } = location;
    const [type, setType] = useState(getQueryString('type')||defaultPageType);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false)

    const onChangeTab = (key) => {
        setType(key);
        history.push(`${pathname}?type=${key}`);
    };

    useEffect(()=>{
        setData([
            {
                time: '09-17 18:00~22:00',
                status: "Created",
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
    },[])
    return (
        <div className={styles.create}>
            <Header 
                title={'需求申报'}
                description={"分布式能源运行商向虚拟电厂运行商申报，由虚拟电厂运行商综合申报"}
                actions={
                    [
                        {
                            title: '+ 创建需求',
                            onClick: () => {
                                setVisible(true)
                            }
                        }
                    ]
                }
            />
            <div className={styles.content}>
                <Tabs
                    activeKey={type}
                    onChange={onChangeTab}
                    items={PageTypeList}
                />
                <div className={styles.contentData}>
                    {type==="LIST"&&<List data={data} />}
                </div>
            </div>
            <Modal
                width={700}
                open={visible}
                title="创建需求"
                onOk={()=>{
                    setVisible(false)
                }}
                onCancel={()=>{
                    setVisible(false)
                }}
            >
                <div style={{padding: '20px 0 0 0'}}>
                    <Form
                        form={form}
                        autoComplete={false}
                        labelCol={{span: 5}}
                    >
                        <Form.Item name="time" label="响应时间" rules={[{...FORM_REQUIRED_RULE}]}>
                            <DatePicker showTime style={{width: '100%'}} type="" />
                        </Form.Item>
                        <Form.Item name="type" label="响应类型" rules={[{...FORM_REQUIRED_RULE}]}>
                            <Select 
                                placeholder="请选择响应类型"
                                style={{width: '100%'}}
                                options={[
                                    {
                                        value: 1,
                                        label: '放电'
                                    },
                                    {
                                        value: 2,
                                        label: '用电'
                                    }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item name="count" label="响应容量(KW)" rules={[{...FORM_REQUIRED_RULE}]}>
                            <InputNumber min={0} placeholder="请输入响应容量" style={{width: '100%'}}/>
                        </Form.Item>
                        <Form.Item name="price" label="响应价格(元/KWh)" rules={[{...FORM_REQUIRED_RULE}]}>
                            <InputNumber min={0} placeholder="请输入响应价格" style={{width: '100%'}}/>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default Create;