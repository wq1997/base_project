import React, { useEffect, useState, useRef, } from 'react';
import { DatePicker, Row, Col, Modal, Form, Input, Select, Switch, InputNumber } from 'antd';
import { useSelector, useIntl } from "umi";
import { optionType } from '@/utils/constants'
import dayjs from 'dayjs';

let {Option}=Select
const App = (props) => {
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }

    const formList = [

        {
            label: '所属电站',
            key: 'plantId',
            type: 1,
            required: true,
            data: props.initSelectData?.userList,
            option:props.plantSelect,
            disabled:props.title=='编辑设备'? true:false,
        },
        {
            label: '设备编码',
            key: 'sn',
            type: 3,
            required: true,
            disabled:props.title=='编辑设备'? true:false,

        },

        {
            label: '设备名称',
            key: 'name',
            type: 3,
            required: true,
            disabled:false,

        },
        {
            label: '设备类型',
            key: 'type',
            type: 1,
            required: true,
            data: props.initSelectData?.plantType,
            option:optionType,
            disabled:props.title=='编辑设备'? true:false,

        },
        {
            label: '位置',
            key: 'address',
            type: 3,
            required: true,
        },

    ]

    useEffect(() => {
        form.setFieldsValue(props.formData);
        console.log(props.formData,111111);
    }, [props.formData]);
    useEffect(() => {
        getInitSearchData();
    }, [])
    const formRef = useRef();
    const [form] = Form.useForm();

    const getInitSearchData = async () => {
        // const { data } = await getAlarmRuleInsertInitData();
    }
    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            props.changeData({
                ...values,
                createUserId: values.userName,
                installDate: dayjs(values.installDate).format('YYYY-MM-DD HH:mm:ss'),
                networkDate: dayjs(values.networkDate).format('YYYY-MM-DD HH:mm:ss')
            })
            props.onRef();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };
    return (
        <>
            <Modal
                title={t(props.title)}
                open={props.isOpen}
                onCancel={props.onRef}
                onOk={onFinish}
                mask={false}
                okButtonProps={{
                    htmlType: 'submit',
                    form: 'wrap',
                }}
                style={{ margin: 'auto' }}
                width={500}
            >
                <Form
                    form={form}
                    name="wrap"
                    ref={formRef}
                    labelCol={{ flex: '130px' }}
                    labelAlign="right"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{
                        maxWidth: 400,
                    }}
                >
                    <Row gutter={[20, 0]}>
                        {formList.map(it => {
                            if (it.type === 1) {
                                return (
                                    <>
                                        <Col className="gutter-row" span={24}>
                                            <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                                                <Select
                                                    options={it?.option}
                                                    disabled={it.disabled}
                                                >
                                                    {it.option.map(item=>{
                                                    return<Option key={item.valaue} value={item.value}>{item.label}</Option>
                                                         
                                                    })}

                                                </Select>
                                            </Form.Item>
                                        </Col>

                                    </>
                                )
                            } else if (it.type === 2) {
                                return (
                                    <Col className="gutter-row" span={24}>
                                        <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                                            <InputNumber defaultValue={0} style={{ width: '100%' }} 
                                                    disabled={it.disabled}
                                                    />
                                        </Form.Item>
                                    </Col>
                                )
                            } else if (it.type === 3) {
                                return (
                                    <Col className="gutter-row" span={24}>
                                        <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                                            <Input
                                                    disabled={it.disabled}
                                                    />
                                        </Form.Item>
                                    </Col>
                                )
                            } else if (it.type === 4) {
                                return (
                                    <Col className="gutter-row" span={24}>
                                        <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                                            <DatePicker showTime style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                )
                            }
                        })
                        }
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
export default App; 