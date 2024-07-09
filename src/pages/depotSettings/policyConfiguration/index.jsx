
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Add from './components/addPolicy';
import styles from './index.less'
import { theme, Input, Space, Select, Form, message, Button, Table, Popconfirm } from "antd";
import dayjs from 'dayjs';
import { useSelector, useIntl } from "umi";
import { getGridPointList, } from '@/services/plant'
import { getStrategyInfo, saveStrategy } from '@/services/policy'
const { Option } = Select;
function Com(props) {
  const [seletOption, setSelectOption] = useState([]);
  const [gridId, setGridId] = useState();
  const [currentGrid, setCurrentGrid] = useState();
  const { token } = theme.useToken();
  const [title, setTitle] = useState('新增策略');
  const [form] = Form.useForm();
  const [form6] = Form.useForm(); // 策略详情
  const [editPlanOpen, setEditPlanOpen] = useState(false); // 策略详情
  const [currentIndex, setCurrentIndex] = useState(); // 策略Id
  const [detailsData, setDetailsData] = useState(); // 策略详情
  useEffect(() => {
    getInit();
  }, []);

  useEffect(() => {
    getDetails();
  }, [gridId])
  const intl = useIntl();
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }
  const [strategyTableData, setStrategyTableData] = useState([]);


  const getDetails = async () => {
    let { data } = await getStrategyInfo({ gridPointId: gridId });
    setDetailsData(data?.data);
    form.setFieldsValue(data?.data);
    if (data?.data?.planList) {
      setStrategyTableData(data?.data?.planList)
    }
  }
  const edit = (val, index) => {
    form6.setFieldsValue(val);
    let arr = [];
    val?.contentList?.map(it => {
      let startTime = dayjs(it?.startTime, 'HH:mm:ss');
      let endTime = dayjs(it?.endTime, 'HH:mm:ss');
      arr.push({ ...it, startTime, endTime });
    })
    form6.setFieldValue('startDate', dayjs(val.startDate));
    form6.setFieldValue('endDate', dayjs(val.endDate));
    form6.setFieldValue('contentList', arr);
    setCurrentIndex(index)
    setTitle('编辑策略');
    setEditPlanOpen(true);
  }
  const getInit = async () => {
    let { data } = await getGridPointList({ plantId: localStorage.getItem('plantId') });
    let arr = [];
    data?.data?.map(it => {
      arr.push({
        label: it.gridPointName,
        value: it.id,
        ...it
      })
    })
    setSelectOption([...arr]);
    setGridId(arr[0]?.value);
    setCurrentGrid(arr[0]);
    form.setFieldValue('gridPointId', arr[0]?.value)

  }
  const changeGrid = (val) => {
    setCurrentGrid(
      seletOption.find(it => it.value == val)
    )
    setGridId(val);
    form.setFieldValue('gridPointId', val)
  }
  const saveAll = async () => {
    try {
      form.setFieldValue('planList', strategyTableData);
      const values = await form.validateFields();
      values?.planList?.map(item => {
        item.startDate = dayjs(item.startDate).format('MM-DD');
        item.endDate = dayjs(item.endDate).format('MM-DD');
        item?.contentList?.map(it => {
          if (typeof it.startTime==='string') {
            it.startTime = dayjs(it.startTime).format('HH:mm:ss');
          it.endTime = dayjs(it.endTime).format('HH:mm:ss');
          }
          
        })
      })
      let { data } = await saveStrategy(values);
      if (data?.data) {
        message.success(t('保存成功'));
      } else {
        message.error(data.msg)
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const del = (record) => {
    const newData = strategyTableData.filter((item) => item?.planNo !== record?.planNo);
    setStrategyTableData(newData);
  }


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Form
        form={form}
        name="policy"
        className={styles.contents}
      >
        <Space className={styles.hearder} direction="vertical" style={{ width: '100%', backgroundColor: token.titleCardBgc, padding: '20px 25px 0 0px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '40px' }}>
            <Form.Item
              name="gridPointId"
              label={t("并网点")}
              style={{ width: '25%' }}
              rules={[
              ]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
            >
              <Select
                key={seletOption[0]?.value}
                defaultValue={seletOption[0]?.value}
                onChange={changeGrid}
              >
                {seletOption && seletOption.map(item => {
                  return (<Option key={item.value} value={item.value}>{item.label}</Option>);
                })
                }
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 12,
                span: 12,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={saveAll}>
                {t('保存全部')}
              </Button>
            </Form.Item>
          </div>


          <div className={styles.headBottom}>
            <Form.Item
              name="transCap"
              label={t("变压器容量")}
              style={{ width: '100%' }}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[
              ]}
            >
              <Input disabled={true} />
            </Form.Item>
            <Form.Item
              name="transProtectPercent"
              label={t("变压器容量保护比例")}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input disabled={true} />
            </Form.Item>
            <Form.Item
              name="powerMode"
              label={t("功率下发模式")}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Select
                options={[
                  { label: '平均功率', value: 1 },
                  { label: 'SOC动态平衡', value: 2 },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="loopInterval"
              label={t("策略运行周期") + '（ms）'}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input />
            </Form.Item>
          </div>
        </Space>

        <div className={styles.content} style={{ backgroundColor: token.titleCardBgc, borderRadius: '8px' }}>
          <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Button type="primary" style={{ marginBottom: '10px' }} onClick={() => {
              setEditPlanOpen(true);
              setTitle('新增策略');
              let No = Math.floor(Math.random() * 1000 + 1);

              if (strategyTableData?.find(it => it.planNo == No)) {
                form6.setFieldsValue({
                  planName: '',
                  planNo: Math.floor(Math.random() * 1000 + 1),
                  startDate: dayjs(new Date()),
                  endDate: dayjs(new Date()),
                  controlMode: 1,
                  contentList: []
                })
              } else {
                form6.setFieldsValue({
                  planName: '',
                  planNo: No,
                  startDate: dayjs(new Date()),
                  endDate: dayjs(new Date()),
                  controlMode: 1,
                  contentList: []
                })
              };


            }}>{t('新增策略')}</Button>
          </div>
          <Form.Item
            name="planList"
          >
            <Table
              columns={[
                {
                  title: t('编号'),
                  dataIndex: 'planNo',
                  key: 'planNo',
                  // render: (text, record, index) => index + 1,
                },
                {
                  title: t('策略名称'),
                  dataIndex: 'planName',
                  key: 'planName',
                },
                {
                  title: t('开始时间'),
                  dataIndex: 'startDate',
                  key: 'startDate',
                  render: (text, record) => {
                    return dayjs(record.startDate).format('MM-DD')
                  }
                },
                {
                  title: t('结束时间'),
                  dataIndex: 'endDate',
                  key: 'endDate',
                  render: (text, record) => {
                    return dayjs(record.endDate).format('MM-DD')
                  }
                },
                {
                  title: t('模式'),
                  dataIndex: 'controlMode',
                  key: 'controlMode',
                  render: (text, record) => {
                    let label = [{ value: 1, label: '白天-黑夜' }, { value: 2, label: '定时充放' },].find(it => it.value == record.controlMode)?.label
                    return label
                  }
                },
                {
                  title: t('操作'),
                  dataIndex: 'option',
                  key: 'option',
                  render: (text, record, index) => {
                    return (
                      <Space>
                        <Button type="link" onClick={() => edit(record, index)}>{t('编辑')}</Button>
                        <Button type="link" onClick={() => edit(record, index)}>{t('详情')}</Button>
                        <Popconfirm title="Are you sure delete this task?" onConfirm={() => del(record)} okText="Yes" cancelText="No">
                          <Button type="link" danger>{t('删除')}</Button>
                        </Popconfirm>
                      </Space>
                    )
                  }
                },
              ]}
              dataSource={strategyTableData}
            />
          </Form.Item>
        </div>
      </Form>
      <Add
        form={form6}
        open={editPlanOpen}
        title={title}
        onChangeOpen={(value) => {
          setEditPlanOpen(value);
        }}
        dataSource={strategyTableData}
        index={currentIndex}
        setStrategyTableData={(val) => setStrategyTableData([...strategyTableData, val])}
        edit={(val) => setStrategyTableData([...val])}
      />

    </div>
  )
}

export default Com