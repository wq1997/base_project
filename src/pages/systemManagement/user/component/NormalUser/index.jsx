
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSelector, useIntl, history } from "umi";
import { Button, Modal, Form, Input, Select, theme, message } from 'antd';
import { CardModel } from "@/components";
import { apiSaveOrUpdateUser, } from '@/services/total'
import { getEncrypt,removeLocalStorage } from "@/utils/utils";
import { PASSWORD_RGE,  } from "@/utils/constants";

function Com(props) {
    const { user } = useSelector(function (state) {
        return state.user
    });
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const { token } = theme.useToken();
    const formRef = useRef();
    const [form] = Form.useForm();
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const formList = [
        {
            label: '用户名',
            key: 'name',
            type: 1,
            required: true
        },
        {
            label: '密码',
            key: 'password',
            type: 3,
            required: true,
            rules: {
                pattern:PASSWORD_RGE,
                message:t('密码长度为8-16位，至少2种字符，请重新输入')
              },
        },
        {
            label: '确认密码',
            key: 'passwordRe',
            type: 3,
            required: true,
            rules: ({ getFieldValue }) => ({
                validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                    }
                    return Promise.reject(t("两次密码输入不一致"))
                }
            })
        },
        {
            label: '手机',
            key: 'phone',
            type: 1,
            required: false
        },
        {
            label: '邮箱',
            key: 'mail',
            type: 1,
            required: false
        },
        {
            label: '公司',
            key: 'company',
            type: 1,
            required: false
        },
        {
            label: '描述',
            key: 'desc',
            type: 1,
            required: false
        },
    ]
    const delUserData = async () => {
        try {
            const values = await form.validateFields();
            const { data } = await apiSaveOrUpdateUser({ ...form.getFieldsValue(), 
                password:getEncrypt(localStorage.getItem('publicKey'),values.password),
                passwordRe:getEncrypt(localStorage.getItem('publicKey'), values.passwordRe),
                f0102_Id: user.f0102_Id });
            if (data) {
                removeLocalStorage("Token");
                history.push('/login');
                message.success({ content: t('密码修改成功'), duration: 2 });
            }
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }
    const initFormData = () => {
        let formData = {};
        formList.map(it => {
            formData[it.key] = user[it.key];
        });

        return formData
    }
    useEffect(() => {
        form.setFieldsValue(initFormData());
    }, [user]);

    return (
        <div className='content' style={{ backgroundColor: token.titleCardBgc, height: '100%' }}>
            <CardModel
                title={
                    t("编辑用户信息")
                }
                content={
                    <Form
                        form={form}
                        name="wrap"
                        ref={formRef}
                        labelAlign="right"
                        labelWrap
                        // wrapperCol={{ flex: 1 }}
                        colon={false}
                        style={{ maxWidth: 450 }}
                        {...formItemLayout}
                    >
                        {formList.map(it => {
                            if (it.type === 1) {
                                return (
                                    <>
                                        <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} span={12}>
                                            <Input defaultValue={user[it.key]} />
                                        </Form.Item>
                                    </>
                                )
                            } else if (it.type === 2) {
                                return (
                                    <>
                                        <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} span={12}>
                                            <Select
                                                defaultValue={user[it.key] + ''}
                                                options={it.data}
                                            />
                                        </Form.Item>
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }, it.rules]}>
                                            <Input.Password defaultValue={user[it.key]} />
                                        </Form.Item>
                                    </>
                                )
                            }

                        })
                        }
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" onClick={delUserData}>
                                {t('确认修改')}
                            </Button>
                        </Form.Item>
                    </Form>
                }
            />

        </div>
    )
}

export default Com