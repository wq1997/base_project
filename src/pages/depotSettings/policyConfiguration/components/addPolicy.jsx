import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Modal, Form, Input, Select, InputNumber, DatePicker, theme, TimePicker, Col, Row, Button, Table, message, Dropdown, Upload } from 'antd';
import { useSelector, useIntl } from "umi";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import dayjs from 'dayjs';
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import { isOverlap, is24HoursInOneDay } from '@/utils/utils'
import { downloadStrategyTemplate, exportStrategy, importStrategy } from '@/services/policy'
import { getBaseUrl } from '@/services/request'
function Com({ open,
    onChangeOpen,
    form,
    setStrategyTableData,
    title,
    dataSource,
    edit,
    index }) {
    const [disabled, setDisabled] = useState(false);
    const { token } = theme.useToken();
    const [fileList, setFileList] = useState([]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            if (dayjs(values.startDate).diff(dayjs(values.endDate)) > 0) {
                return message.warning(t('结束日期大于等于开始日期'))
            }
            values.startDate = dayjs(values.startDate).format('MM-DD');
            values.endDate = dayjs(values.endDate).format('MM-DD');
            let flag = values?.contentList?.map((item, index) => {
                let length = values?.contentList?.map((it, i) => {
                    if (index < values?.contentList.length - 1 && i > index) {
                        if (isOverlap(dayjs(item.startTime).format('HH:mm:ss'), dayjs(item.endTime).format('HH:mm:ss'), dayjs(values?.contentList[i].startTime).format('HH:mm:ss'), dayjs(values?.contentList[i].endTime).format('HH:mm:ss'))) {
                            return true
                        } else {
                            return false;
                        }
                    } else {
                        let startTime = parseInt(dayjs(item.startTime).format('HH:mm:ss').split(':')[0] + dayjs(item.startTime).format('HH:mm:ss').split(':')[1] + dayjs(item.startTime).format('HH:mm:ss').split(':')[2])    //900
                        let endTime = parseInt(dayjs(item.endTime).format('HH:mm:ss').split(':')[0] + dayjs(item.endTime).format('HH:mm:ss').split(':')[1] + dayjs(item.endTime).format('HH:mm:ss').split(':')[2])    //1800
                        if (startTime === endTime) {
                            return false
                        }
                    }
                })
                return length.find(it => it === false)
            });
            if (flag.findIndex(it => it === false) !== -1) {
                return message.warning(t('时段重叠,请修改'))
            };
            // if (!is24HoursInOneDay(values?.contentList)) {
            //     return message.warning(t('时段不满24小时'))
            // };
            values.contentList.map(it => {
                it.startTime = dayjs(it.startTime).format('HH:mm:ss');
                it.endTime = dayjs(it.endTime).format('HH:mm:ss')
            })
            if (title == '新增策略') {
                setStrategyTableData(values);
            } else {
                let arr = structuredClone(dataSource);
                arr[arr.findIndex(it => it.planNo == values.planNo)] = { ...values };
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
                        rules={[{ required: true, message: t('请输入') + " " + t('开始时间') }]}
                        name={[field.name, 'startTime']}
                    >
                        <TimePicker placeholder={t('请输入') + " " + t('开始时间')} />
                    </Form.Item>
                }
            },
            {
                title: t('结束时间'),
                dataIndex: 'endTime',
                key: 'endTime',
                render(text, field) {
                    return <Form.Item
                        rules={[{ required: true, message: t('请输入') + " " + t('结束时间') }]}
                        name={[field.name, 'endTime']}
                    >
                        <TimePicker type='time' placeholder={t('请输入') + " " + t('结束时间')} />
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
                title: t('功率') + '（kW）',
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
                title: t('目标SOC') + '（%）',
                dataIndex: 'soc',
                render(text, field) {
                    return <Form.Item
                        rules={[{ required: true, message: t('请输入') + ' ' + t('目标SOC') }]}
                        name={[field.name, 'soc']}
                    >
                        <InputNumber placeholder={t('请输入') + ' ' + t('目标SOC')} allowClear />
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
    const items = [{
        key: '1',
        label: (<span onClick={async () => {
            let data = await downloadStrategyTemplate();
            let blob = data?.data;
            let content = [];
            content.push(blob);
            // new Blob 实例化文件流
            const blobData = new Blob(content);
            const url = window.URL.createObjectURL(blobData)
            const link = document.createElement('a')
            link.style.display = "none"
            link.href = url
            // fileName 文件名后缀记得添加
            link.setAttribute('download', `${t('策略模板')}.xlsx`)
            document.body.appendChild(link)
            link.click()
            //下载完成移除元素
            document.body.removeChild(link)
            //释放掉blob对象
            window.URL.revokeObjectURL(url)

        }}>{t('下载模板')}</span>)
    },
    {
        key: '2',
        label: (<span onClick={async () => {
            var option = {
                datas: []
            };
            option.fileName = t('策略');
            // diffData?.tempDiff?.map((item, index) => {
            let data = [];
            form.getFieldValue('contentList')?.map((it, i) => {
                data.push({
                    startTime: dayjs(it.startTime).format('HH:mm:ss'),
                    endTime: dayjs(it.endTime).format('HH:mm:ss'),
                    type: it.type,
                    power: it.power,
                    soc: it.soc,
                })
            })
            option.datas.push({
                sheetData: data,
                sheetName: form.getFieldValue('planName'),
                sheetFilter: ['startTime', 'endTime', 'type', 'power', 'soc'],
                sheetHeader: [t("开始时间"), t("结束时间"), t('时段类型'), `${t('功率')}(kW)`, `${t('目标SOC')}(%)`,],
                columnWidths: ['5', '5', '10', '10', '10',],
            })
            const ExportJsonExcel = require("js-export-excel");
            var toExcel = new ExportJsonExcel(option);
            toExcel.saveExcel();
        }}>{t('导出策略')}</span>)
    },
    {
        key: '3',
        label: (
            <Upload
                action={`${getBaseUrl()}strategy/importStrategy`}
                data={async () => {
                    let modeType = await form.getFieldValue('controlMode');
                    return {
                        modeType
                    }
                }}
                name='file'
                headers={
                    {
                        Authorization: 'Bearer ' + localStorage.getItem("Token"), Token: localStorage.getItem("Token"),
                    }
                }
                accept={`application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`}
                beforeUpload={(file, fileList) => {
                    // console.log(file, '上传前');
                    let typeFile = file.type
                    if (typeFile == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || typeFile == 'application/vnd.ms-excel') {
                    } else {
                        message.error("请上传excel文件！")
                        return false;
                    }
                }}
                onChange={(info) => {
                    if (info.fileList.length > 1) {
                        info.fileList = info.fileList.slice(-1);
                        // message.warning("只能上传一个文件！");
                    }

                    // 如果是excel文件显示上传列表
                    /*  let typeFile = info.file.type
                     if (typeFile == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || typeFile == 'application/vnd.ms-excel') {
                       setFILELIST(info.fileList)
                     } */
                    setFileList(info.fileList)
                    // 文件不是正在上传（上传error）
                    if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                        let res = info.file.response;
                        if (res?.success === 0) {
                            message.warning(`${res.message}`);
                        }
                    }
                    // 文件已经上传
                    if (info.file.status === 'done') {
                        // console.log(info,'done');
                        let res = info.file.response;
                        if (res.code == 200) {
                            // 获取文件流
                            console.log(form)
                            let now = new Date();

                            let arr = res?.data?.map(it => {
                                it.startTime = dayjs(dayjs(now).format('YYYY-MM-DD') + it?.startTime);
                                it.endTime = dayjs(dayjs(now).format('YYYY-MM-DD') + it?.endTime);
                                return it
                            })
                            form?.setFieldValue('contentList', arr);
                            console.log(arr, 'arr');
                            message.success(`${info.file.name} ${t('导入成功')}`);
                        } else {
                            message.error(res.msg);

                        }
                    } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                    }

                }}
                showUploadList={false}
            ><span onClick={async () => {
            }}>{t('导入策略')}</span>
            </Upload>
        )
    }
    ];

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
                                <Input placeholder={t("请输入") + " " + t('策略名称')} style={{ maxWidth: 320, width: '60%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label={t("策略编号")} labelCol={{ span: 5 }} name="planNo" rules={[FORM_REQUIRED_RULE]}>
                                <Input placeholder={t("请输入") + " " + t('策略编号')} disabled={true} style={{ maxWidth: 320, width: '60%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label={t("开始日期")} labelCol={{ span: 5 }} name="startDate" rules={[FORM_REQUIRED_RULE]}>
                                <DatePicker format={'MM-DD'} placeholder={t("请输入") + " " + t('开始日期')} style={{ width: '60%', }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label={t("结束日期")} labelCol={{ span: 5 }} name="endDate" rules={[FORM_REQUIRED_RULE]}>
                                <DatePicker format={'MM-DD'} placeholder={t("请输入") + " " + t('结束日期')} style={{ maxWidth: 320, width: '60%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label={t("模式")} labelCol={{ span: 5 }} name="controlMode" rules={[FORM_REQUIRED_RULE]}>
                                <Select placeholder={t("请选择模式")} onChange={(val) => {
                                    form.setFieldValue('controlMode', val); console.log(form.getFieldValue('controlMode'), val);
                                }
                                } disabled={disabled} options={[{ value: 1, label: t('白天-黑夜') }, { value: 2, label: t('定时充放') },]} style={{ maxWidth: 320, width: '60%' }} />
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
                                <Dropdown
                                    menu={
                                        { items }
                                    }
                                    placement="bottom"
                                    arrow={true}
                                >
                                    <Button type="primary" style={{ backgroundColor: token.defaultBg, marginLeft: '20px' }}>{t('策略导入/导出')}</Button>
                                </Dropdown>


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