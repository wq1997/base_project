import { Title } from '@/components';
import { Modal, Form, Input, Row, Col, Select, InputNumber, Space, Button, Table} from "antd";
import { FORM_REQUIRED_RULE, electricTypeList } from "@/utils/constants";
import { fillInt } from "@/utils/utils";
import moment from 'moment';

const Add = ({
        data,
        form, 
        dataSource, 
        onChangeDatasource,
        open,
        onChangeOpen,
}) => {
   return (
        <>
            <Modal
                title={<Title title="新增策略"/>}
                open={open}
                onOk={async () => {
                    const values = await form.validateFields(['name', 'datasource']);
                    console.log("新增策略", values);
                    onChangeOpen(false);
                    form.resetFields();
                    onChangeDatasource([
                        ...dataSource,
                        {
                            ...values,
                            creator: '创建者',
                            createTime: moment().format("YYYY/MM/DD")
                        }
                    ]);
                }}
                width={980}
                onCancel={()=>{
                    onChangeOpen(false);
                    form.resetFields();
                }}
            >
                <Form 
                    form={form}
                    colon={false}
                >
                    <Form.Item label="策略名称" name="name" rules={[FORM_REQUIRED_RULE]}>
                        <Input placeholder="请输入策略名称" style={{maxWidth: 320}} />
                    </Form.Item>
                    <Form.Item label="电价">
                        <Row>
                            <Col span={4}>尖：{data.form2Data?.pointed}</Col>
                            <Col span={4}>峰：{data.form2Data?.peak}</Col>
                            <Col span={4}>平：{data.form2Data?.flat}</Col>
                            <Col span={4}>谷：{data.form2Data?.valley}</Col>
                        </Row>
                    </Form.Item>
                    <Form.Item 
                        name=""
                        label="时段" 
                        dependencies={['hour1', 'min1', 'hour2', 'min2']}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const hour1 = getFieldValue('hour1');
                                    const min1 = getFieldValue('min1');
                                    const hour2 = getFieldValue('hour2');
                                    const min2 = getFieldValue('min2');
                                    if(hour1&&min1&&hour2&&min2){
                                        const YMD = moment().format('YYYY-MM-DD');
                                        const flag = moment(`${YMD} ${hour1}:${min1}`).isBefore(moment(`${YMD} ${hour2}:${min2}`));
                                        if(!flag){
                                            return Promise.reject('起始时间应该早于结束时间');
                                        }
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                            <Row gutter={5} style={{width: '90%'}}>
                                <Col span={5}>
                                    <Form.Item name="hour1" style={{marginBottom: 0}} rules={[FORM_REQUIRED_RULE]}>
                                        <Select 
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            placeholder="时"
                                            options={fillInt(23, true).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item name="min1" style={{marginBottom: 0}} rules={[FORM_REQUIRED_RULE]}>
                                        <Select 
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            placeholder="分"
                                            options={fillInt(59, true).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={1}>
                                    <Row justify="center" style={{marginTop: 5}}>至</Row>
                                </Col>
                                <Col span={5}>
                                    <Form.Item 
                                        name="hour2" 
                                        style={{marginBottom: 0}} 
                                        rules={[FORM_REQUIRED_RULE]}
                                    >
                                        <Select 
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            placeholder="时"
                                            options={fillInt(24, true).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item name="min2" style={{marginBottom: 0}} rules={[FORM_REQUIRED_RULE]}>
                                        <Select 
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            placeholder="分"
                                            options={fillInt(59, true).map((item => {
                                                return {
                                                    label: item,
                                                    value: item
                                                }
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={5}>
                            <Form.Item
                                label="类型"
                                name="type"
                            >
                                <Select 
                                    options={electricTypeList}
                                    placeholder="请选择"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                label="状态"
                                name="status"
                            >
                                <Select 
                                    options={[
                                        {label: '充电',value: '充电'},
                                        {label: '放电',value: '放电'},
                                    ]}
                                    placeholder="请选择"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                label="功率(KW)"
                                name="power"
                            >
                                <InputNumber min={0} placeholder='请输入' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                label="目标SOC(%)"
                                name="soc"
                            >
                                <InputNumber  min={0} placeholder='请输入'/>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Space>
                                <Button
                                    onClick={async () => {
                                        await form.validateFields(['hour1', 'min1', 'hour2', 'min2']);
                                        const values = await form.getFieldsValue();
                                        console.log('新增策略数据', values)
                                        const datasource = await form.getFieldValue('datasource') || [];
                                        form.setFieldsValue({
                                            datasource: [
                                                ...datasource,
                                                {
                                                    type: electricTypeList.find(item => item.value === values.type)?.label,
                                                    time: `${values?.hour1}:${values?.min1} -  ${values?.hour2}:${values?.min2}`,
                                                    price: data.form2Data?.[values.type],
                                                    status: values?.status,
                                                    power: values?.power,
                                                    soc: values?.soc
                                                }
                                            ]
                                        })
                                    }}
                                >
                                    +
                                </Button>
                                <Button
                                    onClick={()=>{
                                        form.resetFields(['hour1','hour2', 'min1', 'min2', 'type', 'status', 'power', 'soc'])
                                    }}
                                >
                                    -
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                    <Form.Item name="datasource" valuePropName="dataSource">
                        <Table 
                            columns={[
                                {
                                    title: '类型',
                                    key: 'type',
                                    dataIndex: 'type'
                                },
                                {
                                    title: '时段',
                                    key: 'time',
                                    dataIndex: 'time'
                                },
                                {
                                    title: '电价(元)',
                                    key: 'price',
                                    dataIndex: 'price'
                                },
                                {
                                    title: '状态',
                                    key: 'status',
                                    dataIndex: 'status'
                                },
                                {
                                    title: 'PCS功率(KW)',
                                    key: 'power',
                                    dataIndex: 'power'
                                },
                                {
                                    title: '目标SOC(%)',
                                    key: 'soc',
                                    dataIndex: 'soc'
                                }
                            ]}
                            scroll={{
                                y: 500
                            }}
                            pagination={false}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
   )
}

export default Add;