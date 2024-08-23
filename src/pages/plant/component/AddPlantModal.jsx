import React, { useEffect, useState, useRef, } from 'react';
import { DatePicker, Row, Col, Modal, Form, Input, Select, Switch, InputNumber } from 'antd';
import { useSelector, useIntl } from "umi";
import { alarmLevel } from '@/utils/constants'
import SearchMap from "../../map";
import dayjs from 'dayjs';
import styles from "./index.less";

const App = (props) => {
  const formList = [
    {
      label: '电站名称',
      key: 'name',
      type: 3,
      required: true,
      disabled: props.title == '编辑电站' ? true : false
    },
    {
      label: '所属用户',
      key: 'userName',
      type: 1,
      required: true,
      data: props.initSelectData?.userList,
      disabled: props.title == '编辑电站' ? true : false
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
      data: props.initSelectData?.timeZone
    },
    {
      label: '所属货币',
      key: 'priceUnit',
      type: 1,
      required: true,
      data: props.initSelectData?.currencyList
    },
    {
      label: '告警类型',
      key: 'alarms',
      type: 5,
      required: true,
      data: alarmLevel
    },
    {
      label: '电站位置',
      key: 'website',
      type: 6,
      required: false,
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
      required: true
    },
    {
      label: '电站地址',
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
    form.resetFields();
    form.setFieldsValue({
      ...props.formData,
      timeZone: props?.formData?.timeZone || 'UTC+8',
      alarms: props?.formData?.alarms ? props?.formData?.alarms?.split(",") : [],
      website: props?.formData?.position,
    })
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
        userId: [values.userName],
        type: values.typeName,
        installDate: dayjs(values.installDate).format('YYYY-MM-DD HH:mm:ss'),
        networkDate: dayjs(values.networkDate).format('YYYY-MM-DD HH:mm:ss'),
        alarms: values?.alarms?.join(",")
      }),
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
        width={800}
        centered
      >
        <div className={styles.modalContent}>
          <Form
            form={form}
            name="wrap"
            ref={formRef}
            labelAlign="right"
            labelWrap
            colon={false}
            labelCol={{
              span: 6
            }}
          >
            <Row gutter={[20, 0]}>
              {formList.map(it => {
                if (it.type === 1) {
                  return (
                    <>
                      <Col className="gutter-row" span={20}>
                        <Form.Item
                          label={t(it.label)}
                          name={it.key}
                          rules={[{ required: it.required }]}
                        >
                          <Select
                            disabled={it.disabled || false}
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
                        <InputNumber defaultValue={0} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  )
                } else if (it.type === 3) {
                  return (
                    <Col className="gutter-row" span={20}>
                      <Form.Item 
                        label={t(it.label)} 
                        name={it.key} 
                        rules={[{ required: it.required }]} 
                      >
                        <Input
                          disabled={it.disabled || false}
                        />
                      </Form.Item>
                    </Col>
                  )
                } else if (it.type === 4) {
                  return (
                    <Col className="gutter-row" span={20}>
                      <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                        <DatePicker showTime style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  )
                } else if (it.type === 5) {
                  return (
                    <Col className="gutter-row" span={20}>
                      <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]} >
                        <Select mode="multiple" style={{ width: '100%' }} options={it?.data} />
                      </Form.Item>
                    </Col>
                  )
                } else if (it.type === 6) {
                  return (
                    <Col className="gutter-row" span={20}>
                      <Form.Item
                        label={<span style={{ position: 'relative', bottom: 127, marginBottom: 0 }}>{t(it.label)}</span>}
                        name={it.key}
                        rules={[{ required: it.required }]}
                      >
                        <SearchMap
                          defaultData={props?.formData}
                          onMyChange={async (data) => {
                            if (data) {
                              const positionList = data?.location?.split(",");
                              form.setFieldsValue({
                                longitude: positionList?.[0],
                                latitude: positionList?.[1],
                                position: data?.formatted_address
                              })
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                  )
                }
              })
              }
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default App; 