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
let dataMidst=JSON.parse(JSON.stringify(data));

function Com() {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [way, setWay] = useState(0);
  const [wayLabel, setWayLabel] = useState('日报表');
  const [picker, setPicker] = useState('date'); 
  const [date, setDate] = useState(dayjs(new Date()));
  const [dateStr, setDateStr] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [dataChoiceOpen, setDataChoiceOpen] = useState(false); //数据选择弹框
  const [modelData, setModelData] = useState([]);
  const [allData, setAllData] = useState({});
  const [currentModel, setCurrentModel] = useState([]);
  const [currentFormat, setCurrentFormat] = useState('YYYY-MM-DD');

  const intl = useIntl();
  const wayOption = [{
    label: '日报表',
    value: 0,
  },
  {
    label: '周报表',
    value: 1,
  },
  {
    label: '月报表',
    value: 2,
  },
  {
    label: '年报表',
    value: 3,
  },
  {
    label: '总报表',
    value: 4,
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
  }, [token, way, dataChoiceOpen,date]);
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
    console.log(dayjs(date).format('YYYY-MM-DD'), 111111);
  }, [way])

  const getInitData = async () => {
    let { data: reqData } = await getExportReportList({
      plantId: localStorage.getItem('plantId'),
      type: way,
    });
    setModelData(reqData.data);
    let obj = {};
    reqData?.data.map(it => {
      it.children?.map(item => {
        obj[item.value] = item.state;
      })
    });
    console.log(data.baseData.data, obj, 111111);
    dataMidst.baseData.data = delBaseData(data.baseData.data, obj);
    dataMidst.runData.data = delBaseData(data.runData.data, obj);
    form.setFieldsValue({ ...obj });
    setCurrentModel({ ...obj });
    console.log(data.baseData.data, obj, 22222);
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
              {t('导出')}excel
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
                  <Title title={dataMidst.baseData.title} />
                </div>
                {Object.keys(currentModel).length && <Descriptions
                  items={dataMidst.baseData?.data.map(item => {
                    return {
                      ...item,
                      children: allData?.plant?.[item?.value]
                    }
                  })}
                />}
              </div>
              <div className={styles.contentItem}>
                <div style={{ marginBottom: 10 }}>
                  <Title title={dataMidst.runData.title} />
                </div>
                {Object.keys(currentModel).length && <Descriptions
                  items={dataMidst.runData.data.map(item => {
                    return {
                      ...item,
                      children: allData?.run?.[item.value]
                    }
                  })}
                />}
              </div>
              <div className={styles.contentItem}>
                <div style={{ marginBottom: 10 }}>
                  <Title title={dataMidst.electricReportData.title} />
                </div>
                {Object.keys(energy).map((it,i) => {
                  return (
                    <>
                      {
                        currentModel[it] && <Table
                          columns={energy[it]}
                          dataSource={allData?.reportData?.[i]}
                          pagination={false}
                        />
                      }
                    </>
                  )
                })}

              </div>
              <div className={styles.contentItem}>
                <div style={{ marginBottom: 10 }}>
                  <Title title={data.incomeData.title} />
                </div>
                {Object.keys(inCome).map((it,i)=> {
                  return (
                    <>
                      {
                        currentModel[it] && <Table
                          columns={inCome[it]}
                          dataSource={allData?.reportData?.[i]}
                          pagination={false}
                        />
                      }
                    </>
                  )
                })}
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
          {modelData.map(item => {
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