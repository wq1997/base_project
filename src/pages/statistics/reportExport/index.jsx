// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, } from 'react';
import { theme, Select, DatePicker, Button, message, Row, Typography, Descriptions, Space, Modal, Form, Checkbox, Table, } from "antd";
import styles from './index.less'
import { CardModel, Title } from "@/components";
import dayjs from 'dayjs';
import { useIntl } from "umi";
import { data } from "./data";
 
function Com() {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [way, setWay] = useState(1);
  const [wayLabel, setWayLabel] = useState('日报表');
  const [date, setDate] = useState(dayjs(new Date()));
  const [dateStr, setDateStr] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [dataChoiceOpen, setDataChoiceOpen] = useState(false); //数据选择弹框

  const intl = useIntl();
  const wayOption = [{
    label: '日报表',
    value: 1,
  },
  {
    label: '周报表',
    value: 2,
  },
  {
    label: '月报表',
    value: 3,
  },
  {
    label: '年报表',
    value: 4,
  },
  {
    label: '总报表',
    value: 5,
  },
  ]
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }

  useEffect(() => {
    getInitData();
  }, [token]);

  const getInitData = async () => {
  
  }
  const changeWay = (val,label) => {
    setWay(val);
    setWayLabel(label?.label);
  }
  const changeDate = (val, str) => {
    setDateStr(str);
    setDate(val);
  }

  const electricReportColumns = [
    {
      title: '',
      children: [
        {
          title: '序号',
          dataIndex: '序号',
          key: '序号'
        },
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date'
        }
      ]
    },
    {
      title: '充电量（kWh）',
      children: [
        {
          title: '尖电',
          dataIndex: '尖电',
          key: '尖电'
        },
        {
          title: '峰电',
          dataIndex: '峰电',
          key: '峰电'
        },
        {
          title: '平电',
          dataIndex: '平电',
          key: '平电'
        },
        {
          title: '谷电',
          dataIndex: '谷电',
          key: '谷电'
        },
        {
          title: '总计',
          dataIndex: '总计',
          key: '总计'
        }
      ]
    },
    {
      title: '放电量（kWh）',
      children: [
        {
          title: '尖电',
          dataIndex: '尖电',
          key: '尖电'
        },
        {
          title: '峰电',
          dataIndex: '峰电',
          key: '峰电'
        },
        {
          title: '平电',
          dataIndex: '平电',
          key: '平电'
        },
        {
          title: '谷电',
          dataIndex: '谷电',
          key: '谷电'
        },
        {
          title: '总计',
          dataIndex: '总计',
          key: '总计'
        }
      ]
    },
    {
      title: '',
      children: [
        {
          title: '充放电效率',
          dataIndex: '充放电效率',
          key: '充放电效率'
        }
      ]
    },
  ]

  const incomeColumns = [
    {
      title: '',
      children: [
        {
          title: '序号',
          dataIndex: '序号',
          key: '序号'
        },
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date'
        }
      ]
    },
    {
      title: '发电收益（元）',
      children: [
        {
          title: '尖电',
          dataIndex: '尖电',
          key: '尖电'
        },
        {
          title: '峰电',
          dataIndex: '峰电',
          key: '峰电'
        },
        {
          title: '平电',
          dataIndex: '平电',
          key: '平电'
        },
        {
          title: '谷电',
          dataIndex: '谷电',
          key: '谷电'
        },
        {
          title: '总计',
          dataIndex: '总计',
          key: '总计'
        }
      ]
    },
  ]

  return (
    <>
      <CardModel
        content={
          <div className={styles.advancedAnalytics} style={{ color: token.titleColor }}>
            <div className={styles.searchHead}>
              <span >{t('报表类型')}:</span>
              <Select
                className={styles.margRL}
                style={{ width: 180 }}
                onChange={ changeWay}
                options={wayOption}
                defaultValue={wayOption[0].value}
              >
              </Select>
              <span >{t('对比日期')}:</span>
              <DatePicker className={styles.margRL}
                style={{ width: 240 }}
                multiple={way === 1 ? false : true}
                maxTagCount={1}
                onChange={(val, str) => changeDate(val, str)}
                defaultValue={date}
                key={way + 1}
                allowClear={false}
                needConfirm
              />
              <Space>
                <Button type="primary" className={styles.firstButton} onClick={()=>setDataChoiceOpen(true)}>
                  {t('数据选择')}
                </Button>
                <Button type="primary" style={{ backgroundColor: token.defaultBg }} >
                  {t('导出')}excel
                </Button>
              </Space>
            </div>
            <div className={styles.echartPart}>
                <div className={styles.echartPartCardwrap}>
                <Row justify="center">
                  <Typography.Title level={3} style={{marginTop:0, marginBottom: 27}}>{dayjs(new Date()).format('YYYY.MM.DD')}{t(wayLabel)}</Typography.Title>
                </Row>
                <div className={styles.content}>
                    <div className={styles.contentItem}>
                      <div style={{marginBottom: 10}}>
                        <Title title={data.baseData.title} />
                      </div>
                      <Descriptions 
                        items={data.baseData.data.map(item => {
                          return {
                            ...item,
                            children: item.data
                          }
                        })}
                      />
                    </div>
                    <div className={styles.contentItem}>
                      <div style={{marginBottom: 10}}>
                        <Title title={data.runData.title} />
                      </div>
                      <Descriptions 
                        items={data.runData.data.map(item => {
                          return {
                            ...item,
                            children: item.data
                          }
                        })}
                      />
                    </div>
                    <div className={styles.contentItem}>
                      <div style={{marginBottom: 10}}>
                        <Title title={data.electricReportData.title} />
                      </div>
                      <Table 
                        columns={electricReportColumns}
                      />
                    </div>
                    <div className={styles.contentItem}>
                      <div style={{marginBottom: 10}}>
                        <Title title={data.incomeData.title} />
                      </div>
                      <Table 
                        columns={incomeColumns}
                      />
                    </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Modal
        open={dataChoiceOpen}
        title={null}
        onOk={async ()=>{
          const values = await form.validateFields();
          console.log(values)
          setDataChoiceOpen(false);
          message.success("提交成功");
        }}
        onCancel={()=>{
          setDataChoiceOpen(false);
        }}
        width={1168}
        className={styles.dataChoiceModal}
      >
        <Form
          form={form}
        >
          {Object.keys(data).map(item => {
            return (
              <div style={{marginBottom: 30}}>
                <div style={{marginBottom: 10}}><Title title={data[item].title} /></div>
                <Descriptions 
                  colon={false}
                  items={data[item].data.map(item => {
                    return {
                      label: (
                        <Form.Item name={item.value} valuePropName='checked' style={{margin: 0}}>
                            <Checkbox />
                        </Form.Item>
                      ),
                      children: item.label
                    }
                  })}
                />
              </div>
            )
          })}
        </Form>
      </Modal>
    </>

  )
}

export default Com