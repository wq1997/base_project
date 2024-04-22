import { Title } from '@/components';
import { Modal, Form, Input, Select, DatePicker} from "antd";
import { FORM_REQUIRED_RULE } from "@/utils/constants";

const NewSchedule = ({ form, dataSource, open, onChangeOpen, }) => {
    return (
        <Modal
            title={<Title title="创建策略执行日程"/>}
            open={open}
            onOk={async () => {
                const values = await form.validateFields();
                console.log("创建策略执行日程", values);
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
                <Form.Item label="策略" name={"name"} rules={[FORM_REQUIRED_RULE]}>
                    <Select 
                        options={dataSource.map(item => {
                            return {
                                label: item.name,
                                value: item.name
                            }
                        })}
                        placeholder="请选择策略"
                    />
                </Form.Item>
                <Form.Item label="时间" name={"time"} rules={[FORM_REQUIRED_RULE]}>
                        <DatePicker.RangePicker showTime />
                </Form.Item>
                <Form.Item label="备注" name="remark">
                        <Input.TextArea placeholder='描述'/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default NewSchedule;