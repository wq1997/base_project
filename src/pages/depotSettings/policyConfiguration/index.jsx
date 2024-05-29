
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Strategy } from '@/components';
import { CardModel } from "@/components";
import Detail from '@/components/FullCalendar/newStrategy/detail';
import styles from './index.less'
import { theme, Input, Space, Select, Form, message,Button, Table } from "antd";
import dayjs from 'dayjs';
import { useSelector, useIntl } from "umi";
import { getGridPointList, getStrategyPlanList, getStrategyList, getStrategyInfo, saveStrategyPlan, deleteStrategy, } from '@/services/policy'
const { Option } = Select;
function Com(props) {
  const [seletOption, setSelectOption] = useState([]);
  const [gridId, setGridId] = useState();
  const [currentGrid, setCurrentGrid] = useState();
  const { token } = theme.useToken();
  const [date, setDate] = useState(new Date());
  const [form] = Form.useForm();
  const [form6] = Form.useForm(); // 策略详情
  const [editPlanOpen, setEditPlanOpen] = useState(false); // 策略详情
  const [strategyId, setStrategyId] = useState(); // 策略Id
  const [detailsData, setDetailsData] = useState(); // 策略详情
  const [planList, setPlanList] = useState([]); // 日程列表

  useEffect(() => {
    getInit();
  }, []);
  useEffect(() => {
    getDetails();
  }, [strategyId]);
  useEffect(() => {
    if (seletOption?.length) {
      getStrategy();
    }
  }, [gridId])
  const onSelect = (value, mode) => {
    setDate(value)
  };
  const intl = useIntl();
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }
  const [strategyTreeData, setStrategyTreeData] = useState([
    {
      title: '我的策略',
      key: '0-0',
      selectable: false,
      children: [
      ],
    },
  ]);
  

  const getDetails = async () => {
    let { data } = await getStrategyInfo({ strategyId });
    setDetailsData(data?.data)
  }
 
  const getInit = async () => {
    let { data } = await getGridPointList({ plantId: localStorage.getItem('plantId') });
    let arr = [];
    data?.data.map(it => {
      arr.push({
        label: it.gridPointName,
        value: it.id,
        ...it
      })
    })
    setSelectOption([...arr]);
    setGridId(arr[0]?.value);
    setCurrentGrid(arr[0]);
  }
  const changeGrid = (val) => {
    setCurrentGrid(
      seletOption.find(it => it.value == val)
    )
    setGridId(val);
  }

  const getPlanList = async (model) => {
    let { data } = await getStrategyPlanList({ gridPointId: gridId });
    let arr = [];
    data.data?.map((it, index) => {
      let i = model.findIndex(item => item.strategyId == it.strategyId)
      arr.push({
        id: it.planId,
        strategyId: it.strategyId,
        title: it.strategyName,
        remarks: it.remarks,
        allDay: true,
        start: dayjs(it.startDate).format('YYYY-MM-DD'),
        end: dayjs(it.endDate).add(1, 'day').format('YYYY-MM-DD'),
        color: token.chartLineColor[i]
      });
      console.log(dayjs(it.endDate).add(1, 'day').format('YYYY-MM-DD'));
    });
    setPlanList([...arr]);

  }
  const getStrategy = async () => {
    let { data } = await getStrategyList({ gridPointId: gridId });
    let arr = [];
    data.data.map((it, i) => {
      arr.push({
        ...it, title: it.strategyName, key: `0-0-${i}`
      })
    })
    setStrategyTreeData([{ ...strategyTreeData[0], children: [...arr] }]);
    getPlanList(arr);
  }
  const delStrategy = async (val) => {
    let { data } = await deleteStrategy({ strategyId: val?.strategyId });
    if (data.code == '200') {
      message.success(t('删除成功'), 2);
      getStrategy();

    } else {
      message.error(t(data.msg), 2);

    }
  }
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Form
        form={form}
        name="policy"
        className={styles.contents}
      >
        <Space className={styles.hearder} direction="vertical" style={{ width: '100%', backgroundColor: token.titleCardBgc, padding: '20px 25px 0 0px', borderRadius: '8px' }}>
          <Form.Item
            name="ef"
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
          <div className={styles.headBottom}>
            <Form.Item
              name="ab"
              label={t("变压器容量")}
              style={{ width: '100%' }}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[

              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="bc"
              label={t("变压器容量保护比例")}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="cd"
              label={t("功率下发模式")}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Select
                options={[
                  { label: '平均功率', value: 0 },
                  { label: 'SOC动态平衡', value: 1 },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="bc"
              label={t("策略运行周期") + '（ms）'}
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
            >
              <Input />
            </Form.Item>
          </div>
        </Space>

        <div className={styles.content} style={{ backgroundColor: token.titleCardBgc, borderRadius: '8px' }}>
                <Button>{t('新增策略')}</Button>
                <Form.Item
                  name="tb"
                 >
                  <Table
                  columns={[
                    {
                      title: t('编号'),
                      dataIndex: 'num',
                      key: 'num',
                      render: (text, record, index) => index + 1,
                    },
                    {
                      title: t('策略名称'),
                      dataIndex: 'name',
                      key: 'name',
                    },
                    {
                      title: t('开始时间'),
                      dataIndex: 'start',
                      key: 'start',
                    },
                    {
                      title: t('结束时间'),
                      dataIndex: 'end',
                      key: 'end',
                    },
                    {
                      title: t('模式'),
                      dataIndex: 'action',
                      key: 'action',
                    },
                    {
                      title: t('操作'),
                      dataIndex: 'option',
                      key: 'option',
                      render: (text, record) => {
                        return (
                            <Space>
                                <Button type="link" onClick={() => edit(record)}>{t('编辑')}</Button>
                                <Button type="link" onClick={() => edit(record)}>{t('详情')}</Button>
                                <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
                                <Button type="link" danger onClick={() => changeIsOpenDel(record)}>{t('删除')}</Button>
                                </Popconfirm>
                            </Space>
                        )
                    }
                    },
                  ]}
                  />
                </Form.Item>
        </div>
        <div className={styles.bottom}>
          <Form.Item
            wrapperCol={{
              offset: 12,
              span: 12,
            }}
          >
            <Button type="primary" htmlType="submit">
              {t('保存')}
            </Button>
          </Form.Item>

        </div>

      </Form>
      <Detail
        form={form6}
        open={editPlanOpen}
        detailsData={detailsData}
        onChangeOpen={(value) => {
          setEditPlanOpen(value);
        }}
      />

    </div>
  )
}

export default Com