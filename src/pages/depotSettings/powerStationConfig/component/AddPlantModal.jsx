import React, { useEffect, useState, useRef, } from 'react';
import { DatePicker,Row,Col, Modal, Form, Input, Select, Switch, InputNumber } from 'antd';
import { useSelector, useIntl } from "umi";
import { getAlarmRuleInsertInitData } from '@/services/alarm'

const App = (props) => {
  const formList = [
    {
      label: '电站名称',
      key: 'name',
      type: 3,
      required: true,
    },
    {
      label: '所属用户',
      key: 'userName',
      type: 1,
      required: true,
      data:props.initSelectData?.userList
    },
    {
      label: '电站位置',
      key: 'position',
      type: 3,
      required: true,
    },
    {
      label: '电站类型',
      key: 'typeName',
      type: 1,
      required: true,
      data:props.initSelectData?.plantType

    },
    {
      label: '经度',
      key: 'longitude',
      type: 3,
      required: true,
    },
    {
      label: '纬度',
      key: 'latitude',
      type: 3,
      required: true,
    },
    
    {
      label: '建站日期',
      key: 'installDate',
      type: 4,
      required: true
    },
    {
      label: '储能装机容量',
      key: 'capacity',
      type: 2,
      required: true
    },
    {
      label: '光伏装机容量',
      key: 'pvCapacity',
      type: 2,
      required: false
    },
    {
      label: '充电桩数量',
      key: 'chargePileTotal',
      type: 2,
      required: false
    },
    {
      label: '电芯温度最大值',
      key: 'cellTempMax',
      type: 2,
      required: false
    },
    {
      label: '电芯温度最小值',
      key: 'cellTempMin',
      type: 2,
      required: false
    },
    {
      label: '并网日期',
      key: 'networkDate',
      type: 4,
      required: false
    },
    {
      label: '所属时区',
      key: 'timeZone',
      type: 1,
      required: false,
      data:props.initSelectData?.timeZone
    },
    {
      label: '所属货币',
      key: 'priceUnit',
      type: 1,
      required: false,
      data:props.initSelectData?.languageList

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
    const { data } = await getAlarmRuleInsertInitData();
  }
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log(values,1111111);
        props.changeData({  ...values,
          createUserId:values.userName,
          type:values.typeName,
          installDate:values.installDate.format('YYYY-MM-DD HH:mm:ss'),
          networkDate:values.networkDate.format('YYYY-MM-DD HH:mm:ss')})
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
        width={900}
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
            maxWidth: 800,
          }}
        >
          <Row gutter={[20, 0]}>
          {formList.map(it => {
            if (it.type === 1) {
              return (
                <>
                 <Col className="gutter-row" span={12}>
                 <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                    <Select
                      // defaultValue={it.data[0].value}
                      options={it?.data}
                    />
                  </Form.Item>
                 </Col>
                  
                </>
              )
            } else if (it.type === 2) {
              return (
                <Col className="gutter-row" span={12}>
                  <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                    <InputNumber defaultValue={0} style={{ width: '100%' }}/>
                  </Form.Item>
                </Col>
              )
            } else if (it.type === 3) {
              return (
                <Col className="gutter-row" span={12}>
                  <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                    <Input  />
                  </Form.Item>
                </Col>
              )
            }else if (it.type === 4) {
              return (
                <Col className="gutter-row" span={12}>
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