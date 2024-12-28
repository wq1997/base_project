import { Title } from '@/components';
import { Modal, Form, Input, Select, DatePicker, Col, Row } from "antd";
import { FORM_REQUIRED_RULE } from "@/utils/constants";

const NewPriceRule = ({ form, dataSource, open, onChangeOpen,addPriceRules }) => {
    return (
        <Modal
            title={<Title title="新增电价规则" />}
            open={open}
            onOk={async () => {
                const values = await form.validateFields();
                values.startDate=values.startDate.format('MM-DD');
                values.endDate=values.endDate.format('MM-DD');
                addPriceRules(values);
                onChangeOpen(false);
                form.resetFields();
                console.log("新增电价规则", values,values.startDate.format('MM-DD'));

            }}
            width={700}
            onCancel={() => {
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
                <Form.Item label="规则编号" name="planUuId">
                    <Input placeholder='请输入规则编号'  style={{maxWidth: 320}} />
                </Form.Item>
                <Form.Item label="规则名称" name="planName" rules={[FORM_REQUIRED_RULE]}>
                    <Input placeholder='请输入规则名称' style={{maxWidth: 320}} />
                </Form.Item>
                <Form.Item label="电价类型" name={"planType"} rules={[FORM_REQUIRED_RULE]}>
                    <Select
                     style={{maxWidth: 320}}
                        options={dataSource.map(item => {
                            return {
                                label: item.name,
                                value: item.value
                            }
                        })}
                        placeholder="请选择电价类型"
                    />
                </Form.Item>
                <Form.Item label="开始日期" name={"startDate"}  rules={[FORM_REQUIRED_RULE]}>
                    <DatePicker   />
                </Form.Item>
                <Form.Item label="结束日期" name={"endDate"} rules={[FORM_REQUIRED_RULE]}>
                    <DatePicker  />
                </Form.Item>
                <Form.Item label="电价(元)" name="remark">
                    <Row gutter={5} style={{ width: '90%' }}>
                        <Col span={5}>
                            <Form.Item style={{marginBottom: 0}} label="尖" name="tipPrice" rules={[FORM_REQUIRED_RULE]}>
                                <Input placeholder='尖' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item style={{marginBottom: 0}} label="峰" name="peakPrice" rules={[FORM_REQUIRED_RULE]}>
                                <Input placeholder='峰' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item style={{marginBottom: 0}} label="平" name="flatPrice" rules={[FORM_REQUIRED_RULE]}>
                                <Input placeholder='平' />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item style={{marginBottom: 0}} label="谷" name="valleyPrice" rules={[FORM_REQUIRED_RULE]}>
                                <Input placeholder='谷' />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label="备注" name="desc">
                    <Input.TextArea placeholder='描述' />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default NewPriceRule;