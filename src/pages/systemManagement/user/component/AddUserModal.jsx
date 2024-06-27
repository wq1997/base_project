import React, { useEffect, useState, useRef, } from 'react';
import { Row, Col, Modal, Form, Input, Select } from 'antd';
import { useSelector, useIntl } from "umi";
const { Option } = Select;

const App = (props) => {
  const intl = useIntl();
  const [roleId, setRoleId] = useState(props.formData?.roleId || 1);
  const [upData, setUpData] = useState([...props.userUp] || []);

  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }
  useEffect(() => {
    form.setFieldsValue(props.formData);
    setUpData([...props.userUp])
  }, [props.formData])
  const formRef = useRef();
  const [form] = Form.useForm();
  const formList = [
    {
      label: '用户名',
      key: 'name',
      type: 1,
      required: true,
      disabled: props.title == '编辑用户' ? true : false,
    },
    {
      label: '密码',
      key: 'password',
      type: 1,
      required: true,
      disabled: false,
    },
    {
      label: '角色',
      key: 'roleId',
      type: 2,
      required: true,
      data: [{
        label: t('普通用户'),
        value: 1,
        key: '普通用户',
      },
      {
        label: t('管理员'),
        value: 2,
        key: '管理员',
      },
      ],
      onchange: (val) => {
        let arr = [];
        if (val == 1) {
          arr.push(
            props.userUp?.find(it => it.roleId == 2)
          )
        }else{
          arr.push(
            props.userUp?.find(it => it.roleId == 3)
          )
        };
        console.log(arr,22222);
        setUpData(arr); 
      }
    },
    {
      label: '所属上级',
      key: 'parentId',
      type: 2,
      required: true,
      // data: props.formData?.roleId==1?props.userUp:[]
      data: [...upData],
    },
    {
      label: '手机',
      key: 'phone',
      type: 1,
      required: true,
      disabled: false
    },
    {
      label: '邮箱',
      key: 'mail',
      type: 1,
      required: true,
      disabled: false

    },
    {
      label: '备注',
      key: 'desc',
      type: 1,
      required: false,
      disabled: false

    },
  ];
  const onFinish = async () => {
    const values = formRef.current?.getFieldsValue();
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      if (props.formData.f0102_Id) {
        props.changeData({ f0102_Id: props.formData.f0102_Id, ...values })
      } else {
        props.changeData({...values, active:true })
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
          style={{ maxWidth: 500 }}
          initialValues={props.formData}
        >
          <Row gutter={[20, 0]}>

            {formList.map(it => {
              if (it.type === 1) {
                return (
                  <>
                    <Col className="gutter-row" span={20}>

                      <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]}>
                        <Input disabled={it.disabled} />
                      </Form.Item>
                    </Col>

                  </>
                )
              } else if (it.type === 2) {
                return (
                  <>
                    <Col className="gutter-row" span={20}>
                      <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]}>
                        <Select onChange={it.onchange}>
                          {
                            it?.data?.map(it => {
                              return <Option key={it.value} value={it.value}>{
                                it.label
                              }</Option>
                            })

                          }

                        </Select>
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