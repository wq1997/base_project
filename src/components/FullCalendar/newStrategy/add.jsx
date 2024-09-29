import { Title } from '@/components';
import { Modal, Form, Input, Row, Col, Select, InputNumber, Space, Button, Table } from "antd";
import { FORM_REQUIRED_RULE, electricTypeList } from "@/utils/constants";
import { fillInt } from "@/utils/utils";
import moment from 'moment';
import { message } from 'antd';
import { useSelector, useIntl } from "umi";

const Add = ({
    form,
    open,
    onChangeOpen,
    newStrategy
}) => {

    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    return (
        <>
            <Modal
                title={<Title title="新增策略" />}
                open={open}
                onOk={async () => {
                    const values = await form.validateFields(['strategyName', 'contentList']);
                    console.log("新增策略", values);
                    onChangeOpen(false);
                    form.resetFields();
                    newStrategy(
                        {
                            ...values,
                        }
                    );
                }}
                width={980}
                onCancel={() => {
                    onChangeOpen(false);
                    form.resetFields();
                }}
            >
                <Form
                    form={form}
                    colon={false}
                >
                    <Form.Item label="策略名称" name="strategyName" rules={[FORM_REQUIRED_RULE]}>
                        <Input placeholder="请输入策略名称" style={{ maxWidth: 320 }} />
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
                                    if (hour1 && min1 && hour2 && min2) {
                                        const YMD = moment().format('YYYY-MM-DD');
                                        const flag = moment(`${YMD} ${hour1}:${min1}`).isBefore(moment(`${YMD} ${hour2}:${min2}`));
                                        if (!flag) {
                                            return Promise.reject('起始时间应该早于结束时间');
                                        }
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Row gutter={5} style={{ width: '90%' }}>
                            <Col span={5}>
                                <Form.Item name="hour1" style={{ marginBottom: 0 }} rules={[FORM_REQUIRED_RULE]}>
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
                                <Form.Item name="min1" style={{ marginBottom: 0 }} rules={[FORM_REQUIRED_RULE]}>
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
                                <Row justify="center" style={{ marginTop: 5 }}>-</Row>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    name="hour2"
                                    style={{ marginBottom: 0 }}
                                    rules={[FORM_REQUIRED_RULE]}
                                >
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
                                <Form.Item name="min2" style={{ marginBottom: 0 }} rules={[FORM_REQUIRED_RULE]}>
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
                                label="状态"
                                name="action"
                            >
                                <Select
                                    options={[
                                        { label: '充电', value: 1 },
                                        { label: '放电', value: 2 },
                                        { label: '待机(零功率)', value: 3 },
                                        { label: '关机', value: 4 },
                                         { label: '自发自用', value: 5 },

                                    ]}
                                    placeholder="请选择"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                label="功率(kW)"
                                name="pcsPower"
                            >
                                <InputNumber placeholder='请输入' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                label="目标SOC(%)"
                                name="targetSoc"
                            >
                                <InputNumber min={0} placeholder='请输入' />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Space>
                                <Button
                                    onClick={async () => {
                                        await form.validateFields(['hour1', 'min1', 'hour2', 'min2']);
                                        const values = await form.getFieldsValue();
                                        const contentList = await form.getFieldValue('contentList') || [];
                                        let flag=true;
                                        let startTime = parseInt(values?.hour1 + values?.min1);
                                        let endTime = parseInt(values?.hour1 + values?.min1)
                                        contentList.map(it => {  
                                            let isStartTime = parseInt(it?.time.split('-')[0].split(':')[0] + it?.time.split('-')[0].split(':')[1]);
                                            let isEndTime  = parseInt(it?.time.split('-')[1].split(':')[0] + it?.time.split('-')[1].split(':')[1]);
                                            if (!(isEndTime<startTime|| endTime<isStartTime)) {
                                                message.warning(t('时间段重复'),2);
                                                flag=false;
                                                return
                                            }
                                        });
                                        if (flag) {
                                            form.setFieldsValue({
                                                contentList: [
                                                    ...contentList,
                                                    {
                                                        time: `${values?.hour1}:${values?.min1} -  ${values?.hour2}:${values?.min2}`,
                                                        action: values?.action,
                                                        pcsPower: values?.pcsPower,
                                                        targetSoc: values?.targetSoc,
                                                        startHm: `${values?.hour1}:${values?.min1}`,
                                                        endHm: `${values?.hour2}:${values?.min2}`
                                                    }
                                                ]
                                            })
                                        }else{
                                            return
                                        }
                                       
                                    }}
                                >
                                    +
                                </Button>
                                <Button
                                    onClick={() => {
                                        form.resetFields(['hour1', 'hour2', 'min1', 'min2', 'type', 'status', 'power', 'soc']);
                                        let contentList = form.getFieldValue('contentList');
                                        contentList.splice(contentList.length - 1, 1);
                                        form.setFieldsValue({
                                            contentList: [
                                                ...contentList,

                                            ]
                                        })
                                    }}
                                >
                                    -
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                    <Form.Item name="contentList" valuePropName="dataSource">
                        <Table
                            columns={[

                                {
                                    title: '时段',
                                    key: 'time',
                                    dataIndex: 'time'
                                },

                                {
                                    title: '状态',
                                    key: 'action',
                                    dataIndex: 'action'
                                },
                                {
                                    title: 'PCS功率(kW)',
                                    key: 'pcsPower',
                                    dataIndex: 'pcsPower'
                                },
                                {
                                    title: '目标SOC(%)',
                                    key: 'targetSoc',
                                    dataIndex: 'targetSoc'
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