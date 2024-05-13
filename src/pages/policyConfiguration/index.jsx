import { Form, theme, Space, Row, Button, Col, Switch, Input, Radio,} from "antd";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Title, EditTable } from "@/components";
import { useIntl } from "umi";
import ButtonGroup from "./component/ButtonGroup";
import Tabs from "./component/Tabs";

const PolicyConfiguration = () => {
    const intl = useIntl();
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const strategyList = [
        {label: intl.formatMessage({id: '策略1'}), value: 1},
        {label: intl.formatMessage({id: '策略2'}), value: 2}
    ]

    const monthList = [
        {label: intl.formatMessage({id: '1月'}), value: 1},
        {label: intl.formatMessage({id: '2月'}), value: 2},
        {label: intl.formatMessage({id: '3月'}), value: 3},
        {label: intl.formatMessage({id: '4月'}), value: 4},
        {label: intl.formatMessage({id: '5月'}), value: 5},
        {label: intl.formatMessage({id: '6月'}), value: 6},
        {label: intl.formatMessage({id: '7月'}), value: 7},
        {label: intl.formatMessage({id: '8月'}), value: 8},
        {label: intl.formatMessage({id: '9月'}), value: 9},
        {label: intl.formatMessage({id: '10月'}), value: 10},
        {label: intl.formatMessage({id: '11月'}), value: 11},
        {label: intl.formatMessage({id: '12月'}), value: 12}
    ]

    const areaStyle = useEmotionCss(()=>{
        return {
            background: token.bgcColorB_l,
            padding: '40px 30px',
            borderRadius: '16px'
        }
    })

    const distributeStyle = useEmotionCss(()=>{
        return {
            cursor: 'pointer',
            padding: '5px 20px',
            borderRadius: 5,
            backgroundColor: token.defaultBg,
        }
    })

    return (
        <Form 
            form={form} 
            colon={false}
            initialValues={{
                mode: 'Custom'
            }}
        >
            <Space style={{width: '100%', height: 'auto', minHeight: '100%',  background: "#0A1328"}} direction="vertical" size={12}>
                <div className={areaStyle}>
                    <Space style={{width: '100%'}} direction="vertical">
                        <Form.Item label={intl.formatMessage({id: '策略模式'})} name="mode">
                            <ButtonGroup 
                                options={[
                                    {label: intl.formatMessage({id: '自动'}), value: 'Automatic'},
                                    {label: intl.formatMessage({id: '手动'}), value: 'Custom'},
                                ]}
                            />
                        </Form.Item>
                        <Space style={{width: '100%'}} direction="vertical" size={20}>
                            <Row justify="space-between" align="middle">
                                <Title title={intl.formatMessage({id: '设备命令'})} />
                            </Row>
                            <Space style={{width: '100%', padding: '0 20px'}} direction="vertical" size={30}>
                                <Row>
                                    <Col span={12}>
                                        <Row gutter={24}>
                                            <Col>
                                                <Form.Item label={intl.formatMessage({id: 'PCS设置'})} name="pcsSetting"  style={{margin: 0}}>
                                                    <ButtonGroup 
                                                        options={[
                                                            {label: intl.formatMessage({id: 'PCS开机'}), value: '0'},
                                                            {label: intl.formatMessage({id: 'PCS关机'}), value: '1'},
                                                            {label: intl.formatMessage({id: 'PCS待机'}), value: '2'},
                                                            {label: intl.formatMessage({id: 'PCS复位'}), value: '3'},
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <div
                                                    className={distributeStyle}
                                                    onClick={async ()=>{
                                                        const values = await form.validateFields(['pcsSetting'])
                                                        console.log('values', values)
                                                    }}
                                                >
                                                    {intl.formatMessage({id: '下发'})}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row gutter={12}>
                                            <Col>
                                                <Form.Item label={intl.formatMessage({id: 'BMS设置'})} name="bmsSetting"  style={{margin: 0}}>
                                                    <ButtonGroup 
                                                        options={[
                                                            {label: intl.formatMessage({id: 'BMS开机'}), value: '0'},
                                                            {label: intl.formatMessage({id: 'BMS关机'}), value: '1'},
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <div
                                                    className={distributeStyle}
                                                    onClick={async ()=>{
                                                        const values = await form.validateFields(['bmsSetting'])
                                                        console.log('values', values)
                                                    }}
                                                >
                                                    {intl.formatMessage({id: '下发'})}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Row gutter={24}>
                                            <Col>
                                                <Form.Item label={`${intl.formatMessage({id: 'PCS功率'})}(kW)`} name="pscPower"  style={{margin: 0}}>
                                                    <Input placeholder={intl.formatMessage({id: '请输入PCS功率'})} style={{width: 300}} />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <div
                                                    className={distributeStyle}
                                                    onClick={async ()=>{
                                                        const values = await form.validateFields(['pscPower'])
                                                        console.log('values', values)
                                                    }}
                                                >
                                                    {intl.formatMessage({id: '下发'})}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                    </Space>
                </div>
                <div className={areaStyle}>
                    <Space style={{width: '100%'}} direction="vertical" size={30}>
                        <Row justify="space-between">
                            <Title title={intl.formatMessage({id: '参数设置'})} />
                            <div 
                                className={distributeStyle}
                                onClick={async ()=>{
                                    const values = await form.validateFields(['expansion','transformerCapacity-1','transformerCapacity-2']);
                                    console.log(values);
                                }}
                            >
                                {intl.formatMessage({id: '下发'})}
                            </div>
                        </Row> 
                        <Row>
                            <Col span={2}>
                                <Form.Item label={intl.formatMessage({id: '扩容'})} name="expansion" style={{margin: 0}}>
                                    <Switch />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item label={intl.formatMessage({id: '变压器容量'})} style={{margin: 0}}>
                                    <Space direction="horizontal">
                                        <Form.Item style={{margin: 0}} name="transformerCapacity-1">
                                            <Input style={{width: 200}} placeholder="kW" />
                                        </Form.Item>
                                        <Form.Item style={{margin: 0}} name="transformerCapacity-2">
                                            <Input style={{width: 200}} placeholder="%"/>
                                        </Form.Item>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Space>
                </div>
                <div className={areaStyle}>
                     <Space style={{width: '100%'}} direction="vertical" size={30}>
                        <Row justify="space-between">
                            <Title title={intl.formatMessage({id: '策略配置'})} />
                            <div 
                                className={distributeStyle}
                                onClick={async ()=>{
                                    const values = await form.validateFields();
                                    console.log(values);
                                }}
                            >
                                {intl.formatMessage({id: '下发'})}
                            </div>
                        </Row> 
                        <Row justify="space-between">
                            <Form.Item name="strategyIndex" style={{margin: 0}}>
                                <Tabs 
                                    items={strategyList}
                                />
                            </Form.Item>
                            <Button 
                                style={{background: 'linear-gradient(90deg, #0787DB 0%, #034FB4 100%)', border: 'none'}}
                            >
                                {intl.formatMessage({id: '新增'})}
                            </Button>
                        </Row>
                        <Form.Item name="strategyList">
                            <EditTable.EditRowTable
                                showClear
                                showEdit
                                showDelete
                                data={[
                                    {type: '尖'}
                                ]}
                                columns={[
                                    {
                                        title: '类型',
                                        dataIndex: 'type',
                                        editable: true,
                                        inputType: 'Select',
                                        options: [
                                            {value: '尖', name: intl.formatMessage({id: '尖'})},
                                            {value: '峰', name: intl.formatMessage({id: '峰'})},
                                            {value: '平', name: intl.formatMessage({id: '平'})},
                                            {value: '谷', name: intl.formatMessage({id: '谷'})}
                                        ]
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Space>                              
                </div>

                <div className={areaStyle}>
                    <Space style={{width: '100%'}} direction="vertical" size={20}>
                        <Row justify="space-between" align="middle">
                            <Title title={intl.formatMessage({id: '策略选择'})} />
                            <div 
                                className={distributeStyle}
                                onClick={async ()=>{
                                    const values = await form.validateFields();
                                    console.log("values", values)
                                }}
                            >
                                {intl.formatMessage({id: '下发'})}
                            </div>
                        </Row>
                        <Row>
                            {
                                monthList.map(month => {
                                    return (
                                        <Col span={24/monthList.length}>
                                            <div style={{marginBottom: 10}}>{month.label}</div>
                                            <Form.Item name={month.value} layout="vertical" style={{margin: 0}}>
                                                <Radio.Group>
                                                    <Space direction="vertical">
                                                        {strategyList?.map(strategy=><Radio value={strategy.value}>{strategy.label}</Radio>)}
                                                    </Space>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Space>
                </div>
                
                <div className={areaStyle}>
                    <Space style={{width: '100%'}} direction="vertical" size={20}>
                        <Row justify="space-between" align="middle">
                            <Title title={intl.formatMessage({id: '除湿机参数设置'})} />
                            <div 
                                className={distributeStyle}
                                onClick={async ()=>{
                                }}
                            >
                                {intl.formatMessage({id: '下发'})}
                            </div>
                        </Row>
                        <Row gutter={50}>
                            <Col span={6}>
                                <Form.Item name="oneTemperature" label={intl.formatMessage({id: '除湿机温度启动值(℃)'})} style={{margin: 0}}>
                                    <Input style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入除湿机温度启动值'})}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="twoTemperature" label={intl.formatMessage({id: '除湿机温度停止值(℃)'})} style={{margin: 0}}>
                                    <Input style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入除湿机温度停止值'})}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="threeTemperature" label={intl.formatMessage({id: '除湿机湿度启动值(%rh)'})} style={{margin: 0}}>
                                    <Input style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入除湿机湿度启动值'})}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="fourTemperature" label={intl.formatMessage({id: '除湿机湿度停止值(%rh)'})} style={{margin: 0}}>
                                    <Input style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入除湿机湿度停止值'})}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Space>
                </div>

                <div className={areaStyle}>
                    <Space style={{width: '100%'}} direction="vertical" size={20}>
                        <Row justify="space-between" align="middle">
                            <Title title={intl.formatMessage({id: '液冷机参数设置'})} />
                            <div 
                                className={distributeStyle}
                                onClick={async ()=>{
                                }}
                            >
                                {intl.formatMessage({id: '下发'})}
                            </div>
                        </Row>
                        <Row gutter={50}>
                            <Col span={6}>
                                <Form.Item name="fiveTemperature" label={intl.formatMessage({id: '液冷制冷点(℃)'})} style={{margin: 0}}>
                                    <Input style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入液冷制冷点'})}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="sixTemperature" label={intl.formatMessage({id: '液冷加热点(℃)'})} style={{margin: 0}}>
                                    <Input style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入液冷加热点'})}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="sevenTemperature" label={intl.formatMessage({id: '液冷制冷回差(℃)'})} style={{margin: 0}}>
                                    <Input style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入液冷制冷回差'})}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="eightTemperature" label={intl.formatMessage({id: '液冷加热回差(℃)'})} style={{margin: 0}}>
                                    <Input style={{width: "100%"}} placeholder={intl.formatMessage({id: '请输入液冷加热回差'})}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Space>
                </div>
            </Space>
        </Form>
    )
}

export default PolicyConfiguration;