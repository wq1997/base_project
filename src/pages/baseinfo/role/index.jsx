import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Form, Modal, Input, Tree, Tooltip, message} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE, FORM_FORBIDDEN_SPACE } from "@/utils/constants";
import { 
    getPermissionTree as getPermissionTreeServe,
    addRole as addRoleServe,
    getRoleList as getRoleListServe,
    deleteRole as deleteRoleServe,
} from "@/services"
import styles from "./index.less";

const Role = () => {
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addRoleOpen, setAddRoleOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [operationType, setOperationType] = useState();
    const [treeData, setTreeData] = useState([]);
    const [currentRecord, setCurrentRecord] = useState();
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const nameRef = useRef();
    const [name, setName] = useState();

    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "角色名称",
            dataIndex: "name",
        },
        {
            title: "角色编号",
            dataIndex: "code",
        },
        {
            title: '角色说明',
            dataIndex: 'remark',
            key: 'remark',
            ellipsis: true,
            width: 400,
            render(value){
                return (
                    <Tooltip title={value}>
                        <div 
                            style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                width: 400,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                )
            }
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (text,record) => {
                return (
                    <Button 
                        type="link"
                        onClick={()=>{
                            form.setFieldsValue({
                                ...record
                            })
                            setCheckedKeys(record?.permCodes)
                            setOperationType("Edit");
                            setAddRoleOpen(true);
                            setCurrentRecord(record);
                        }}
                    >
                        编辑
                    </Button>
                )
            },
        },
    ];

    
    const onSelectChange = newSelectedRowKeys => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getPermissionTree = async() => {
        const res = await getPermissionTreeServe();
        if(res?.data?.data){
            setTreeData(res?.data?.data);
        }
    }

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const name = nameRef.current;
        setLoading(true);
        try{
            const res = await getRoleListServe({
                pageNum: current,
                pageSize,
                queryCmd: { name },
            });
            if (res?.data?.status == "SUCCESS") {
                const { totalRecord, recordList } = res?.data?.data;
                setPagination({
                    ...paginationRef.current,
                    total: parseInt(totalRecord),
                });
                setDataSource(recordList);
            }
        }finally{
            setLoading(false);
        }
    }

    const onSubmit = async() => {
        let res = null;
        try {
            const values = await form.validateFields();
            if(operationType==="Edit"){
                res = await addRoleServe({
                    ...values,
                    id: currentRecord?.id,
                    permCodes: checkedKeys
                })
            }else{
                res = await addRoleServe({
                    ...values,
                    permCodes: checkedKeys
                });
            }
            if(res?.data){
                getList();
                onCancel();
            }

          } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

    const onCancel = () => {
        setAddRoleOpen(false);
        form.resetFields();
        setCheckedKeys([]);
    }

    const onDelete = async () => {
        if(selectedRowKeys&&selectedRowKeys?.length>0){
            const res = await deleteRoleServe(selectedRowKeys);
            if (res?.data?.status == "SUCCESS") {
                getList();
            }
        }else{
            message.error("请选择需要删除的角色")
        }
    }

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        nameRef.current="";
        setName("");
        getList();
    };

    useEffect(()=>{
        getPermissionTree();
        getList();
    }, [])

    return (
        <div>
            <Space className={styles.search}>
                <SearchInput 
                    label="角色名称" 
                    placeholder="请输入角色名称关键词或角色编号" 
                    inputWidth={250} 
                    value={name} 
                    onChange={value => {
                        nameRef.current=value;
                        setName(value)
                    }} 
                />
                <Button type="primary" onClick={getList}>搜索</Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                loading={loading}
                dataSource={dataSource?.map(data=> {
                    return {
                        ...data,
                        key: data?.id
                    }
                })}
                columns={columns}
                pagination={pagination}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                }}
                title={() => (
                    <Space className={styles.tableTitle}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setOperationType("Add");
                                setAddRoleOpen(true);
                            }}
                        >
                            新增角色
                        </Button>
                        <Button type="primary" danger onClick={onDelete}>删除角色</Button>
                    </Space>
                )}
            />

            <Modal
                open={addRoleOpen}
                title={operationType==="Add"?'新增角色':'编辑角色'}
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
                    <Form.Item label="角色名称" name="name" rules={[{...FORM_FORBIDDEN_SPACE}, {...FORM_REQUIRED_RULE}]}> 
                        <Input placeholder="请输入计费制度名称" />
                    </Form.Item>
                    <Form.Item label="角色说明" name="remark">
                        <Input.TextArea placeholder="请输入备注" />
                    </Form.Item>
                    <Form.Item label="权限配置" name="permCodes">
                            <Tree 
                                treeData={treeData} 
                                checkable 
                                checkedKeys={checkedKeys}
                                onCheck={(checkedKeys) => {
                                    setCheckedKeys(checkedKeys)
                                }}
                            />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Role;