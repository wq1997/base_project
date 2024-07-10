import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Modal, Form, Input, Select, InputNumber, DatePicker, TimePicker, Col, Row, Button, Table, message } from 'antd';
import { useSelector, useIntl } from "umi";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import dayjs from 'dayjs';
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import { isOverlap,is24HoursInOneDay } from '@/utils/utils'

function Com({ open,
    onChangeOpen,
    form,
    setStrategyTableData,
    title,
    dataSource,
    edit,
    index }) {
    const [disabled, setDisabled] = useState(false);
    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            let flag = values?.contentList?.map((item, index) => {
                let length = values?.contentList?.map((it,i) => {
                    if (index < values?.contentList.length - 1&&i>index) {
                        if (isOverlap(dayjs(item.startTime).format('HH:mm:ss'), dayjs(item.endTime).format('HH:mm:ss'), dayjs(values?.contentList[i].startTime).format('HH:mm:ss'), dayjs(values?.contentList[i].endTime).format('HH:mm:ss'))) {
                            return true
                        } else {
                            return false;
                        }
                    }else{
                        let startTime = parseInt(dayjs(item.startTime).format('HH:mm:ss').split(':')[0] + dayjs(item.startTime).format('HH:mm:ss').split(':')[1] + dayjs(item.startTime).format('HH:mm:ss').split(':')[2])    //900
                        let endTime = parseInt(dayjs(item.endTime).format('HH:mm:ss').split(':')[0] + dayjs(item.endTime).format('HH:mm:ss').split(':')[1] + dayjs(item.endTime).format('HH:mm:ss').split(':')[2])    //1800
                        if (startTime === endTime) {
                            return false
                          }
                    }
                })
               return length.find(it=>it===false)
            });
            if (flag.findIndex(it=>it===false)!==-1) {
                return message.warning(t('时段重叠,请修改'))
            };
            if (!is24HoursInOneDay(values?.contentList)) {
                return message.warning(t('时段不满24小时'))
            };
            if (title == '新增策略') {
                setStrategyTableData(values);
            } else {
                let arr = structuredClone(dataSource)
                arr[index] = { ...values };
                console.log(arr, 'arr');
                edit(arr);
            }
           console.log(is24HoursInOneDay(values?.contentList));
            onChangeOpen(false);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const getColumns = (add, remove) => {
        if (form.getFieldValue('contentList')?.length) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        let model = [];
        if (form.getFieldsValue().controlMode == 1) {
            model = dayAndNight;
        } else {
            model = setTime;
        }
        return [
            {
                title: t('开始时间'),
                dataIndex: 'startTime',
                key: 'startTime',
                render(text, field) {
                    return <Form.Item
                        rules={[{ required: true, message: t('请输入开始时间') }]}
                        name={[field.name, 'startTime']}
                    >
                        <TimePicker placeholder={t('请输入开始时间')} />
                    </Form.Item>
                }
            },
            {
                title: t('结束时间'),
                dataIndex: 'endTime',
                key: 'endTime',
                render(text, field) {
                    return <Form.Item
                        rules={[{ required: true, message: t('请输入结束时间') }]}
                        name={[field.name, 'endTime']}
                    >
                        <TimePicker type='time' placeholder={t('请输入结束时间')} />
                    </Form.Item>
                }
            },
            {
                title: t('时段类型'),
                dataIndex: 'type',
                render(text, field) {
                    return <Form.Item
                        rules={[{ required: true, message: t('请选择时段类型') }]}
                        name={[field.name, 'type']}
                    >
                        <Select options={model} />
                    </Form.Item>
                }
            },
            {
                title: t('功率（kW）'),
                dataIndex: 'power',
                render(text, field) {
                    return <Form.Item
                        rules={[{ required: true, message: t('请输入功率') }]}
                        name={[field.name, 'power']}
                    >
                        <InputNumber placeholder={t('请输入功率')} allowClear />
                    </Form.Item>
                }
            },
            {
                title: t('目标SOC（%）'),
                dataIndex: 'soc',
                render(text, field) {
                    return <Form.Item
                        rules={[{ required: true, message: t('请输入目标SOC') }]}
                        name={[field.name, 'soc']}
                    >
                        <InputNumber placeholder={t('请输入目标SOC')} allowClear />
                    </Form.Item>
                }
            },

            {
                title: t('操作'),
                dataIndex: 'operate',
                className: 'operate',
                width: 120,
                render(text, field) {
                    return (
                        <>
                            <Button type='primary' danger onClick={() => remove(field.name)}>{t('删除')}</Button>
                        </>
                    )
                }
            }
        ]
    }
    const handleCancel = () => {
        onChangeOpen(false)
    }
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const dayAndNight = [
        {
            label: t('白天'),
            value: 1
        },
        {
            label: t('黑夜'),
            value: 2
        },];
    const setTime = [{
        label: t('待机'),
        value: 3
    },
    {
        label: t('关机'),
        value: 4
    },
    {
        label: t('充电'),
        value: 5
    },
    {
        label: t('放电'),
        value: 6
    },]

    const Style = useEmotionCss(({ token }) => {
        return {
            '.ant-modal-title': {
                fontFamily: 'PingFangRegular !important',
                borderLeft: `5px solid ${token.colorPrimary}`,
                paddingLeft: '8px',
                fontSize: '18px'
            },
            '.ant-modal-content': {
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
            },
            '.ant-form-item': {
                marginBottom: '0px'
            }
        }
    });
    useEffect(() => {

    }, [form.getFieldValue('contentList')?.length])
    return (
        <Modal
            title={t(title)}
            open={open}
            onOk={onFinish}
            onCancel={handleCancel}
            className={Style}
            width={'50%'}
        > <Form
            form={form}
            name="addPolicy"

        >
                <div >
                    <Row gutter={[48, 24]}>
                        <Col span={12} >
                            <Form.Item label={t("策略名称")} labelCol={{ span: 5 }} name="planName" rules={[FORM_REQUIRED_RULE]}>
                                <Input placeholder={t("请输入策略名称")} style={{ maxWidth: 320, width: '60%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label={t("策略编号")} labelCol={{ span: 5 }} name="planNo" rules={[FORM_REQUIRED_RULE]}>
                                <Input placeholder={t("请输入策略编号")} disabled={true} style={{ maxWidth: 320, width: '60%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label={t("开始日期")} labelCol={{ span: 5 }} name="startDate" rules={[FORM_REQUIRED_RULE]}>
                                <DatePicker format={'MM-DD'} placeholder={t("请输入开始日期")} style={{ width: '60%', }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label={t("结束日期")} labelCol={{ span: 5 }} name="endDate" rules={[FORM_REQUIRED_RULE]}>
                                <DatePicker format={'MM-DD'} placeholder={t("请输入结束日期")} style={{ maxWidth: 320, width: '60%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label={t("模式")} labelCol={{ span: 5 }} name="controlMode" rules={[FORM_REQUIRED_RULE]}>
                                <Select placeholder={t("请选择模式")} disabled={disabled} options={[{ value: 1, label: '白天-黑夜' }, { value: 2, label: '定时充放' },]} style={{ maxWidth: 320, width: '60%' }} />
                            </Form.Item>
                        </Col>

                    </Row>

                </div>

                <Form.List name='contentList'  >
                    {(fields, { add, remove }) => {
                        // 将Table视为 Form.List 中循环的 Form.Item
                        return (
                            <>
                                <Button type='primary' style={{ marginBottom: '24px', marginTop: '20px' }} onClick={() => add()} >{t('时段新增')}</Button>
                                <Table
                                    dataSource={fields}
                                    columns={getColumns(add, remove)}
                                    rowKey='key'
                                    pagination={false}
                                />
                            </>

                        )
                    }}
                </Form.List>


            </Form>

        </Modal>
    )
}

export default Com