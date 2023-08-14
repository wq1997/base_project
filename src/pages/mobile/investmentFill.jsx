import { theme } from 'antd';
import { Form, Input, Button, Picker } from "antd-mobile";
import { Helmet } from 'react-helmet';
import { getLabel } from "@/utils/utils";
import { PageTitle, MobileSelectInput } from "@/components";
import styles from "./index.less";
import { useState } from 'react';
import { history } from "umi";

const InvestmentFill = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [columns, setColumns] = useState({
        firstArea: [
            [
                {label: '安徽省', value: '皖'},
                {label: '上海市', value: '沪'},
            ]
        ],
        secondArea: [
            [
                {label: '安庆市', value: '安庆'}
            ]
        ],
        type: [
            [
                {label: '安庆市', value: '安庆'}
            ]
        ],
        zd: [
            [
                {label: '安庆市', value: '安庆'}
            ]
        ],
        level: [
            [
                {label: '安庆市', value: '安庆'}
            ]
        ],
    })
    const [type, setType] = useState("firstArea");
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState({
        firstArea: [],
        secondArea: []
    })
    const [label, setLabel] = useState({
        firstArea: '',
        secondArea: ''
    })

    const onSelect = (selectType) => {
        setType(selectType);
        setVisible(true);
    }

    return (
        <div
            style={{
                width: '100%',
                height: 'calc(100vh)'
            }}
            className={styles.investmentFill}
        >
            <div style={{padding: '24px 16px'}}>
                <Helmet><title>投资测算</title></Helmet>
                <div style={{textAlign: 'center'}}>
                    <PageTitle title="投资测算" type="page" level={4} style={{color: token.colorPrimary}} />
                </div>
                <Form
                    autoComplete="off"
                    form={form}
                    initialValues={{
                        zq: '20年',
                        fcbl: '0%（自营）',
                        sfbl: '100%'
                    }}
                >
                    <Form.Item name="firstArea" label="一级区域"  rules={[{required: true, message: '请选择一级区域'}]}> 
                        <MobileSelectInput 
                            placeholder="请选择一级区域" 
                            onClick={()=>onSelect("firstArea")}
                            label={label["firstArea"]}
                        />
                    </Form.Item>
                    <Form.Item name="secondArea" label="二级区域" rules={[{required: true, message: '请选择二级区域'}]}> 
                        <MobileSelectInput 
                            placeholder="请选择二级区域"
                            onClick={()=>onSelect("secondArea")} 
                            label={label["secondArea"]}
                        />
                    </Form.Item>
                    <Form.Item name="type" label="用电类型" rules={[{required: true, message: '请选择用电类型'}]}> 
                        <MobileSelectInput 
                            placeholder="请选择用电类型"
                            onClick={()=>onSelect("type")} 
                            label={label["type"]} 
                        />
                    </Form.Item>
                    <Form.Item name="zd" label="计费制度" rules={[{required: true, message: '请选择计费制度'}]}> 
                        <MobileSelectInput 
                            placeholder="请选择计费制度"
                            onClick={()=>onSelect("zd")} 
                            label={label["zd"]}  
                        />
                    </Form.Item>
                    <Form.Item name="level" label="电压等级" rules={[{required: true, message: '请选择电压等级'}]}> 
                        <MobileSelectInput 
                            placeholder="请选择电压等级" 
                            onClick={()=>onSelect("level")} 
                            label={label["level"]}  
                        />
                    </Form.Item>
                    <Form.Item name="rl" label="装机容量" rules={[{required: true}]}> 
                        <Input placeholder="请输入装机容量 kWh" />
                    </Form.Item>
                    <Form.Item name="zq" label="项目周期" rules={[{required: true}]}> 
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="fcbl" label="业主分成比例" rules={[{required: true}]}> 
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="sfbl" label="首付比例" rules={[{required: true}]}> 
                        <Input disabled />
                    </Form.Item>
                </Form>
                <Button 
                    style={{
                        background: token.colorPrimary, 
                        color: 'white', 
                        width: '100%',
                        borderRadius: 8,
                        height: 50,
                        marginTop: 20
                    }}
                    onClick={async () => {
                        form.validateFields().then(values => {
                            console.log("values", values)
                            history.push("/mobile/investment/result")
                        });
                    }}
                >
                    开始测算
                </Button>
            </div>
            <Picker
                columns={columns[type]}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}
                value={value[type]}
                onConfirm={v => {
                    form.setFieldsValue({
                        [type]: v
                    })
                    setValue({
                        ...value,
                        [type]: v
                    });
                    setLabel({
                        ...label,
                        [type]: getLabel(columns[type], v)
                    })
                }}
            />
        </div>
    )
}

export default InvestmentFill;