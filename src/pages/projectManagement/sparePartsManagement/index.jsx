import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import {
    Space,
    Button,
    Table,
    theme,
    Modal,
    Form,
    Radio,
    Select,
    Input,
    InputNumber,
    Drawer,
    Tooltip,
} from "antd";
import { DEFAULT_PAGINATION, FORM_REQUIRED_RULE } from "@/utils/constants";
import styles from "./index.less";
import { useLocation, useSelector } from "umi";
import { getUrlParams, hasPerm } from "@/utils/utils";
import {
    sparePartsInitData as sparePartsInitDataServe,
    sparePartsFindPage as sparePartsFindPageServe,
    newAddSpareParts as newAddSparePartsServe,
    operatorInitData as operatorInitDataServe,
    sparePartsInput as sparePartsInputServe,
    sparePartsOutput as sparePartsOutputServe,
    sparePartsFindInOutPage as sparePartsFindInOutPageServe,
    sparePartsDelete as sparePartsDeleteServe,
} from "@/services";

const SparePartsManagement = () => {
    const [spareStorageForm] = Form.useForm();
    const [useForm] = Form.useForm();
    const { token } = theme.useToken();
    const { user } = useSelector(state => state.user);
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const outputPaginationRef = useRef(DEFAULT_PAGINATION);
    const [outputPagination, setOutputPagination] = useState(DEFAULT_PAGINATION);
    const [outputDatasource, setOutputDatasource] = useState([]);
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
    const [dataSource, setDataSource] = useState([]);
    const [initOptions, setInitOptions] = useState({});
    const [currentRecord, setCurrentRecord] = useState({});
    const [operateInitData, setOperateInitData] = useState({});

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const columns = [
        {
            title: "备件名称",
            dataIndex: "name",
            key: "name",
            ellipsis: true,
            width: 200,
            render(value) {
                return (
                    <Tooltip title={value}>
                        <div
                            style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: 200,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                );
            },
        },
        {
            title: "备件编号",
            dataIndex: "code",
            width: 200,
        },
        {
            title: "备件数量",
            dataIndex: "stock",
            width: 100,
        },
        {
            title: "备件类型",
            dataIndex: "type",
            width: 200,
        },
        {
            title: "所属仓库",
            dataIndex: "warehouse",
            width: 200,
        },
        {
            title: "备件属性",
            dataIndex: "attribute",
            width: 200,
        },
        {
            title: "所属供应商",
            dataIndex: "6",
            render(_, record) {
                return record?.supplier?.name;
            },
            width: 200,
        },
        {
            title: "备件备注",
            dataIndex: "remark",
            key: "remark",
            ellipsis: true,
            width: 200,
            render(value) {
                return (
                    <Tooltip title={value}>
                        <div
                            style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width: 200,
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                );
            },
        },
        {
            title: "操作",
            dataIndex: "Action",
            fixed: "right",
            width: 300,
            render: (_, row) => {
                return (
                    <Space>
                        {hasPerm(user, "op:spare_output") && (
                            <Button
                                type="link"
                                onClick={() => {
                                    useForm.setFieldsValue({
                                        ...row,
                                        remark: undefined,
                                    });
                                    setCurrentRecord(row);
                                    setUseOpen(true);
                                    getOperateInitData();
                                }}
                            >
                                备件领用
                            </Button>
                        )}
                        <Button
                            type="link"
                            style={{ color: token.colorPrimary }}
                            onClick={() => {
                                getOutputDataSource(row?.code);
                                setRecordOpen(true);
                            }}
                        >
                            查看出入库记录
                        </Button>
                    </Space>
                );
            },
        },
    ];

    const getSparePartsInitData = async () => {
        const res = await sparePartsInitDataServe();
        if (res?.data?.status === "SUCCESS") {
            setInitOptions(res?.data?.data);
        }
    };

    const getOperateInitData = async () => {
        const res = await operatorInitDataServe();
        if (res?.data?.status === "SUCCESS") {
            setOperateInitData(res?.data?.data);
        }
    };

    const getDataSource = async () => {
        const { current, pageSize } = paginationRef.current;
        const nameLike = nameRef.current;
        const type = typeRef.current;
        const warehouse = warehouseRef.current;
        const attribute = attributeRef.current;
        const supplierId = supplierRef.current;
        const res = await sparePartsFindPageServe({
            pageNum: current,
            pageSize,
            queryCmd: {
                nameLike,
                type,
                warehouse,
                attribute,
                supplierId,
            },
        });
        if (res?.data?.status === "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setDataSource(recordList);
        }
    };

    const getOutputDataSource = async code => {
        const { current, pageSize } = outputPaginationRef.current;
        const res = await sparePartsFindInOutPageServe({
            pageNum: current,
            pageSize,
            queryCmd: {
                code,
            },
        });
        if (res?.data?.status === "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setOutputPagination({
                ...outputPaginationRef.current,
                total: parseInt(totalRecord),
            });
            setOutputDatasource(recordList);
        }
    };

    const onReset = () => {
        nameRef.current = undefined;
        typeRef.current = undefined;
        warehouseRef.current = undefined;
        attributeRef.current = undefined;
        supplierRef.current = undefined;
        setSupplier(undefined);
        setAttribute(undefined);
        setWarehouse(undefined);
        setType(undefined);
        setName(undefined);
        getDataSource();
    };

    useEffect(() => {
        getSparePartsInitData();
        getOperateInitData();
        getDataSource();
    }, []);

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
                    options={initOptions?.types?.map(item => {
                        return {
                            name: item,
                            code: item,
                        };
                    })}
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
                    options={initOptions?.warehouses?.map(item => {
                        return {
                            name: item,
                            code: item,
                        };
                    })}
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
                    options={initOptions?.attributes?.map(item => {
                        return {
                            name: item,
                            code: item,
                        };
                    })}
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
                    options={initOptions?.suppliers?.map(item => {
                        return {
                            name: item?.name,
                            code: item?.id,
                        };
                    })}
                />
                <Button type="primary" onClick={getDataSource}>
                    搜索
                </Button>
                <Button type="primary" danger onClick={onReset}>
                    重置
                </Button>
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
                scroll={{
                    x: 1500,
                }}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getDataSource();
                }}
                title={() => (
                    <Space className="table-title">
                        {hasPerm(user, "op:spare_input") && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    getOperateInitData();
                                    setSpareStorageOpen(true);
                                }}
                            >
                                备件入库
                            </Button>
                        )}
                        {hasPerm(user, "op:spare_delete") && (
                            <Button
                                type="primary"
                                danger
                                onClick={async () => {
                                    const res = await sparePartsDeleteServe({
                                        ids: selectedRowKeys,
                                    });
                                    if (res?.data?.status === "SUCCESS") {
                                        const { current } = paginationRef?.current;
                                        if (
                                            current != 1 &&
                                            dataSource?.length == selectedRowKeys?.length
                                        ) {
                                            paginationRef.current.current = current - 1;
                                            setPagination({
                                                current: current - 1,
                                            });
                                        }
                                        getDataSource();
                                    }
                                }}
                            >
                                删除备件
                            </Button>
                        )}
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
                onOk={async () => {
                    const values = await spareStorageForm.getFieldsValue();
                    if (values.storageMethod === "ADD") {
                        const res = await newAddSparePartsServe(values);
                        if (res?.data?.status === "SUCCESS") {
                            setSpareStorageOpen(false);
                            await spareStorageForm.resetFields();
                            getDataSource();
                        }
                    } else {
                        const res = await sparePartsInputServe({
                            id: values?.name,
                            count: values?.stock,
                            remark: values?.operateRemark,
                        });
                        if (res?.data?.status === "SUCCESS") {
                            setSpareStorageOpen(false);
                            await spareStorageForm.resetFields();
                            getDataSource();
                        }
                    }
                }}
            >
                <Form
                    form={spareStorageForm}
                    initialValues={{
                        storageMethod: "ADD",
                    }}
                    labelCol={{
                        span: 6,
                    }}
                    onValuesChange={async value => {
                        if ("storageMethod" in value) {
                            await spareStorageForm.resetFields();
                            spareStorageForm.setFieldsValue(value);
                        }
                    }}
                >
                    <Form.Item
                        label="入库方式"
                        name="storageMethod"
                        rules={[{ ...FORM_REQUIRED_RULE }]}
                    >
                        <Radio.Group>
                            <Radio value={"ADD"}>新增备件</Radio>
                            <Radio value={"MAINT"}>维护已有备件</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item noStyle dependencies={["storageMethod", "attribute"]}>
                        {({ getFieldsValue }) => {
                            const { storageMethod } = getFieldsValue(["storageMethod"]);
                            const { attribute } = getFieldsValue(["attribute"]);
                            return (
                                <>
                                    <Form.Item
                                        hidden={storageMethod !== "ADD"}
                                        rules={[
                                            {
                                                required: storageMethod === "ADD",
                                                message: "请输入必填字段",
                                            },
                                        ]}
                                        label="备件属性"
                                        name={"attribute"}
                                    >
                                        <Select
                                            placeholder="请选择备件属性"
                                            options={initOptions?.attributes?.map(item => {
                                                return {
                                                    label: item,
                                                    value: item,
                                                };
                                            })}
                                            onChange={value => {
                                                if (value === "采日自研备件") {
                                                    const cairiSupplier =
                                                        initOptions?.suppliers?.find(
                                                            item =>
                                                                item?.name?.indexOf(
                                                                    `上海采日能源科技`
                                                                ) > -1
                                                        );
                                                    spareStorageForm.setFieldsValue({
                                                        supplierId: cairiSupplier?.id,
                                                    });
                                                } else {
                                                    spareStorageForm.setFieldsValue({
                                                        supplierId: undefined,
                                                    });
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        hidden={storageMethod !== "ADD"}
                                        rules={[
                                            {
                                                required: storageMethod === "ADD",
                                                message: "请输入必填字段",
                                            },
                                        ]}
                                        label="备件类型"
                                        name={"type"}
                                    >
                                        <Select
                                            placeholder="请选择备件类型"
                                            options={initOptions?.types?.map(item => {
                                                return {
                                                    label: item,
                                                    value: item,
                                                };
                                            })}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        hidden={storageMethod !== "ADD"}
                                        rules={[
                                            {
                                                required: storageMethod === "ADD",
                                                message: "请输入必填字段",
                                            },
                                        ]}
                                        label="所属供应商"
                                        name={"supplierId"}
                                    >
                                        <Select
                                            placeholder="请选择所属供应商"
                                            options={initOptions?.suppliers?.map(item => {
                                                return {
                                                    label: item?.name,
                                                    value: item?.id,
                                                };
                                            })}
                                            disabled={attribute === "采日自研备件"}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        hidden={storageMethod !== "ADD"}
                                        rules={[
                                            {
                                                required: storageMethod === "ADD",
                                                message: "请输入必填字段",
                                            },
                                        ]}
                                        label="所属仓库"
                                        name={"warehouse"}
                                    >
                                        <Select
                                            placeholder="请选择所属仓库"
                                            options={initOptions?.warehouses?.map(item => {
                                                return {
                                                    label: item,
                                                    value: item,
                                                };
                                            })}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, message: "请输入必填字段" }]}
                                        label="备件名称"
                                        name={"name"}
                                    >
                                        {storageMethod === "ADD" ? (
                                            <Input placeholder="请输入备件名称" />
                                        ) : (
                                            <Select
                                                placeholder="请选择备件"
                                                options={operateInitData?.spareParts?.map(item => {
                                                    return {
                                                        label: item?.name,
                                                        value: item?.id,
                                                    };
                                                })}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{ required: true, message: "请输入必填字段" }]}
                                        label="备件数量"
                                        name={"stock"}
                                    >
                                        <InputNumber
                                            placeholder="请输入备件数量"
                                            min={0}
                                            style={{ width: "100%" }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="备件备注"
                                        name={"remark"}
                                        hidden={storageMethod !== "ADD"}
                                    >
                                        <Input.TextArea placeholder="请输入备件备注" />
                                    </Form.Item>
                                    <Form.Item label="入库备注" name={"operateRemark"}>
                                        <Input.TextArea placeholder="请输入入库备注" />
                                    </Form.Item>
                                </>
                            );
                        }}
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="备件领用"
                open={useOpen}
                onCancel={() => {
                    setUseOpen(false);
                    useForm.resetFields();
                }}
                onOk={async () => {
                    const values = await useForm.getFieldsValue();
                    const project = operateInitData?.projects?.find(
                        item => item?.id === values?.outputProjectId
                    );
                    const res = await sparePartsOutputServe({
                        id: currentRecord?.id,
                        count: values?.count,
                        outputProjectId: values?.outputProjectId,
                        outputProjectName: project?.name,
                        remark: values?.remark,
                    });
                    if (res?.data?.status === "SUCCESS") {
                        setUseOpen(false);
                        getDataSource();
                        useForm.resetFields();
                    }
                }}
            >
                <Form
                    form={useForm}
                    labelCol={{
                        span: 6,
                    }}
                >
                    <Form.Item label="备件名称" name={"name"} rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <Input placeholder="请选择备件" disabled />
                    </Form.Item>
                    <Form.Item label="库存备件数量" name="stock">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="备件领用数量"
                        name={"count"}
                        rules={[{ ...FORM_REQUIRED_RULE }]}
                    >
                        <InputNumber
                            placeholder="请输入备件领用数量"
                            min={0}
                            max={currentRecord?.stock}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="领用项目"
                        name={"outputProjectId"}
                        rules={[{ ...FORM_REQUIRED_RULE }]}
                    >
                        <Select
                            placeholder="请选择领用项目"
                            options={operateInitData?.projects?.map(item => {
                                return {
                                    label: item?.name,
                                    value: item?.id,
                                };
                            })}
                        />
                    </Form.Item>
                    <Form.Item label="领用备注" name={"remark"}>
                        <Input.TextArea placeholder="请输入领用备注" />
                    </Form.Item>
                </Form>
            </Modal>

            <Drawer
                title="出入库记录"
                width={1000}
                open={recordOpen}
                onClose={() => {
                    setRecordOpen(false);
                    setOutputDatasource([]);
                    setOutputPagination(DEFAULT_PAGINATION);
                    outputPaginationRef.current = DEFAULT_PAGINATION;
                }}
            >
                <Table
                    columns={[
                        {
                            title: "备件名称",
                            dataIndex: "name",
                            width: 200,
                            render(_, row) {
                                const value = row?.spareParts?.name;
                                return (
                                    <Tooltip title={value}>
                                        <div
                                            style={{
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                width: 150,
                                            }}
                                        >
                                            {value}
                                        </div>
                                    </Tooltip>
                                );
                            },
                        },
                        {
                            title: "操作类型",
                            dataIndex: "operation",
                        },
                        {
                            title: "操作数量",
                            dataIndex: "changeCount",
                        },
                        {
                            title: "操作后余量",
                            dataIndex: "stockAfterOperate",
                        },
                        {
                            title: "操作人",
                            dataIndex: "operatorName",
                        },
                        {
                            title: "操作时间",
                            dataIndex: "operateTime",
                        },
                        {
                            title: "操作备注",
                            dataIndex: "remark",
                            key: "remark",
                            ellipsis: true,
                            width: 200,
                            render(value) {
                                return (
                                    <Tooltip title={value}>
                                        <div
                                            style={{
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                width: 150,
                                            }}
                                        >
                                            {value}
                                        </div>
                                    </Tooltip>
                                );
                            },
                        },
                    ]}
                    scroll={{
                        x: "max-content",
                    }}
                    dataSource={outputDatasource}
                    pagination={outputPagination}
                    onChange={pagination => {
                        outputPaginationRef.current = pagination;
                        getOutputDataSource();
                    }}
                />
            </Drawer>
        </div>
    );
};

export default SparePartsManagement;
