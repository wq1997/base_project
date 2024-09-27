import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, InputNumber, Row, Modal, Space, theme, message, Input, Flex } from 'antd';
import { useSelector, useIntl, history } from "umi";
import styles from './index.less'
import { Title, EditTable, ButtonGroup } from "@/components";
import { sendBurCmd2 } from '@/services/policy'
import { getEncrypt, } from "@/utils/utils";
import { FORM_REQUIRED_RULE, } from "@/utils/constants";
import {
  getPublicKey as getPublicKeySever,
} from "@/services/user";

const App = ({ devId, dtuId, historyAllData }) => {
  const { token } = theme.useToken();
  // const [dataSource, setDataSource] = useState();
  // const [rangePower, setRangePower] = useState(0);
  const [cmdTypeId, setCmdTypeId] = useState(0);
  const [durationList, setDurationList] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [form] = Form.useForm();
  const intl = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form1] = Form.useForm();
  const t = (id) => {
    const msg = intl.formatMessage(
      {
        id,
      },
    );
    return msg
  }

  useEffect(() => {
    initData();
  }, [historyAllData])

  const initData = () => {
    // form.setFieldsValue({
    //   durationList:historyAllData?.policyDurationList1
    // })
    historyAllData?.policyDurationList1.map(it=>{
     let startHour= it.startHour<10?`0${it.startHour}`:`${it.startHour}`
     let startMin= it.startMin<10?`0${it.startMin}`:`${it.startMin}`
     let endHour= it.endHour<10?`0${it.endHour}`:`${it.endHour}`
     let endMin= it.endMin<10?`0${it.endMin}`:`${it.endMin}`
      it.timeStramp=`${startHour}:${startMin}~${endHour}:${endMin}`
    });
    setDurationList(historyAllData?.policyDurationList1)
  }

  return (
    <div className={styles.manual}>
      <div className={''}>
        <Space style={{ width: '100%' }} direction="vertical" size={30}>
          <Row justify="end">
            <div
              className={styles.selectionBox}
              style={{ backgroundColor: token.defaultBg, padding: '.3125rem 1.1979rem', cursor: 'pointer' }}
              onClick={async () => {
                const { durationList } = await form.getFieldsValue("durationList");
                if (durationList && durationList?.length > 0) {
                  setDurationList(durationList);
                  setIsModalOpen(true);
                  setCmdTypeId(7005);
                } else {
                  message.error(intl.formatMessage({ id: '请至少添加一条策略' }))
                }
              }}
            >
              {intl.formatMessage({ id: '下发' })}
            </div>
          </Row>
          <Form
            form={form}
            colon={false}
            initialValues={{
              mode: 'Custom'
            }}
          >
            <Form.Item name="durationList" validateTrigger={false} rules={[{ ...FORM_REQUIRED_RULE }]}>
              <EditTable.EditRowTable
                showAdd={true}
                showClear={true}
                showEdit={true}
                showDelete={true}
                data={durationList}
                columns={[
                  {
                    title: `${intl.formatMessage({ id: '开始时间' })}~${intl.formatMessage({ id: '结束时间' })}`,
                    dataIndex: 'timeStramp',
                    editable: true,
                    inputType: 'CustomDatePicker',
                  },

                  {
                    title: intl.formatMessage({ id: '充放电类型' }),
                    dataIndex: 'action',
                    editable: true,
                    inputType: 'Select',
                    options: [
                      { value: 3, label: intl.formatMessage({ id: '充电' }) },
                      { value: 1, label: intl.formatMessage({ id: '放电' }) },
                      { value: 2, label: intl.formatMessage({ id: '待机' }) },
                    ]
                  },
                  {
                    title: `${intl.formatMessage({ id: '功率' })}(kW)`,
                    dataIndex: 'pcsPower',
                    editable: true,
                    inputType: 'InputNumber',
                  },
                  {
                    title: intl.formatMessage({ id: 'SOC(%)' }),
                    dataIndex: 'targetSoc',
                    editable: true,
                    inputType: 'InputNumber',
                  },
                ]}
                correlationList={['timeType', 'elePrice']}
                maxLength={24}
                tabValue={tabValue}
                onChangeTabs={value => {
                  setTabValue(value);
                }}
              />
            </Form.Item>
          </Form>
        </Space>
      </div>
      <Modal
        open={isModalOpen}
        title={<Title title={t("自动模式下发")} />}
        onOk={async () => {
          const publicKeyRes = await getPublicKeySever();
          if (publicKeyRes?.data) {
            const publicKey = publicKeyRes?.data;
            if (cmdTypeId == 7005) {
            let policyDurationList1=  durationList.map(it=>{
                  return{
                    action:it.action,
                    targetSoc:it.targetSoc,
                    pcsPower:it.pcsPower,
                    startHour:it?.timeStramp?.split('~')?.[0]?.split(':')?.[0],
                    endHour:it?.timeStramp?.split('~')?.[1]?.split(':')?.[0],
                    startMin:it?.timeStramp?.split('~')?.[0]?.split(':')?.[1],
                    endMin:it?.timeStramp?.split('~')?.[1]?.split(':')?.[1],
                  }
              })
              if (policyDurationList1.length>24) {
                message.error(intl.formatMessage({ id: '最多添加24条数据' }))
                return
              }
              const values = await form1.validateFields();
              let { data } = await sendBurCmd2({
                mode: 1,
                dtuId,
                cmdTypeId,
                devId: devId.pcsDevId,
                password: getEncrypt(publicKey, values.password),
                policyDurationList1
              });
              if (data.code == 'ok') {
                message.success(t('命令下发成功'));
                setIsModalOpen(false)
              } else {
                message.warning(data?.msg);
              }

            }
          }
        }
        }
        onCancel={() => {
          setIsModalOpen(false);
          form1.resetFields();
        }}
      >
        <Form
          form={form1}
          style={{ marginTop: '1.667rem' }}
        >
          <Form.Item name={"password"} label={t("请输入密码")} rules={[FORM_REQUIRED_RULE]}>
            <Input className="pwd" placeholder={t("请输入密码")} />
          </Form.Item>
          <span style={{ marginLeft: '0.5028rem' }}>{t('确定下发自动模式指令吗？')}</span>
        </Form>
      </Modal>

    </div>
  );
};
export default App;