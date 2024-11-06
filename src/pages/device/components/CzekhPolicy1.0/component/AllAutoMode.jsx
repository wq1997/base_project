import React, { useContext, useEffect, useRef, useState } from 'react';
import { Select, Form, InputNumber, Row, Modal, Space, theme, message, Input, Table } from 'antd';
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
    const [cmdTypeId, setCmdTypeId] = useState(7020);
    const [form] = Form.useForm();
    const intl = useIntl();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form1] = Form.useForm();
    const [dataSource1, setDataSource1] = useState([{
        time: '0:00--1:00',
        trueOrFalse: 0,
        index:0
    }, {
        time: '1:00--2:00',
        trueOrFalse: 0,
        index:1

    }, {
        time: '2:00--3:00',
        trueOrFalse: 0,
        index:2

    },
    {
        time: '3:00--4:00',
        trueOrFalse: 0,
        index:3

    }, {
        time: '4:00--5:00',
        trueOrFalse: 0,
        index:4
    },
    {
        time: '5:00--6:00',
        trueOrFalse: 0,
        index:5
    },]);
    const [dataSource2, setDataSource2] = useState([{
        time: '6:00--7:00',
        trueOrFalse: 0,
        align: 'center',
        index:6
    },
    {
        time: '7:00--8:00',
        trueOrFalse: 0,
        align: 'center',   
        index:7
    }, {
        time: '8:00--9:00',
        trueOrFalse: 0,
        align: 'center',   
        index:8
    }, {
        time: '9:00--10:00',
        trueOrFalse: 0,
        align: 'center',   
        index:9
    },
    {
        time: '10:00--11:00',
        trueOrFalse: 0,
        align: 'center',   
        index:10
    }, {
        time: '11:00--12:00',
        trueOrFalse: 0,
        align: 'center',   
        index:11
    },]);
    const [dataSource3, setDataSource3] = useState([
        {
            time: '12:00--13:00',
            trueOrFalse: 0,
            align: 'center',
            index:12
        }, {
            time: '13:00--14:00',
            trueOrFalse: 0,
            align: 'center',
            index:13

        }, {
            time: '14:00--15:00',
            trueOrFalse: 0,
            align: 'center',
            index:14

        }, {
            time: '15:00--16:00',
            trueOrFalse: 0,
            align: 'center',
            index:15

        }, {
            time: '16:00--17:00',
            trueOrFalse: 0,
            align: 'center',
            index:16

        }, {
            time: '17:00--18:00',
            trueOrFalse: 0,
            align: 'center',
            index:17

        },]);
    const [dataSource4, setDataSource4] = useState([{
        time: '18:00--19:00',
        trueOrFalse: 0,
        align: 'center',
        index:18

    }, {
        time: '19:00--20:00',
        trueOrFalse: 0,
        align: 'center',
        index:19

    }, {
        time: '20:00--21:00',
        trueOrFalse: 0,
        align: 'center',
        index:20

    }, {
        time: '21:00--22:00',
        trueOrFalse: 0,
        align: 'center',
        index:21

    },
    {
        time: '22:00--23:00',
        trueOrFalse: 0,
        align: 'center',
        index:22

    }, {
        time: '23:00--00:00',
        trueOrFalse: 0,
        align: 'center',
        index:23

    },]);
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
        historyAllData?.useElec?.map((it,i) => {
            let current=[dataSource1.find(item=>item.index===i),dataSource2.find(item=>item.index===i),dataSource3.find(item=>item.index===i),dataSource4.find(item=>item.index===i)].find(item=>item);
               form.setFieldValue(current.time,it)
        });
        form.setFieldValue(socUpLimit, historyAllData.socUpLimit)
        form.setFieldValue(socLowLimit, historyAllData.socLowLimit)
    }
    const cloums = [{
        title: t('时间'),
        dataIndex: 'time',
        key: 0,
        align: 'center'
    }, {
        title: t('是否允许从电网充电'),
        dataIndex: 'trueOrFalse',
        key: 1,
        align: 'center',
        render: (val,records) => {
            return <Form.Item name={records.time}   rules={[
                {
                    required: true,
                    message:t('请选择是否允许从电网充电')
                },
            ]}>
                <Select
                style={{
                    width: 180,
                }}
                options={[
                    {
                        value: 0,
                        label: t('禁止充电'),
                    },
                    {
                        value: 1,
                        label: t('允许充电'),
                    },

                ]}
            />
            </Form.Item>
            
        }
    }]
    return (
        <div className={styles.manual}>
            <div className={''}>
                <Space style={{ width: '100%' }} direction="vertical" size={30}>
                    <Row justify="end">
                        <div
                            className={styles.selectionBox}
                            style={{ backgroundColor: token.defaultBg, padding: '.3125rem 1.1979rem', cursor: 'pointer' }}
                            onClick={async () => {
                                try {
                                    const values = await form.validateFields();
                                    console.log('Success:', values);
                                    setIsModalOpen(true)
                                  } catch (errorInfo) {
                                    console.log('Failed:', errorInfo);
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
                        <Form.Item
                            label="SOC（%）"
                            style={{
                                marginBottom: 0,
                                lineHeight: '56px'
                            }}
                        >
                            <Form.Item
                                name="socLowLimit"
                                rules={[
                                    {
                                        required: true,
                                        message:t('请输入最小SOC')
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    width: '100px',
                                    marginBottom: 0,

                                }}
                            >
                                <InputNumber placeholder="min" min={0} max={100}/>
                            </Form.Item>
                            ~
                            <Form.Item
                                name="socUpLimit"
                                rules={[
                                    {
                                        required: true,
                                        message:t('请输入最大SOC')
                                    },
                                ]}
                                style={{
                                    display: 'inline-block',
                                    width: '100px',
                                    margin: '0 8px',
                                }}
                            >
                                <InputNumber placeholder="max" min={0} max={100}/>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item  validateTrigger={false} >
                            <Form.Item
                                style={{
                                    display: 'inline-block',
                                    margin: '0 8px',
                                    width: 'calc(25% - 16px)'
                                }}>
                                <Table
                                    columns={cloums}
                                    dataSource={dataSource1}
                                    pagination={false}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{
                                    display: 'inline-block',
                                    margin: '0 8px',
                                    width: 'calc(25% - 16px)'

                                }}>
                                <Table
                                    columns={cloums}
                                    dataSource={dataSource2}
                                    pagination={false}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{
                                    display: 'inline-block',
                                    margin: '0 8px',
                                    width: 'calc(25% - 16px)'
                                }}>
                                <Table
                                    columns={cloums}
                                    dataSource={dataSource3}
                                    pagination={false}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{
                                    display: 'inline-block',
                                    margin: '0 8px',
                                    width: 'calc(25% - 16px)'

                                }}>
                                <Table
                                    columns={cloums}
                                    dataSource={dataSource4}
                                    pagination={false}
                                />
                            </Form.Item>
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
                        let formData=await form.getFieldsValue();
                        if (cmdTypeId == 7020) {
                            let arrHttps = [...dataSource1,...dataSource2,...dataSource3,...dataSource4].map(it => {
                                return formData?.[it?.time]
                            })
                            const values = await form1.validateFields();
                            let { data } = await sendBurCmd2({
                                mode: 2,
                                dtuId,
                                cmdTypeId,
                                password: getEncrypt(publicKey, values.password),
                                useElec:arrHttps,
                                socUpLimit:formData.socUpLimit,
                                socLowLimit:formData.socLowLimit,
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