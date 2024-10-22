import React, { useEffect, useState, useRef, } from 'react';
import { Button, Modal, Form, Input, Select, message } from 'antd';
import { useSelector, useIntl } from "umi";
import { getEncrypt,  } from "@/utils/utils";
import { PASSWORD_RGE,  } from "@/utils/constants";

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
  useEffect(() => {
    form.setFieldsValue(props.formData)
  }, [props.formData])
  const formRef = useRef();
  const [form] = Form.useForm();
  const formList = [
    {
      label: '用户名',
      key: 'name',
      type: 1,
      required: true,
      rules:[]
    },
    {
      label: '密码',
      key: 'password',
      type: 1,
      required: true,
      rules:  [{
        pattern:PASSWORD_RGE,
        message:t('密码长度为8-16位，至少2种字符，请重新输入')
      }]
    },
    {
      label: '角色',
      key: 'roleId',
      type: 2,
      required: true,
      data:  props.roleId == 2 ? [{
        label: t('普通用户'),
        value: 1,
        key: '普通用户',
      },{
        label: t('超级用户'),
        value: 2,
        key: '超级用户',
      },
      ] : [{
        label: t('普通用户'),
        value: 1,
        key: '普通用户',
      },
      {
        label: t('超级用户'),
        value: 2,
        key: '超级用户',
      },
      {
        label: t('管理员'),
        value: 3,
        key: '管理员',
      },],

      rules:[]

    },
    // {
    //   label: '场站类型',
    //   key: 'sceneType',
    //   type: props.title === '新增用户' ? 2 : null,
    //   required: true,
    //   data: [{
    //     label: '储能电站',
    //     value: '1',
    //     key: '储能电站',
    //   },
    //   {
    //     label: '光储充电站',
    //     value: '2',
    //     key: '光储充电站',
    //   },
    //   ],
    //   rules:[]

    // },
    {
      label: '手机',
      key: 'phone',
      type: 1,
      required: false,
      rules:[]

    },
    {
      label: '邮箱',
      key: 'mail',
      type: 1,
      required: false,
      rules:[]

    },
    {
      label: '公司',
      key: 'company',
      type: 1,
      required: false,
      rules:[]

    },
    {
      label: '描述',
      key: 'desc',
      type: 1,
      required: false,
      rules:[]

    },
  ]
  const onFinish = async () => {
    // const values = formRef.current?.getFieldsValue();
    try {
      const values = await form.validateFields();

      console.log('Success:', values.password);
      if (props.formData.f0102_Id) {
        props.changeData({ f0102_Id: props.formData.f0102_Id, ...values, })
      } else {
        props.changeData({...values,})
      }
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
          form={form}
          name="wrap"
          ref={formRef}
          labelCol={{ flex: '110px' }}
          labelAlign="right"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
        >
          {formList.map(it => {
            if (it.type === 1) {
              return (
                <>
                  <Form.Item label={t(it.label)} name={it.key} rules={[...it.rules,{required:it.required}]}>
                    <Input />
                  </Form.Item>
                </>
              )
            } else if (it.type === 2) {
              return (
                <>
                  <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]}>
                    <Select
                      options={it.data}
                    />
                  </Form.Item>
                </>
              )
            }

          })
          }
        </Form>
      </Modal>
    </>
  );
};
export default App; 