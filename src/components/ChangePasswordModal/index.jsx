import { Form, Modal, Input } from "antd";
import { FORM_REQUIRED_RULE } from "@/utils/constants";

const ChangePasswordModal = ({
    form,
    title,
    visible,
    onOk,
    onCancel
}) => {
    return (
        <Modal 
            title={title||"重置密码"}
            open={visible} 
            onOk={onOk} 
            onCancel={onCancel}
            okText="确定"
            cancelText="取消"
            width={700}
        >
            <Form
                form={form}
                autoComplete="off"
                labelCol={{span: 4}}
                style={{marginTop: 16}}
            >
                <Form.Item label="旧密码" name="password" rules={[{...FORM_REQUIRED_RULE}]}> 
                    <Input placeholder="请输入旧密码" minLength={8} />
                </Form.Item>
                <Form.Item 
                    label="新密码" 
                    name="newPassword" 
                    rules={[
                        {...FORM_REQUIRED_RULE},
                        {validator: async(_,value,callback) => {
                            const { password } = await form.getFieldsValue(["password"]);
                            if(value?.length<8){
                                return Promise.reject("密码长度必须大于或等于8位");
                            }else if(value===password){
                                return Promise.reject("新密码和旧密码须不一致");
                            }else{
                                return Promise.resolve()
                            }
                        }}
                    ]}
                > 
                    <Input placeholder="请输入新密码" minLength={8} />
                </Form.Item>
                <Form.Item 
                    label="确认新密码" 
                    name="sureNewPassword" 
                    rules={[
                        {...FORM_REQUIRED_RULE},
                        {validator: async(_,value,callback)=>{
                            const { newPassword } = await form.getFieldsValue(["newPassword"]);
                            if(value !== newPassword){
                                return Promise.reject("确认新密码应与新密码保持一致")
                            }else{
                                return Promise.resolve()
                            }
                        }}
                    ]}
                > 
                    <Input placeholder="请输入确认新密码" minLength={8} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ChangePasswordModal;