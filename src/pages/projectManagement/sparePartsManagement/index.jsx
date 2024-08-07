import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Space, Button, Table, theme, Modal, Form, Radio, Select, Input, InputNumber, Drawer } from "antd";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import styles from "./index.less";

const SparePartsManagement = () => {
    const [spareStorageForm] = Form.useForm();
    const [useForm] = Form.useForm();
    const { token } = theme.useToken();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [name, setName] = useState();
    const nameRef = useRef();
    const [type, setType] = useState();
    const typeRef = useRef();
    const [warehouse, setWarehouse] = useState();
    const warehouseRef = useRef();
    const [attribute, setAttribute] = useState();
    const attributeRef = useRef();
    const [supplier, setSupplier] = useState();
    const supplierRef = useRef();
    const [spareStorageOpen, setSpareStorageOpen] = useState(false);
    const [useOpen, setUseOpen] = useState(false);
    const [recordOpen, setRecordOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [canSure, setCanSure] = useState(true);
    const [canDelete, setCanDelete] = useState(true);
    const [canInvalid, setCanInvalid] = useState(true);
    const [dataSource, setDataSource] = useState([{
        name: '备件1'
    }]);

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        const hasNoSure = Boolean(newSelectedRows?.some(item => item.supportConfirm == false));
        setCanSure(!hasNoSure);
        const hasNoDelete = Boolean(newSelectedRows?.some(item => item.supportDelete == false));
        setCanDelete(!hasNoDelete);
        const hasNoInvalid = Boolean(newSelectedRows?.some(item => item.supportInvalid == false));
        setCanInvalid(!hasNoInvalid);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const columns = [
        {
            title: "备件名称",
            dataIndex: "name",
        },
        {
            title: "备件编号",
            dataIndex: "1",
        },
        {
            title: "备件数量",
            dataIndex: "2",
        },
        {
            title: "备件类型",
            dataIndex: "3",
        },
        {
            title: "所属仓库",
            dataIndex: "4",
        },
        {
            title: "备件属性",
            dataIndex: "5",
        },
        {
            title: "所属供应商",
            dataIndex: "6",
        },
        {
            title: "操作",
            dataIndex: "Action",
            render: (_, row) => {
                return (
                    <Space>
                        <Button type="link" onClick={() => setUseOpen(true)}>
                            备件领用
                        </Button>
                        <Button type="link" style={{ color: token.colorPrimary }} onClick={()=>setRecordOpen(true)}>
                            查看出入库记录
                        </Button>
                    </Space>
                );
            },
        },
    ]

    return (
        <div className={styles.sparePartsManagement}>
            <Space className={styles.search}>
                <SearchInput
                    label="备件名称"
                    value={name}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <SearchInput
                    label="备件类型"
                    value={type}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        typeRef.current = value;
                        setType(value);
                    }}
                />
                <SearchInput
                    label="所属仓库"
                    value={warehouse}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        warehouseRef.current = value;
                        setWarehouse(value);
                    }}
                />
                <SearchInput
                    label="备件属性"
                    value={attribute}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        attributeRef.current = value;
                        setAttribute(value);
                    }}
                />
                <SearchInput
                    label="所属供应商"
                    value={supplier}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        supplierRef.current = value;
                        setSupplier(value);
                    }}
                />
                <Button type="primary">搜索</Button>
                <Button type="primary" danger>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                    getCheckboxProps: record => ({
                        disabled: record.account === "admin",
                    }),
                }}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getInviteList();
                }}
                title={() => (
                    <Space className="table-title">
                        <Button
                            type="primary"
                            onClick={() => setSpareStorageOpen(true)}
                        >
                            备件入库
                        </Button>
                        <Button type="primary" danger>删除备件</Button>
                    </Space>
                )}
            />

            <Modal
                title="备件入库"
                open={spareStorageOpen}
                onCancel={async () => {
                    setSpareStorageOpen(false);
                    await spareStorageForm.resetFields();
                }}
            >
                <Form
                    form={spareStorageForm}
                    initialValues={{
                        storageMethod: 'ADD'
                    }}
                    labelCol={{
                        span: 6
                    }}
                    onValuesChange={async (value) => {
                        if ("storageMethod" in value) {
                            await spareStorageForm.resetFields();
                            spareStorageForm.setFieldsValue(value)
                        };
                    }}
                >
                    <Form.Item label="入库方式" name="storageMethod" rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <Radio.Group>
                            <Radio value={"ADD"}>新增备件</Radio>
                            <Radio value={"MAINT"}>维护已有备件</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item noStyle dependencies={['storageMethod']}>
                        {({ getFieldsValue }) => {
                            const { storageMethod } = getFieldsValue(['storageMethod'])
                            return (
                                <>
                                    <Form.Item
                                        hidden={storageMethod !== "ADD"}
                                        rules={[
                                            { required: storageMethod === "ADD", message: "请输入必填字段" }
                                        ]}
                                        label="备件属性"
                                        name={"attributes"}
                                    >
                                        <Select placeholder="请选择备件属性" />
                                    </Form.Item>
                                    <Form.Item
                                        hidden={storageMethod !== "ADD"}
                                        rules={[
                                            { required: storageMethod === "ADD", message: "请输入必填字段" }
                                        ]}
                                        label="备件类型"
                                        name={"type"}
                                    >
                                        <Select placeholder="请选择备件类型" />
                                    </Form.Item>
                                    <Form.Item
                                        hidden={storageMethod !== "ADD"}
                                        rules={[
                                            { required: storageMethod === "ADD", message: "请输入必填字段" }
                                        ]}
                                        label="所属供应商"
                                        name={"suppliers"}
                                    >
                                        <Select placeholder="请选择所属供应商" />
                                    </Form.Item>
                                    <Form.Item
                                        hidden={storageMethod !== "ADD"}
                                        rules={[
                                            { required: storageMethod === "ADD", message: "请输入必填字段" }
                                        ]}
                                        label="所属仓库"
                                        name={"warehouse"}
                                    >
                                        <Select placeholder="请选择所属仓库" />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[
                                            { required: true, message: "请输入必填字段" }
                                        ]}
                                        label="备件名称"
                                        name={"name"}
                                    >
                                        <Input placeholder="请输入备件名称" />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[
                                            { required: true, message: "请输入必填字段" }
                                        ]}
                                        label="备件数量"
                                        name={"count"}
                                    >
                                        <InputNumber placeholder="请输入备件数量" min={0} style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        label="入库备注"
                                        name={"remark"}
                                    >
                                        <Input.TextArea placeholder="请输入入库备注" />
                                    </Form.Item>
                                </>
                            )
                        }}
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="备件领用"
                open={useOpen}
                onCancel={() => {
                    setUseOpen(false);
                }}
            >
                <Form
                    form={useForm}
                    labelCol={{
                        span: 6
                    }}
                >
                    <Form.Item label="备件名称" name={"name"} rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <Select placeholder="请选择备件" />
                    </Form.Item>
                    <Form.Item label="入库备件数量" name="hasCount">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="备件领用数量" name={"count"} rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <InputNumber placeholder="请输入备件领用数量" min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="领用项目" name={"project"} rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <Select placeholder="请选择领用项目" />
                    </Form.Item>
                    <Form.Item
                        label="入库备注"
                        name={"remark"}
                    >
                        <Input.TextArea placeholder="请输入入库备注" />
                    </Form.Item>
                </Form>
            </Modal>

            <Drawer 
                title="出入库记录" 
                width={1000}
                open={recordOpen}
                onClose={()=>setRecordOpen(false)}
            >
                <Table 
                    columns={[
                        {
                            title: "备件名称",
                            dataIndex: "1",
                        },
                        {
                            title: "操作类型",
                            dataIndex: "3",
                        },
                        {
                            title: "操作数量",
                            dataIndex: "4",
                        },
                        {
                            title: "操作后余量",
                            dataIndex: "5",
                        },
                        {
                            title: "操作人",
                            dataIndex: "6",
                        },
                        {
                            title: "操作备注",
                            dataIndex: "7",
                        },
                    ]}
                />
            </Drawer>
        </div>
    )
}

export default SparePartsManagement;