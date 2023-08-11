import { PageTitle, Search, ChangePasswordModal } from "@/components";
import { Row, Button, Form, Table, Modal, Input, Select } from "antd";
import { useState } from "react";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE, TELPHONE_NUMBER_REG } from "@/utils/constants";
import { useDebounceEffect } from "ahooks";

const UserList = () => {
    const [form] = Form.useForm();
    const [changePasswordForm] = Form.useForm();
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [editVisible, setEditVisible] = useState(false);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
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
            title: '手机号',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: '公司',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: '职务',
            dataIndex: 'site',
            key: 'site',
        },
        {
            title: '合作意向',
            dataIndex: 'yes',
            key: 'yes',
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
                                changePasswordForm.setFieldsValue({
                                    ...record
                                })
                                setChangePasswordVisible(true);
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
            const values = await changePasswordForm.validateFields();
            console.log('Success:', values);
          } catch (errorInfo) {
            console.log('Failed:', errorInfo);
          }
    }

    const onCancel = () => {
        setEditVisible(false);
        setChangePasswordVisible(false);
        form.resetFields();
        changePasswordForm.resetFields();
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
                <div>
                    <Search 
                        style={{width: 200, marginBottom: 16, marginRight: 16}} 
                        placeholder="请输入姓名/手机号" 
                        onChange={e=>{
                            setKeyword(e.target.value);
                            setPagination(DEFAULT_PAGINATION);
                        }} 
                    />
                    <Select 
                        style={{width: 200,marginRight: 16}} 
                        placeholder="请选择公司" 
                    />
                    <Select 
                        style={{width: 200}} 
                        placeholder="请选择职务" 
                    />
                </div>
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
                    title={type==="Add"?"新增用户":"编辑用户"}
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
                        <Form.Item 
                            label="手机号" 
                            name="account" 
                            rules={[
                                {...FORM_REQUIRED_RULE},
                                {validator(_,value,callback){
                                    if(TELPHONE_NUMBER_REG.test(value)){
                                       return Promise.resolve();
                                    }else{
                                       return Promise.reject("不符合手机号规则，请输入手机号");
                                    }
                                }}
                            ]}
                        > 
                            <Input placeholder="请输入手机号" />
                        </Form.Item>
                        <Form.Item 
                            label="密码" 
                            name="password" 
                            rules={[
                                {...FORM_REQUIRED_RULE},
                                {validator(_,value,callback){
                                    if(value?.length<8){
                                       return Promise.reject("密码长度必须大于或等于8位");
                                    }else{
                                       return Promise.resolve();
                                    }
                                }}
                            ]}
                        > 
                            <Input placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item label="公司" name="company"> 
                            <Input placeholder="请输入公司" />
                        </Form.Item>
                        <Form.Item label="职务" name="site"> 
                            <Input placeholder="请输入职务" />
                        </Form.Item>
                        <Form.Item label="合作意向" name="yes"> 
                            <Input.TextArea placeholder="请输入合作意向" />
                        </Form.Item>
                        <Form.Item label="备注" name="comment">
                            <Input.TextArea placeholder="请输入备注" />
                        </Form.Item>
                    </Form>
                </Modal>
            }
            {
                changePasswordVisible&&
                <ChangePasswordModal 
                    form={changePasswordForm}
                    visible={changePasswordVisible}
                    onOk={onResetPassword}
                    onCancel={onCancel}
                />
            }
        </div>
    )
}

export default UserList;