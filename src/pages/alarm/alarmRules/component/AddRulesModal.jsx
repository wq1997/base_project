import React, { useEffect, useState, useRef, } from 'react';
import { Button, Modal, Form, theme, Select, Switch, InputNumber } from 'antd';
import { useSelector, useIntl } from "umi";
import { getGridPointList, } from '@/services/plant'

export const formList = [
  {
    label: '告警等级',
    key: 'prior',
    type: 1,
    required: true,
    data: [{
      label: '低级',
      value: 1,
      key: 1,
    },
    {
      label: '普通',
      value: 2,
      key: 2,
    },
    {
      label: '严重',
      value: 3,
      key: 3,
    },
    {
      label: '高级',
      value: 4,
      key: 4,
    },
    ]
  },
  {
    label: '推送方式',
    key: 'pushType',
    type: 1,
    required: true,
    data: [{
      label: '邮件',
      value: 1,
      key: 1,
    },
    {
      label: '短信',
      value: 2,
      key: 2,
    },
    {
      label: '微信',
      value: 3,
      key: 3,
    },
    ]
  },
  {
    label: '每小时推送上限',
    key: 'initNum',
    type: 2,
    required: true,

  },
  {
    label: '是否启用',
    key: 'status',
    type: 3,
    required: true,
  },
]
const App = (props) => {
  const intl = useIntl();
  const { token } = theme.useToken();
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
    console.log(props.formData, 1111111111);

  }, [props.formData]);
  useEffect(() => {
    getGrid();
  }, [token,])
  const formRef = useRef();
  const [form] = Form.useForm();

  const [grids, setGrids] = useState([]);
  const getGrid = async () => {
    let { data: grid } = await getGridPointList({
      plantId: localStorage.getItem('plantId')
    })
    setGrids(grid?.data);
  }
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      if (props.formData.id) {
        props.changeData({ id: props.formData.id, ...values })

      } else {
        props.changeData(values)
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
        style={{ margin: 'auto' }}
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
          <Form.Item label={t('并网点')} name={'gridPointId'} rules={[{ required: true }]}>
            <Select
              key={grids?.length}
              // defaultValue={grids[0]?.id}
              placeholder={t('请选择并网的')}
              options={grids?.map(item => {
                return {
                  value:item.id,
                  label:item.gridPointName
                }
              })
            }
            /> 
          </Form.Item>
          {formList.map(it => {
            if (it.type === 1) {
              return (
                <>
                  <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]}>
                    <Select
                      defaultValue={it.data[0].value}
                      options={it.data.map(item => {
                        return {
                          value:item.value,
                          label:t(item.label)
                        }
                      })}
                    />
                  </Form.Item>
                </>
              )
            } else if (it.type === 2) {
              return (
                <>
                  <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]}>
                    <InputNumber defaultValue={0} />
                  </Form.Item>
                </>
              )
            } else if (it.type === 3) {
              return (
                <>
                  <Form.Item label={t(it.label)} name={it.key} rules={[{ required: it.required }]}>
                    <Switch checkedChildren={t("启用")} unCheckedChildren={t("禁用")} />
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