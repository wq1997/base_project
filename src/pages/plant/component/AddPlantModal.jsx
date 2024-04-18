import React, { useEffect, useState, useRef, } from 'react';
import { DatePicker,Row,Col, Modal, Form, Input, Select, Switch, InputNumber } from 'antd';
import { useSelector, useIntl } from "umi";
// import { getAlarmRuleInsertInitData } from '@/services/alarm'
import dayjs from 'dayjs';

const App = (props) => {
  const formList = [
    {
      label: '电站名称',
      key: 'name',
      type: 3,
      required: true,
      disabled:props.title=='编辑电站'?true:false
    },
    {
      label: '所属用户',
      key: 'userName',
      type: 1,
      required: true,
      data:props.initSelectData?.userList,
      disabled:props.title=='编辑电站'?true:false

    },

    {
      label: '建站日期',
      key: 'installDate',
      type: 4,
      required: true
    },
    {
      label: '所属时区',
      key: 'timeZone',
      type: 1,
      required: true,
      data:props.initSelectData?.timeZone
    },
    {
      label: '所属货币',
      key: 'priceUnit',
      type: 1,
      required: true,
      data:props.initSelectData?.currencyList

    },
    {
      label: '电站位置',
      key: 'position',
      type: 3,
      required: false,
    },
  ]
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
      console.log(values,1111111);
        props.changeData({  ...values,
          userId:[values.userName],
          type:values.typeName,
          installDate:dayjs(values.installDate).format('YYYY-MM-DD HH:mm:ss'),
          networkDate:dayjs(values.networkDate).format('YYYY-MM-DD HH:mm:ss')})
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
            maxWidth: 500,
          }}
        >
          <Row gutter={[20, 0]}>
          {formList.map(it => {
            if (it.type === 1) {
              return (
                <>
                 <Col className="gutter-row" span={20}>
                 <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                    <Select
                      // defaultValue={it.data[0].value}
                      disabled={it.disabled||false}
                      options={it?.data}
                    />
                  </Form.Item>
                 </Col>
                  
                </>
              )
            } else if (it.type === 2) {
              return (
                <Col className="gutter-row" span={20}>
                  <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                    <InputNumber defaultValue={0} style={{ width: '100%' }}/>
                  </Form.Item>
                </Col>
              )
            } else if (it.type === 3) {
              return (
                <Col className="gutter-row" span={20}>
                  <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                    <Input  
                      disabled={it.disabled||false}
                      />
                  </Form.Item>
                </Col>
              )
            }else if (it.type === 4) {
              return (
                <Col className="gutter-row" span={20}>
                  <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                    <DatePicker showTime style={{ width: '100%' }}/>
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