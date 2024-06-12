import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Modal, Form, Input, Select, InputNumber, DatePicker, Col, Row, Button, Table } from 'antd';
import { useSelector, useIntl } from "umi";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import dayjs from 'dayjs';
import { FORM_REQUIRED_RULE } from "@/utils/constants";

function Com({ open, onChangeOpen, form }) {
    useEffect(() => {
        console.log('函数组件来咯')
    }, [])
    const handleOk = () => {
        onChangeOpen(false)
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
            }
        }
    });

    return (
        <Modal
            title={t('新增策略')}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            className={Style}
            width={'50%'}
        > <Form
            form={form}
            name="addPolicy"
        // style={{width:'520px'}}
        >
                <div >
                    <Row gutter={[48, 24]}>
                        <Col span={12} >
                            <Form.Item label="策略名称" labelCol={{ span: 5 }} name="name" rules={[FORM_REQUIRED_RULE]}>
                                <Input placeholder="请输入策略名称" style={{ maxWidth: 320, width: '60%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="策略编号" labelCol={{ span: 5 }} name="sn" rules={[FORM_REQUIRED_RULE]}>
                                <Input placeholder="请输入策略编号" style={{ maxWidth: 320, width: '60%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="开始日期" labelCol={{ span: 5 }} name="start" rules={[FORM_REQUIRED_RULE]}>
                                <DatePicker placeholder="请输入开始日期" style={{ width: '60%', }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="结束日期" labelCol={{ span: 5 }} name="end" rules={[FORM_REQUIRED_RULE]}>
                                <DatePicker placeholder="请输入结束日期" style={{ maxWidth: 320, width: '60%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="模式" labelCol={{ span: 5 }} name="action" rules={[FORM_REQUIRED_RULE]}>
                                <Select placeholder="请选择模式" style={{ maxWidth: 320, width: '60%' }} />
                            </Form.Item>
                        </Col>

                    </Row>

                </div>
                <Button type='primary' style={{ marginBottom: '24px' }}>{t('时段新增')}</Button>
                <Table
                    columns={[
                        {
                            title: '开始时间',
                            key: 'start',
                            dataIndex: 'start',
                        },
                        {
                            title: '结束时间',
                            key: 'end',
                            dataIndex: 'end',

                        }, {
                            title: '时段类型',
                            key: 'timeType',
                            dataIndex: 'timeType',

                        }, {
                            title: '功率（kW）',
                            key: 'power',
                            dataIndex: 'power',

                        }, {
                            title: '目标SOC（%）',
                            key: 'soc',
                            dataIndex: 'soc',

                        },
                        {
                            title: '操作',
                            key: 'option',
                            dataIndex: 'option',

                        },
                    ]}

                />

            </Form>

        </Modal>
    )
}

export default Com