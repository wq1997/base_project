// 函数组件
// 快捷键Ctrl+Win+i 添加注释
import React, { useState, useEffect, } from 'react';
import { theme, Select, DatePicker, Button, message, Row, Typography, Descriptions, Space, Modal, Form, Checkbox, Table, } from "antd";
import styles from './index.less'
import { CardModel, Title } from "@/components";
import dayjs from 'dayjs';
import { useIntl } from "umi";
import { data, inCome, energy } from "./data";
import { getExportReportList, getDtuReport, exportReport, updateReportTemplate } from "@/services/report";

function Com() {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [way, setWay] = useState(0);
  const [wayLabel, setWayLabel] = useState('日统计报表');
  const [picker, setPicker] = useState('date');
  const [date, setDate] = useState(dayjs(new Date()));
  const [dateStr, setDateStr] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [dataChoiceOpen, setDataChoiceOpen] = useState(false); //数据选择弹框
  const [modelData, setModelData] = useState([]);
  const [allData, setAllData] = useState({});
  const [currentModel, setCurrentModel] = useState([]);
  const [currentFormat, setCurrentFormat] = useState('YYYY-MM-DD');
  const [runClum, setRunClum] = useState([]);
  const [pcsClum, setPcsClum] = useState([]);
  const [bmsClum, setBmsClum] = useState([]);

  const intl = useIntl();
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }
  const wayOption = [{
    label: t('日统计报表'),
    value: 0,
  },
  {
    label: t('周统计报表'),
    value: 1,
  },
  {
    label: t('月统计报表'),
    value: 2,
  },
  {
    label: t('年统计报表'),
    value: 3,
  },
  {
    label: t('总报表'),
    value: 4,
  },
  ]

  const run = [

    {
      title: t('时间'),
      dataIndex: 'date',
      key: 'date',
      align:'center'

    },
    {
      title: `${t('充电电量')}（kWh）`,
      dataIndex: 'charge',
      key: 'charge',
      align:'center'

    },
    {
      title:`${t('放电电量')}（kWh）`,
      dataIndex: 'discharge',
      key: 'discharge',
      align:'center'

    },
    {
      title: `${t('充放电效率')}（%）`,
      dataIndex: 'efficiency',
      key: 'efficiency',
      align:'center'

    },
  ]

  const pRun = [
    {
      title: t('储能单元名称'),
      dataIndex: 'date',
      key: 'date',
      align:'center'
    
    },
    {
      title: t('储能单元编号'),
      dataIndex: 'devNo',
      key: 'pcsNo',
      align:'center'

    },
    {
      title: `${t('充电电量')}（kWh）`,
      dataIndex: 'charge',
      key: 'pcsCharge',
      align:'center'

    },
    {
      title:`${t('放电电量')}（kWh）`,
      dataIndex: 'discharge',
      key: 'pcsDischarge',
      align:'center'

    },

  ];
  const bRun = [
    {
      title: t('储能单元名称'),
      dataIndex: 'date',
      key: 'date',
      align:'center'
    
    },
    {
      title: t('储能单元编号'),
      dataIndex: 'devNo',
      key: 'bmsNo',
      align:'center'

    },
    {
      title: `${t('充电电量')}（kWh）`,
      dataIndex: 'charge',
      key: 'bmsCharge',
      align:'center'

    },
    {
      title:`${t('放电电量')}（kWh）`,
      dataIndex: 'discharge',
      key: 'bmsDischarge',
      align:'center'

    },

  ]
  useEffect(() => {
    getInitData();
  }, [token, way, dataChoiceOpen, date,]);
  useEffect(() => {
    if (way == 0) {
      setPicker('date');
      setCurrentFormat('YYYY-MM-DD')
    } else if (way == 1) {
      setPicker('date');
      setCurrentFormat('YYYY-MM-DD')
    } else if (way == 2) {
      setCurrentFormat('YYYY-MM')
      setPicker('month')
    } else if (way == 3) {
      setCurrentFormat('YYYY')
      setPicker('year')
    };
  }, [way])

  const getInitData = async () => {
    let { data: reqData } = await getExportReportList({
      plantId: localStorage.getItem('plantId'),
      type: way,
    });
    setModelData(reqData?.data);
    let obj = {};
    reqData?.data?.map(it => {
      it?.children?.map(item => {
        obj[item.value] = item.state;
      })
    });

    data.baseData.data = delBaseData(data.baseData.data, obj);
    data.runData.data = delBaseData(data.runData.data, obj);
    form.setFieldsValue({ ...obj });
    setCurrentModel({ ...obj });
    let arr = run?.filter(it => {
      if (obj?.[it?.key]) {
        return it
      } 
    });

    setRunClum([...arr]);
    setPcsClum(pRun?.filter(it => {
      if (obj?.[it?.key]) {
        return it
      } 
    }));
    setBmsClum(bRun?.filter(it => {
      if (obj?.[it?.key]) {
        return it
      } 
    }))
    let currentDate = dayjs(date).format(currentFormat);
    let { data: allData } = await getDtuReport({
      plantId: localStorage.getItem('plantId'),
      type: way,
      date: currentDate,
    });

    setAllData(allData?.data);
  }
  const delBaseData = (base, data) => {
    let arr = [];
    base.map(it => {
      if (data?.[it?.value]) {
        arr.push(it)
      }
    });
    return arr
  }
  const exportData = async () => {
    let res = await exportReport({
      plantId: localStorage.getItem('plantId'),
      type: way,
      date: dayjs(date).format(currentFormat),
    });
    let blob = res?.data;
    let content = [];
    content.push(blob);
    // new Blob 实例化文件流
    const blobData = new Blob(content);
    const url = window.URL.createObjectURL(blobData)
    const link = document.createElement('a')
    link.style.display = "none"
    link.href = url
    // fileName 文件名后缀记得添加
    link.setAttribute('download', `${wayLabel}.xls`)
    document.body.appendChild(link)
    link.click()
    //下载完成移除元素
    document.body.removeChild(link)
    //释放掉blob对象
    window.URL.revokeObjectURL(url)
  }
  const changeWay = (val, label) => {
    setWay(val);
    setWayLabel(label?.label);
  }
  const changeDate = (val, str) => {
    setDateStr(str);
    setDate(dayjs(val).format());
  }
  return (
    <>
      <div className={styles.advancedAnalytics} style={{ color: token.titleColor, backgroundColor: token.titleCardBgc }}>
        <div className={styles.searchHead}>
          <span >{t('报表类型')}:</span>
          <Select
            className={styles.margRL}
            style={{ width: 180 }}
            onChange={changeWay}
            options={wayOption}
            defaultValue={wayOption[0].value}
          >
          </Select>
          <span >{t('对比日期')}:</span>
          <DatePicker className={styles.margRL}
            style={{ width: 240 }}
            picker={picker}
            maxTagCount={1}
            onChange={(val, str) => changeDate(val, str)}
            defaultValue={date}
            key={way + 1}
            allowClear={false}
            needConfirm
          />
          <Space>
            <Button type="primary" className={styles.firstButton} onClick={() => setDataChoiceOpen(true)}>
              {t('数据选择')}
            </Button>
            <Button type="primary" style={{ backgroundColor: token.defaultBg }} onClick={exportData}>
              {t('导出')}Excel
            </Button>
          </Space>
        </div>
        <div className={styles.echartPart}>
          <div className={styles.echartPartCardwrap}>
            <Row justify="center">
              <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 27 }}>{dayjs(new Date()).format('YYYY.MM.DD')}{t(wayLabel)}</Typography.Title>
            </Row>
            <div className={styles.content}>
              <div className={styles.contentItem}>
                <div style={{ marginBottom: 10 }}>
                  <Title title={t('运行数据')} />
                </div>
                <Table
                  columns={runClum}
                  dataSource={allData?.runEnergy}
                  pagination={false}
                  scroll={{y:300}}
                />
              </div>
              <div className={styles.contentItem}>
                <div style={{ marginBottom: 10 }}>
                  <Title title={t('PCS运行指标')} />
                </div>
                <Table
                  columns={pcsClum}
                  dataSource={allData?.pcsEnergy}
                  pagination={false}
                  scroll={{y:300}}

                />
              </div>
              <div className={styles.contentItem}>
                <div style={{ marginBottom: 10 }}>
                  <Title title={t('BMS运行指标')} />
                </div>
                <Table
                  columns={bmsClum}
                  dataSource={allData?.bmsEnergy}
                  pagination={false}
                  scroll={{y:300}}

                />

              </div>
         
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={dataChoiceOpen}
        title={null}
        onOk={async () => {
          const values = await form.validateFields();
          Object.keys(values).map(it => {
            if (!values[it]) {
              delete values[it]
            }
          })
          let { data } = await updateReportTemplate({
            plantId: localStorage.getItem('plantId'),
            type: way,
            fields: Object.keys(values)
          });
          // setCurrentModel(Object.keys(values));
          setDataChoiceOpen(false);
          message.success("提交成功");
        }}
        onCancel={() => {
          setDataChoiceOpen(false);
        }}
        width={1168}
        style={{}}
        className={styles.dataChoiceModal}
      >
        <Form
          form={form}
        >
          {modelData?.map(item => {
            return (
              <div style={{ marginBottom: 30 }}>
                <div style={{ marginBottom: 10 }}><Title title={item?.label} /></div>
                <Descriptions
                  colon={false}
                  items={item?.children?.map(it => {
                    return {
                      label: (
                        <Form.Item name={it.value} valuePropName='checked' style={{ margin: 0 }}>
                          <Checkbox />
                        </Form.Item>
                      ),
                      children: it.label
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