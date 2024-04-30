import { Form, theme, Space, Row, Button, Col, Switch, Input } from "antd";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Title } from "@/components";
import { useIntl } from "umi";
import ButtonGroup from "./component/ButtonGroup";

const PolicyConfiguration = () => {
    const intl = useIntl();
    const { token } = theme.useToken();
    const { form } = Form.useForm();

    const areaStyle = useEmotionCss(()=>{
        return {
            background: token.bgcColorB_l,
            padding: '40px 30px',
            borderRadius: '16px'
        }
    })

    const distributeStyle = useEmotionCss(()=>{
        return {
            backgroundColor: token.defaultBg,
            border: 'none'
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
            <div style={{width: '100%', height: 'auto', minHeight: '100%',  background: "#0A1328"}}>
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
                                <Button 
                                    className={distributeStyle}
                                >
                                    {intl.formatMessage({id: '下发'})}
                                </Button>
                            </Row>
                            <Space style={{width: '100%', padding: '0 20px'}} direction="vertical" size={30}>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label={intl.formatMessage({id: 'PCS设置'})} name="pcsSetting"  style={{margin: 0}}>
                                            <ButtonGroup 
                                                options={[
                                                    {label: intl.formatMessage({id: 'PCS开机'}), value: '0'},
                                                    {label: intl.formatMessage({id: 'PCS关机'}), value: '1'},
                                                    {label: intl.formatMessage({id: 'PCS复位'}), value: '2'},
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.formatMessage({id: 'BMS设置'})} name="bmsSetting"  style={{margin: 0}}>
                                            <ButtonGroup 
                                                options={[
                                                    {label: intl.formatMessage({id: 'BMS开机'}), value: '0'},
                                                    {label: intl.formatMessage({id: 'BMS关机'}), value: '1'},
                                                    {label: intl.formatMessage({id: 'BMS复位'}), value: '2'},
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Row>
                                            <Col span={4}>
                                                <Form.Item label={intl.formatMessage({id: '并离网'})} name="network" style={{margin: 0}}>
                                                    <Switch checkedChildren={intl.formatMessage({id: '并网'})} unCheckedChildren={intl.formatMessage({id: '离网'})} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item label={intl.formatMessage({id: '防逆流'})} name="antiReflux" style={{margin: 0}}>
                                                    <Switch />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row>
                                            <Col span={4}>
                                                <Form.Item label={intl.formatMessage({id: '防过载'})} name="antiOverload" style={{margin: 0}}>
                                                    <Switch />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item label={intl.formatMessage({id: '扩容'})} name="expansion" style={{margin: 0}}>
                                                    <Switch />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label={intl.formatMessage({id: 'PCS功率'})} name="pscPower"  style={{margin: 0}}>
                                            <Input placeholder={intl.formatMessage({id: '请输入PCS功率'})} style={{width: 300}} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.formatMessage({id: '功率波动范围'})} name="powerFluctuationRange"  style={{margin: 0}}>
                                            <Input placeholder={intl.formatMessage({id: '请输入功率波动范围'})} style={{width: 300}} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label={intl.formatMessage({id: '防逆流触发值'})} name="antiBackflowTriggerValue"  style={{margin: 0}}>
                                            <Input placeholder={intl.formatMessage({id: '请输入防逆流触发值'})} style={{width: 300}} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={intl.formatMessage({id: '变压器容量'})} style={{margin: 0}}>
                                            <Space direction="horizontal">
                                                <Form.Item style={{margin: 0}} name="transformerCapacity-1">
                                                    <Input style={{width: 200}} />
                                                </Form.Item>
                                                <Form.Item style={{margin: 0}} name="transformerCapacity-2">
                                                    <Input style={{width: 200}} />
                                                </Form.Item>
                                            </Space>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Space>
                        </Space>
                    </Space>
                </div>
            </div>
        </Form>
    )
}

export default PolicyConfiguration;