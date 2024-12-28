import { Title } from '@/components';
import { Modal, Form, Input, Row, Col, Select} from "antd";
import { FORM_REQUIRED_RULE, timeSplitSymbol, } from "@/utils/constants";
import { useIntl} from "umi";
import { fillInt } from "@/utils/utils";
import moment from 'moment';

const NewYear = ({ form, open, dataSource, onChangeDatasource, onChangeOpen, }) => {
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    return (
        <Modal
            title={<Title title="创建年度执行计划"/>}
            open={open}
            onOk={async () => {
                const values = await form.validateFields();
                console.log("创建年度执行计划", values);
                onChangeDatasource([
                    ...dataSource,
                    {
                        name: values.name,
                        startTime: `${values.month1}${timeSplitSymbol}${values.day1}`,
                        endTime: `${values.month2}${timeSplitSymbol}${values.day2}`,
                        remark: values?.remark
                    },
                ])
                onChangeOpen(false);
                form.resetFields();
            }}
            width={700}
            onCancel={()=>{
                onChangeOpen(false);
                form.resetFields();
            }}
        >
            <Form
                form={form}
                labelCol={{
                    span: 3
                }}
            >
                <Form.Item label={t("策略")} name={"name"} rules={[FORM_REQUIRED_RULE]}>
                    <Select 
                        options={dataSource.map(item => {
                            return {
                                label: t(item.name),
                                value: item.name
                            }
                        })}
                        placeholder={t("请选择策略")}
                    />
                </Form.Item>
                <Form.Item 
                    name=""
                    label="时间" 
                    dependencies={['month1', 'day1', 'month2', 'day2']}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const month1 = getFieldValue('month1');
                                const day1 = getFieldValue('day1');
                                const month2 = getFieldValue('month2');
                                const day2 = getFieldValue('day2');
                                if(month1&&day1&&month2&&day2){
                                    const flag = moment(`${month1}-${day1}`).isBefore(moment(`${month2}-${day2}`));
                                    if(!flag){
                                        return Promise.reject(t('起始时间应该早于结束时间'));
                                    }
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                    required
                >
                        <Row gutter={5}>
                            <Col span={5}>
                                <Form.Item name="month1" style={{marginBottom: 0}} rules={[FORM_REQUIRED_RULE]}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                        placeholder={t("月")}
                                        options={fillInt(12).map((item => {
                                            return {
                                                label: item,
                                                value: item
                                            }
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="day1" style={{marginBottom: 0}} rules={[FORM_REQUIRED_RULE]}>
                                    <Select 
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                        placeholder={t("日")}
                                        options={fillInt(31).map((item => {
                                            return {
                                                label: item,
                                                value: item
                                            }
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Row justify="center" style={{marginTop: 5}}>{t('至')}</Row>
                            </Col>
                            <Col span={5}>
                                <Form.Item 
                                    name="month2" 
                                    style={{marginBottom: 0}} 
                                    rules={[FORM_REQUIRED_RULE]}
                                >
                                    <Select 
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                        placeholder={t("月")}
                                        options={fillInt(12).map((item => {
                                            return {
                                                label: item,
                                                value: item
                                            }
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="day2" style={{marginBottom: 0}} rules={[FORM_REQUIRED_RULE]}>
                                    <Select 
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                        placeholder={t("日")}
                                        options={fillInt(31).map((item => {
                                            return {
                                                label: item,
                                                value: item
                                            }
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                </Form.Item>
                <Form.Item label="备注" name="remark">
                    <Input.TextArea placeholder='描述'/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default NewYear;