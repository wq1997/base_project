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

  const dataE = [{
    id:1,
    date: '2024-04-08',
    a: 122,
    b: 121,
    c: 99,
    d: 67,
    e: 409,
    f: 119,
    g: 112,
    h: 96,
    i: 66,
    A: 393,
    RA: '96.08%',
  },
  {
    id:2,
    date: '2024-04-09',
    a: 112,
    b: 134,
    c: 109,
    d: 123,
    e: 478,
    f: 109,
    g: 128,
    h: 100,
    i: 120,
    A: 457,
    RA: '95.60%',
  },
  {
    id:3,
    date: '2024-04-10',
    a: 133,
    b: 125,
    c: 130,
    d: 119,
    e: 507,
    f: 129,
    g: 123,
    h: 126,
    i: 113,
    A: 491,
    RA: '96.84%',
  },
];
  const electricReportColumns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date'
        },
    {
      title: '充电量（kWh）',
      children: [
        {
          title: '尖电',
          dataIndex: 'a',
          key: 'a'
        },
        {
          title: '峰电',
          dataIndex: 'b',
          key: 'b'
        },
        {
          title: '平电',
          dataIndex: 'c',
          key: 'c'
        },
        {
          title: '谷电',
          dataIndex: 'd',
          key: 'd'
        },
        {
          title: '总计',
          dataIndex: 'e',
          key: 'e'
        }
      ]
    },
    {
      title: '放电量（kWh）',
      children: [
        {
          title: '尖电',
          dataIndex: 'f',
          key: 'f'
        },
        {
          title: '峰电',
          dataIndex: 'g',
          key: 'g'
        },
        {
          title: '平电',
          dataIndex: 'h',
          key: 'h'
        },
        {
          title: '谷电',
          dataIndex: 'i',
          key: 'i'
        },
        {
          title: '总计',
          dataIndex: 'A',
          key: 'A'
        }
      ]
    },
    {
      title: '',
      children: [
        {
          title: '充放电效率',
          dataIndex: 'RA',
          key: 'RA'
        }
      ]
    },
  ]
  const dataD = [
    {
    id:1,
    date: '2024-04-08',
    a: 118,
    b: 132,
    c: 72,
    d: 88,
    e: 410,
    f: 243,
    g: 263,
    h: 285,
    i: 260,
    A: 1051,
    RA: 641,
  },
  {
    id:2,
    date: '2024-04-09',
    a: 108,
    b: 132,
    c: 129,
    d: 150,
    e: 519,
    f: 243,
    g: 263,
    h: 285,
    i: 260,
    A: 1051,
    RA: 641,
  },
  {
    id:3,
    date: '2024-04-10',
    a: 121,
    b: 111,
    c: 142,
    d: 121,
    e: 495,
    f: 243,
    g: 263,
    h: 285,
    i: 260,
    A: 1051,
    RA: 641,
  },
];
  const incomeColumns = [
  
        
    {
      title: '发电收益（元）',
      children: [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date'
        },
        {
          title: '尖电',
          dataIndex: 'a',
          key: 'a'
        },
        {
          title: '峰电',
          dataIndex: 'b',
          key: 'b'
        },
        {
          title: '平电',
          dataIndex: 'c',
          key: 'c'
        },
        {
          title: '谷电',
          dataIndex: 'd',
          key: 'd'
        },
        {
          title: '总计',
          dataIndex: 'e',
          key: 'e'
        }
      ]
    },
  ]

  return (
    <>
          <div className={styles.advancedAnalytics} style={{ color: token.titleColor,backgroundColor:token.titleCardBgc }}>
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
                        dataSource={dataE}
                        pagination={false}
                      />
                    </div>
                    <div className={styles.contentItem}>
                      <div style={{marginBottom: 10}}>
                        <Title title={data.incomeData.title} />
                      </div>
                      <Table 
                        columns={incomeColumns}
                        dataSource={dataD}
                        pagination={false}

                      />
                    </div>
                </div>
              </div>
            </div>
          </div>
      
      <Modal
        open={dataChoiceOpen}
        title={null}
        onOk={async ()=>{
          const values = await form.validateFields();
          setDataChoiceOpen(false);
          message.success("提交成功");
        }}
        onCancel={()=>{
          setDataChoiceOpen(false);
        }}
        width={1168}
        style={{}}
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