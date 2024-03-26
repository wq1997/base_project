import { theme, Select, Row, Space, Button, Modal, Form, Input, } from "antd";
import { Title } from "@/components";
import { useState } from "react";

const OperationManage = () => {
    const { token } = theme.useToken();
    const [ form1 ] = Form.useForm(); // 控制模式
    const [ form2 ] = Form.useForm(); // PCS总开机 / PCS总关机
    const [ form3 ] = Form.useForm(); // 总功率设置
    const [ form4 ] = Form.useForm(); // 其他弹框
    const [controlModeOpen, setControlModeOpen] = useState(false); // 控制模式
    const [powerOnOpen, setPowerOnOpen] = useState(false);  // PCS总开机
    const [powerOffOpen, setPowerOffOpen] = useState(false); // PCS总关机
    const [powerSettingOpen, setPowerSettingOpen] = useState(false) // 总功率设置
    const [otherOpen, setOtherOpen] = useState(false); // 其他弹框
    const [title, setTitle] = useState(); // 其他弹框title


    const MyButton = ({text, id, onClick}) => {
        const onBtnClick = () => {
            setTitle(text);
            setOtherOpen(true);
            onClick&&onClick();
        }
        return (
            <div 
                style={{width: 132, height: 48, borderRadius: 4, background: '#D1D9EF', color: '#6978A1', fontSize: 18, lineHeight: '48px', textAlign: 'center', cursor: 'pointer'}}
                onClick={onBtnClick}
            >
                {text}
            </div>
        )
    }
    return (
        <div>
            <Space size={8} direction="vertical" style={{width: '100%'}}>
                <div style={{ backgroundColor: token.titleCardBgc, height: 100, padding: '24px 37px', boxSizing: 'border-box' }}>
                    <Space size={44}>
                        <Row align="middle" style={{height: '100%'}}>
                            <span>并网点：</span>
                            <Select 
                                style={{width: 240, height: 48}}
                                placeholder="请选择并网点" 
                                options={[
                                    {value: '并网点1', label: '并网点1'},
                                    {value: '并网点2', label: '并网点2'}
                                ]}
                            />
                        </Row>
                        <Space size={33}>
                            <Button type="primary" size="large" onClick={()=>setControlModeOpen(true)}>控制模式</Button>
                            <Button type="primary" size="large" onClick={()=>setPowerSettingOpen(true)}>总功率设置</Button>
                            <Button type="primary" size="large" onClick={()=>setPowerOnOpen(true)}>PCS总开机</Button>
                            <Button type="primary" size="large" onClick={()=>setPowerOffOpen(true)}>PCS总关机</Button>
                        </Space>
                    </Space>
                </div>
                <div style={{ backgroundColor: token.titleCardBgc, padding: '24px 37px', boxSizing: 'border-box' }}>
                    <Title title="箱变-1#升压变" />
                    <Row justify="space-between" style={{marginTop: 20}}>
                        <Space size={38}>
                            <span>通讯状态：断开</span>
                            <span>低压侧有功功率：XX</span>
                            <span>高压侧有功功率：XX</span>
                            <span>低压侧频率：XX</span>
                            <span>高压侧频率：XX</span>
                        </Space>
                        <Space>
                            <MyButton text="低压分闸" />
                            <MyButton text="低压合闸" />
                            <MyButton text="高压分闸" />
                            <MyButton text="高压合闸" />
                        </Space>
                    </Row>
                </div>
                {
                    [1,2].map(item => {
                        return (
                            <div style={{ backgroundColor: token.titleCardBgc, padding: '24px 37px', boxSizing: 'border-box' }}>
                                <Title title={`第${item}分支`} />
                                <Space size={40} direction="vertical"  style={{width: '100%'}}>
                                    <Row justify="space-between">
                                        <Space size={38}>
                                            <span>通讯状态：PCS1</span>
                                            <span>通讯状态：正常</span>
                                            <span>运行状态：正常</span>
                                            <span>有功功率：正常</span>
                                        </Space>
                                        <Space>
                                            <MyButton text="功率设置" />
                                            <MyButton text="开机" />
                                            <MyButton text="关机" />
                                            <MyButton text="复位" />
                                        </Space>
                                    </Row>
                                    <Row justify="space-between">
                                        <Space size={38}>
                                            <span>设备名称：BMS1</span>
                                            <span>通讯状态：正常</span>
                                            <span>运行状态：正常</span>
                                            <span>SOC: 90%</span>
                                        </Space>
                                        <Space>
                                            <MyButton text="开机" />
                                            <MyButton text="关机" />
                                            <MyButton text="复位" />
                                        </Space>
                                    </Row>
                                </Space>
                            </div>
                        )
                    })
                }
            </Space>

            <Modal
                open={controlModeOpen}
                title={<Title title="控制模式" />}
                onOk={async ()=>{
                    const values = await form1.validateFields();
                    console.log('控制模式', values);
                    setControlModeOpen(false);
                    form1.resetFields();
                }}
                onCancel={()=>{
                    setControlModeOpen(false);
                    form1.resetFields();
                }}
            >
                <Form
                    form={form1}
                >
                    <Form.Item name={"password"} label="请输入密码">
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item name={"mode"} label="请选择模式">
                        <Select
                            options={[
                                {label: '手动', value: '手动'}
                            ]}
                            placeholder="请选择模式"
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                open={powerOffOpen||powerOnOpen}
                title={<Title title={powerOffOpen?'PCS总关机':"PCS总开机"} />}
                onOk={async ()=>{
                    const values = await form2.validateFields();
                    console.log('总关机|总开机', values);
                    setPowerOffOpen(false);
                    setPowerOnOpen(false);
                    form2.resetFields();
                }}
                onCancel={()=>{
                    setPowerOffOpen(false);
                    setPowerOnOpen(false);
                    form2.resetFields();
                }}
            >
                <Form
                    form={form2}
                >
                    <Form.Item label="请输入密码" name={"password"}>
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                    <span>确定下发PCS总{powerOffOpen?'关机':'开机'}指令吗？</span>
                </Form>
            </Modal>

            <Modal
                open={powerSettingOpen}
                title={<Title title={"总功率设置"} />}
                onOk={async ()=>{
                    const values = await form3.validateFields();
                    console.log('总功率设置', values);
                    setPowerSettingOpen(false);
                    form3.resetFields();
                }}
                onCancel={()=>{
                    setPowerSettingOpen(false);
                    form3.resetFields();
                }}
            >
                <Form
                    form={form3}
                    labelCol={{
                        span: 6
                    }}
                >
                    <Form.Item label="请输入密码" name={"password"}>
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item label="请输入功率(KW)" name={"power"}>
                        <Input placeholder="请输入功率" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* 其他弹框 */}
            <Modal
                open={otherOpen}
                title={<Title title={title} />}
                onOk={async ()=>{
                    const values = await form4.validateFields();
                    console.log('其他', values);
                    setOtherOpen(false);
                    form4.resetFields();
                }}
                onCancel={()=>{
                    setOtherOpen(false);
                    form4.resetFields();
                }}
            >
                <Form
                    form={form4}
                >
                    <Form.Item label="请输入密码" name={"password"}>
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                    <span>确定下发指令吗？</span>
                </Form>
            </Modal>
        </div>
    )
}

export default OperationManage;