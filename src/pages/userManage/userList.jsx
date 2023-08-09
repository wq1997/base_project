import { PageTitle, Search } from "@/components";
import { Row, Button, Form, Table, Modal, Input } from "antd";
import { useState } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import { useDebounceEffect } from "ahooks";

const UserList = () => {
    const [form] = Form.useForm();
    const [resetPasswordForm] = Form.useForm();
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [editVisible, setEditVisible] = useState(false);
    const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
    const [type, setType] = useState("")
    
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render(text,record,index){
                return index+1;
            }
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '账号',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '备注',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            dataIndex: 'Actions',
            key: 'Actions',
            render(text,record){
                return (
                    <Row>
                        <Button 
                            type="link"
                            onClick={()=>{
                                form.setFieldsValue({
                                    ...record
                                })
                                setType("Edit");
                                setEditVisible(true);
                            }}
                        >
                            编辑
                        </Button>
                        <Button 
                            type="link"
                            onClick={()=>{
                               Modal.confirm({
                                 title: "系统提示",
                                 content: "数据删除后将无法恢复，是否确认删除该条数据？",
                                 okText: '确定',
                                 cancelText: '取消',
                                 onOk(){
                                    console.log("删除")
                                 }
                               });
                            }}
                        >
                            删除
                        </Button>
                        <Button 
                            type="link"
                            onClick={()=>{
                                resetPasswordForm.setFieldsValue({
                                    ...record
                                })
                                setResetPasswordVisible(true);
                            }}
                        >
                            重置密码
                        </Button>
                    </Row>
                )
            }
        },
    ]

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
          } catch (errorInfo) {
            console.log('Failed:', errorInfo);
          }
    }

    const onResetPassword = async () => {
        try {
            const values = await resetPasswordForm.validateFields();
            console.log('Success:', values);
          } catch (errorInfo) {
            console.log('Failed:', errorInfo);
          }
    }

    const onCancel = () => {
        setEditVisible(false);
        setResetPasswordVisible(false);
        form.resetFields();
        resetPasswordForm.resetFields();
    }

    const getList = async () => {
        console.log("用户列表", keyword, pagination)
    }

    useDebounceEffect(()=>{
        getList();
    }, [keyword, pagination], {
        wait: 300
    });

    return (
        <div>
            <PageTitle title="用户列表" type="page" />
            <Row justify="space-between">
                <Search 
                    style={{width: 200, marginBottom: 15}} 
                    placeholder="请输入关键字" 
                    onChange={e=>{
                        setKeyword(e.target.value);
                        setPagination(DEFAULT_PAGINATION);
                    }} 
                />
                <Button 
                    type="primary"
                    onClick={()=>{
                        setType("Add");
                        setEditVisible(true)
                    }}
                >
                    新增
                </Button>
            </Row>
            <Table 
                columns={columns}
                pagination={pagination}
                dataSource={[
                    {
                        id: '1',
                        name: '1k伏',
                        comment: '哈哈哈哈哈哈'
                    }
                ]}
                onChange={(pagination)=>{
                    setPagination({...pagination})
                }}
            />
            {
                editVisible&&
                <Modal 
                    title={type==="Add"?"新增电压等级":"编辑电压等级"}
                    open={editVisible} 
                    onOk={onSubmit} 
                    onCancel={onCancel}
                    okText="确定"
                    cancelText="取消"
                    width={700}
                >
                    <Form
                        form={form}
                        style={{marginTop: 24}}
                        autoComplete="off"
                        labelCol={{span: 4}}
                    >
                        <Form.Item label="姓名" name="name" rules={[{...FORM_REQUIRED_RULE}]}> 
                            <Input placeholder="请输入姓名" />
                        </Form.Item>
                        <Form.Item label="账号" name="account" rules={[{...FORM_REQUIRED_RULE}]}> 
                            <Input placeholder="请输入账号" />
                        </Form.Item>
                        <Form.Item 
                            label="密码" 
                            name="password" 
                            rules={[
                                {...FORM_REQUIRED_RULE},
                                {validator(_,value,callback){
                                    if(value?.length<8){
                                        callback("密码长度必须大于或等于8位");
                                    }else{
                                        callback()
                                    }
                                }}
                            ]}
                        > 
                            <Input placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item label="手机号" name="phone"> 
                            <Input placeholder="请输入手机号" />
                        </Form.Item>
                        <Form.Item label="备注" name="comment">
                            <Input.TextArea placeholder="请输入备注" />
                        </Form.Item>
                    </Form>
                </Modal>
            }
            {
                resetPasswordVisible&&
                <Modal 
                    title={"重置密码"}
                    open={resetPasswordVisible} 
                    onOk={onResetPassword} 
                    onCancel={onCancel}
                    okText="确定"
                    cancelText="取消"
                    width={700}
                >
                    <Form
                        form={resetPasswordForm}
                        style={{marginTop: 24}}
                        autoComplete="off"
                        labelCol={{span: 4}}
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
                                    const { password } = await resetPasswordForm.getFieldsValue(["password"]);
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
                                   const { newPassword } = await resetPasswordForm.getFieldsValue(["newPassword"]);
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
            }
        </div>
    )
}

export default UserList;