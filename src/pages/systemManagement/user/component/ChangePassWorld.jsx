import React, { useEffect, useState, useRef, } from 'react';
import { Row, Col, Modal, Form, Input, Select } from 'antd';
import { useSelector, useIntl } from "umi";
import {
    getPublicKey as getPublicKeySever,
} from "@/services/user";
import { getEncrypt, } from "@/utils/utils";

const App = (props) => {
    const intl = useIntl();
    const [publicKey, setPublicKey] = useState('');
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    useEffect(() => {
        form1.setFieldsValue(props.formData)
    }, [props.formData]);
    useEffect(() => {
        getPublicKey();
    }, [])
    const getPublicKey = async () => {
        const res = await getPublicKeySever();
        if (res?.data) {
            setPublicKey(res?.data);
        }
    }
    const formRef = useRef();
    const [form1] = Form.useForm();
    const formList = [
        {
            label: '旧密码',
            key: 'oldPswd',
            type: 1,
            required: true,
            rules: {
            },
        },
        {
            label: '新密码',
            key: 'newPswd',
            type: 1,
            required: true,
            rules: {
            },
        },
        {
            label: '确认密码',
            key: 'newPswds',
            type: 1,
            required: true,
            rules: ({ getFieldValue }) => ({
                validator(rule, value) {
                    if (!value || getFieldValue('newPswd') === value) {
                        return Promise.resolve()
                    }
                    return Promise.reject(t("两次密码输入不一致"))
                }
            })
        },


    ]
    const onFinish = async () => {
        try {
            const values = await form1.validateFields();
            console.log('Success:', values, props);
            props.delUserData({ f0102_Id: props.formData?.f0102_Id, 
                oldPswd:getEncrypt(publicKey, values.oldPswd),
                newPswd:getEncrypt(publicKey, values.newPswd),
                newPswds:getEncrypt(publicKey, values.newPswds),

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
            >
                <Form
                    form={form1}
                    name="wrap"
                    ref={formRef}
                    labelCol={{ flex: '110px' }}
                    labelAlign="right"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 500 }}
                >
                    <Row gutter={[20, 0]}>
                        {formList.map(it => {
                            if (it.type === 1) {
                                return (
                                    <>
                                        <Col className="gutter-row" span={20}>
                                            <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required, }, it?.rules]}>
                                                <Input type='password'/>
                                            </Form.Item>
                                        </Col>

                                    </>
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