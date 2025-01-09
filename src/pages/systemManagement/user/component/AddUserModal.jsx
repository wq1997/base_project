import React, { useEffect, useState, useRef, } from 'react';
import { Button, Modal, Form, Input, Select, Card, Space } from 'antd';
import { useSelector, useIntl } from "umi";
import { getEncrypt, } from "@/utils/utils";
import { PASSWORD_RGE, } from "@/utils/constants";
import { CloseOutlined } from '@ant-design/icons';
const App = (props) => {
  const intl = useIntl();
  const [formList,setFormList] = useState([]);
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
  }, [props.formData]);
  useEffect(() => {
    if(props?.formData?.roleId==4){
      setFormList(tempFormList.filter(item => item.key != "roleId"));
    }else{
      setFormList(tempFormList);
    }
  }, [props.formData,props.title]);
  const formRef = useRef();
  const [form] = Form.useForm();
  const tempFormList = [
    {
      label: '用户名',
      key: 'name',
      type: 1,
      required: true,
      rules: []
    },
    {
      label: '密码',
      key: 'password',
      type: 1,
      required: true,
      rules: [{
        pattern: PASSWORD_RGE,
        message: t('密码长度为8-16位，至少2种字符，请重新输入')
      }]
    },
    {
      label: '角色',
      key: 'roleId',
      type: 2,
      required: true,
      data: (props.roleId == 3) ? [
        {
          label: t('普通用户'),
          value: 1,
          key: '普通用户',
        },
        {
          label: t('超级用户'),
          value: 2,
          key: '超级用户',
        }
      ] : (props.roleId == 4) ? [
        {
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
        }
      ] : [],


      rules: []

    },
    {
      label: '手机',
      key: 'phone',
      type: 1,
      required: false,
      rules: []

    },
    // {
    //   label: '邮箱',
    //   key: 'mail',
    //   type: 1,
    //   required: false,
    //   rules: []

    // },
    {
      label: '公司',
      key: 'company',
      type: 1,
      required: false,
      rules: []

    },
    {
      label: '描述',
      key: 'desc',
      type: 1,
      required: false,
      rules: []

    },
  ]
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      if (props.formData.f0102_Id) {
        props.changeData({ f0102_Id: props.formData.f0102_Id, ...values, })
      } else {
        props.changeData({ ...values, })
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
        width={700}
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
                <div key={it.key}>
                  <Form.Item label={t(it.label)} name={it.key} rules={[...it.rules, { required: it.required }]}>
                    <Input type={it.key == 'email' ? 'email' : 'text'} />
                  </Form.Item>
                </div>
              )
            } else if (it.type === 2) {
              return (
                <div key={it.key}>
                  <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]}>
                    <Select
                      options={it.data}
                    />
                  </Form.Item>
                </div>
              )
            }

          })
          }
          <Form.Item label={t('邮箱')} name={'mail'} rules={[{ required: true }]}>
            <Input type={'email'} />
          </Form.Item>

          {/* Nest Form.List */}
          <Form.Item label={' '}>
            <Form.List name={['email']}>
              {(subFields, subOpt) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 16,
                    
                  }}
                >
                  {subFields.map((subField) => (
                    <Space key={subField.key}>
                      <Form.Item noStyle name={[subField.name, 'email']}  rules={[{ required: true }]}>
                        <Input style={{width:400}} type='email' placeholder={t('邮箱')} />
                      </Form.Item>
                      <CloseOutlined
                        onClick={() => {
                          subOpt.remove(subField.name);
                        }}
                      />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => subOpt.add()} block>
                    + {t('新增邮箱')}
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default App; 