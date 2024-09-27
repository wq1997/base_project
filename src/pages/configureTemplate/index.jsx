import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, Upload, Tooltip, Input, Popconfirm } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { history, useLocation } from "umi";
import { SearchInput } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import dayjs from "dayjs";
import AddTemplate from "./AddTemplate";
import Detail from "./Detail";
import {
    getTemplateInitData as getTemplateInitDataServer,
    getTemplateList as getTemplateListServer,
    deleteTemplates as deleteTemplatesServer,
} from "@/services/api";

const Account = () => {
    const dataTypeRef = useRef();
    const dimensionRef = useRef();
    const deviceTypeRef = useRef();
    const [detailId, setDetailId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [dataType, setDataType] = useState();
    const [dataTypeOptions, setDataTypeOptions] = useState();
    const [dimension, setDimension] = useState();
    const [dimensionOptions, setDimensionOptions] = useState();
    const [deviceType, setDeviceType] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [list, setList] = useState([]);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const columns = [
        {
            title: "数据类型",
            dataIndex: "dataType",
        },
        {
            title: "设备类型",
            dataIndex: "deviceType",
        },

        {
            title: "取值维度",
            dataIndex: "dimensionZh",
            width: 100,
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            width: 200,
        },
        {
            title: "备注",
            dataIndex: "description",
        },
        {
            title: "操作",
            width: 150,
            dataIndex: "operate",
            render: (_, { id, parseStatus }) => {
                return (
                    <Space>
                        <a
                            onClick={() => {
                                setEditId(id);
                                setUploadOpen(true);
                            }}
                        >
                            编辑
                        </a>
                        <Popconfirm
                            title="操作确认"
                            description="确定删除此电站？"
                            onConfirm={() => deletePlant(id)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{ color: "#ff4d4f" }}>删除</a>
                        </Popconfirm>
                        <a onClick={() => setDetailId(id)}>详情</a>
                    </Space>
                );
            },
        },
    ];

    const getInitData = async () => {
        const res = await getTemplateInitDataServer();
        if (res?.data?.code == 0) {
            const { dataTypeList, dimensionEnumList } = res?.data?.data;
            setDataTypeOptions(dataTypeList);
            setDimensionOptions(dimensionEnumList);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const dataType = dataTypeRef.current;
        const deviceType = deviceTypeRef.current;
        const dimension = dimensionRef.current;
        const res = await getTemplateListServer({
            pageNum: current,
            pageSize,
            queryParam: {
                dataType,
                deviceType,
                dimension,
            },
        });
        if (res?.data?.code == 0) {
            const { total, items } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(total),
            });
            setList(items);
        }
    };

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        dataTypeRef.current = undefined;
        setDataType();
        dimensionRef.current = undefined;
        setDimension();
        deviceTypeRef.current = undefined;
        setDeviceType();
        getList();
    };

    const handleExport = () => {
        if (selectedRowKeys?.length == 0) {
            return message.info(`请先勾选需要导出的数据`);
        }
        window.open(`${process.env.API_URL_1}/template/export?ids=${selectedRowKeys}`);
    };

    const handleDelete = () => {
        if (selectedRowKeys?.length == 0) {
            return message.info(`请先勾选需要删除的数据`);
        }
        Modal.confirm({
            title: `确定删除？`,
            content: "删除后无法恢复",
            onOk: async () => {
                const res = await deleteTemplatesServer(selectedRowKeys);
                if (res?.data?.code == 0) {
                    message.success(`删除成功`);
                    setPagination({
                        current: 1,
                    });
                    setSelectedRowKeys([]);
                    getList();
                }
            },
        });
    };

    const handleSearch = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        getList();
    };

    useEffect(() => {
        getInitData();
        getList();
    }, []);

    return (
        <div>
            <AddTemplate
                uploadOpen={uploadOpen}
                detailId={detailId}
                editId={editId}
                onClose={() => {
                    setUploadOpen(false);
                    setEditId(null);
                    getList();
                }}
            />
            <Detail
                detailId={detailId}
                onClose={() => {
                    setDetailId(null);
                }}
            />
            <Space className="search">
                <SearchInput
                    label="数据类型"
                    value={dataType}
                    type="select"
                    options={dataTypeOptions?.map(item => ({
                        code: item,
                        name: item,
                    }))}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        dataTypeRef.current = value;
                        setDataType(value);
                    }}
                />
                <SearchInput
                    label="设备类型"
                    value={deviceType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        deviceTypeRef.current = value;
                        setDeviceType(value);
                    }}
                />
                <SearchInput
                    label="取值维度"
                    type="select"
                    options={dimensionOptions}
                    value={dimension}
                    fieldNames={{
                        label: "desc",
                    }}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        dimensionRef.current = value;
                        setDimension(value);
                    }}
                />
                <Button type="primary" onClick={handleSearch}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={list}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                }}
                title={() => (
                    <Space className="table-title">
                        <Button color="primary" variant="solid" onClick={() => setUploadOpen(true)}>
                            新增模版
                        </Button>
                        <Button type="primary" danger onClick={handleDelete}>
                            批量删除
                            {selectedRowKeys?.length ? (
                                <span>({selectedRowKeys?.length})</span>
                            ) : (
                                ""
                            )}
                        </Button>
                        <Upload
                            action={process.env.API_URL_1 + "/template/import"}
                            showUploadList={false}
                            onChange={info => {
                                if (info.file.status === "done") {
                                    message.success("上传成功");
                                    getList();
                                } else if (info.file.status === "error") {
                                    message.error("上传失败");
                                }
                            }}
                        >
                            <Button color="primary" variant="outlined">
                                导入模版
                            </Button>
                        </Upload>
                        <Button color="primary" variant="dashed" onClick={handleExport}>
                            导出模版
                        </Button>
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
