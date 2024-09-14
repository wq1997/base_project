import { Space, Button, Table, theme, DatePicker, Form, Modal, Input, Select, Descriptions } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { SearchInput } from "@/components";
import React, { useState, useEffect, useRef } from "react";
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import styles from "./index.less";
import {
    knowledgeInitData as knowledgeInitDataServe,
    knowledgeFindPage as knowledgeFindPageServe,
} from "@/services";
import dayjs from "dayjs";

const KnowledgeBase = () => {
    const [form] = Form.useForm();
    const { token } = theme.useToken();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [name, setName] = useState();
    const nameRef = useRef();
    const [knowledageType, setKnowledageType] = useState();
    const knowledageTypeRef = useRef();
    const [connectProject, setConnectProject] = useState();
    const connectProjectRef = useRef();
    const [author, setAuthor] = useState();
    const authorRef = useRef();
    const [connectDeviceType, setConnectDeviceType] = useState();
    const connectDeviceTypeRef = useRef();
    const [abnormalLink, setAbnormalLink] = useState();
    const abnormalLinkRef = useRef();
    const [knowledageStatus, setKnowledageStatus] = useState();
    const knowledageStatusRef = useRef();
    const [dataSource, setDataSource] = useState([{}]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [open, setOpen] = useState();
    const [openType, setOpenType] = useState();
    const [detailOpen, setDetailOpen] = useState(false);
    const [options, setOptions] = useState();
    const [date, setDate] = useState();
    const dateRef = useRef();

    const columns = [
        {
            title: "审核进度",
            dataIndex: "productType",
        },
        {
            title: "审核进度",
            dataIndex: "1",
        },
        {
            title: "知识名称",
            dataIndex: "2",
        },
        {
            title: "知识类型",
            dataIndex: "3",
        },
        {
            title: "发布时间",
            dataIndex: "4",
        },
        {
            title: "关联项目",
            dataIndex: "5",
        },
        {
            title: "撰写人",
            dataIndex: "6",
        },
        {
            title: "设备类型",
            dataIndex: "7",
        },
        {
            title: "异常环节",
            dataIndex: "8",
        },
        {
            title: "审批人",
            dataIndex: "9",
        },
        {
            title: "最后修改时间",
            dataIndex: "10",
        },
        {
            title: "操作",
            dataIndex: "Action",
            render() {
                return (
                    <Space>
                        <Button
                            type="link"
                            style={{ color: token.colorPrimary }}
                            onClick={() => {
                                setOpenType("Edit");
                                setOpen(true);
                            }}
                        >
                            编辑
                        </Button>
                        <Button type="link" style={{ color: '#FF4D4F' }}>审核</Button>
                        <Button type="link" style={{ color: '#13C0FF' }} onClick={() => setDetailOpen(true)}>详情</Button>
                    </Space>
                )
            }
        },
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const date = dateRef.current;
        const titleLike = nameRef.current;
        const typeIn = knowledageTypeRef.current;
        const projectId = connectProjectRef.current;
        const creatorNameLike = authorRef.current;
        const deviceType = connectDeviceTypeRef.current;
        const res = await knowledgeFindPageServe({
            pageNum: current,
            pageSize,
            queryCmd: {
                publishedTimeStart:
                    date && date?.length >= 2 && dayjs(date?.[0]).format("YYYY-MM-DD"),
                publishedTimeEnd:
                    date && date?.length >= 2 && dayjs(date?.[1]).format("YYYY-MM-DD"),
                titleLike,
                typeIn,
                projectId,
                creatorNameLike,
            },
        })
    }

    const getInitData = async () => {
        const res = await knowledgeInitDataServe();
        if (res?.data?.status === "SUCCESS") {
            setOptions(res?.data?.data);
        }
    }

    const onReset = () => {
        dateRef.current = undefined;
        nameRef.current = undefined;
        knowledageTypeRef.current = undefined;
        connectProjectRef.current = undefined;
        authorRef.current = undefined;
        connectDeviceTypeRef.current = undefined;
        abnormalLinkRef.current = undefined;
        knowledageStatusRef.current = undefined;
        setKnowledageStatus(undefined);
        setAbnormalLink(undefined);
        setConnectDeviceType(undefined);
        setAuthor(undefined);
        setConnectProject(undefined);
        setKnowledageType(undefined);
        setName(undefined);
        setDate(undefined);
        getList();
    }

    useEffect(() => {
        getInitData();
    }, [])

    return (
        <div className={styles.knowledgeBase}>
            <Space className={styles.search} size={20}>
                <div>
                    <span style={{ color: "#FFF" }}>发布时间：</span>
                    <DatePicker.RangePicker
                        value={date ? [dayjs(date?.[0]), dayjs(date?.[1])] : undefined}
                        onChange={(value, date) => {
                            dateRef.current = date;
                            setDate(date);
                        }}
                    />
                </div>
                <SearchInput
                    label="知识名称"
                    value={name}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <SearchInput
                    label="知识类型"
                    value={knowledageType}
                    type="select"
                    mode="multiple"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        knowledageTypeRef.current = value;
                        setKnowledageType(value);
                    }}
                    options={options?.types?.map(item => {
                        return {
                            name: item,
                            code: item
                        }
                    })}
                />
                <SearchInput
                    label="关联项目"
                    value={connectProject}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        connectProjectRef.current = value;
                        setConnectProject(value);
                    }}
                    options={options?.projects?.map(item => {
                        return {
                            name: item?.name,
                            code: item?.id
                        }
                    })}
                />
                <SearchInput
                    label="撰写人"
                    value={author}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        authorRef.current = value;
                        setAuthor(value);
                    }}
                />
                <SearchInput
                    label="关联设备类型"
                    value={connectDeviceType}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        connectDeviceTypeRef.current = value;
                        setConnectDeviceType(value);
                    }}
                    options={options?.deviceTypes?.map(item => {
                        return {
                            name: item,
                            code: item
                        }
                    })}
                />
                <SearchInput
                    label="异常环节"
                    value={abnormalLink}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        abnormalLinkRef.current = value;
                        setAbnormalLink(value);
                    }}
                    options={options?.inspectionItems?.map(item => {
                        return {
                            name: item?.name,
                            code: item?.id
                        }
                    })}
                />
                <SearchInput
                    label="知识状态"
                    value={knowledageStatus}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        knowledageStatusRef.current = value;
                        setKnowledageStatus(value);
                    }}
                    options={options?.statuses}
                />
                <Button type="primary" onClick={getList}>搜索</Button>
                <Button type="primary" danger onClick={onReset}>重置</Button>
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
                    getList();
                }}
                title={() => (
                    <Space className="table-title">
                        <Button
                            type="primary"
                            onClick={() => {
                                setOpenType("Add");
                                setOpen(true);
                            }}
                        >
                            新增知识
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                Modal.confirm({
                                    title: "系统提示",
                                    content:
                                        "删除此条记录不可恢复，请确认后再删除！",
                                    onOk() {
                                        message.success("删除成功！");
                                    },
                                });
                            }}
                        >
                            删除知识
                            {selectedRowKeys?.length ? (
                                <span>({selectedRowKeys?.length})</span>
                            ) : (
                                ""
                            )}
                        </Button>
                    </Space>
                )}
            />
            <Modal
                open={open}
                title={openType === "Add" ? "新增知识" : "编辑知识"}
                onCancel={() => {
                    setOpen(false);
                    form.resetFields();
                }}
                width={700}
            >
                <Form
                    form={form}
                    labelCol={{
                        span: 4
                    }}
                    style={{
                        minHeight: 300,
                        marginTop: 20
                    }}
                >
                    <Form.Item
                        label="知识类型"
                        name={"knowledageType"}
                        rules={[{ ...FORM_REQUIRED_RULE }]}
                    >
                        <Select
                            placeholder="请选择知识类型"
                            options={[
                                { label: '问题总结', value: 1 },
                                { label: '规章制度', value: 2 },
                                { label: '行业标准', value: 3 },
                                { label: '项目资料', value: 4 }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item noStyle dependencies={['knowledageType']}>
                        {({ getFieldsValue }) => {
                            const { knowledageType } = form.getFieldsValue(['knowledageType']);
                            return (
                                <>
                                    <Form.Item name="title" label="标题" rules={[{ ...FORM_REQUIRED_RULE }]} hidden={!knowledageType}>
                                        <Input placeholder="请输入标题" />
                                    </Form.Item>
                                    <Form.Item
                                        name="connectProject"
                                        label="关联项目"
                                        rules={[
                                            { required: knowledageType === 1 || knowledageType === 4, message: "请输入必填字段" }
                                        ]}
                                        hidden={!(knowledageType === 1 || knowledageType === 4)}
                                    >
                                        <Select placeholder="请选择关联项目" />
                                    </Form.Item>
                                    <Form.Item
                                        name="connectDeviceType"
                                        label="关联设备类型"
                                        rules={[
                                            { required: knowledageType === 1, message: "请输入必填字段" }
                                        ]}
                                        hidden={!(knowledageType === 1)}
                                    >
                                        <Select mode="multiple" maxTagCount={5} placeholder="请选择关联设备类型" />
                                    </Form.Item>
                                    <Form.Item
                                        name="abnormalLink"
                                        label="异常环节"
                                        rules={[
                                            { required: knowledageType === 1, message: "请输入必填字段" }
                                        ]}
                                        hidden={!(knowledageType === 1)}
                                    >
                                        <Select mode="multiple" maxTagCount={5} placeholder="请选择异常环节" />
                                    </Form.Item>
                                    <Form.Item name="content" label="知识内容" rules={[{ ...FORM_REQUIRED_RULE }]} hidden={!knowledageType}>
                                        <Input.TextArea placeholder="请输入知识内容" />
                                    </Form.Item>
                                </>
                            )
                        }}
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="详情"
                open={detailOpen}
                onCancel={() => {
                    setDetailOpen(false);
                }}
            >
                <div style={{ marginTop: 20 }}>
                    <Descriptions column={1}>
                        <Descriptions.Item label="知识标题">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="关联项目">1810000000</Descriptions.Item>
                        <Descriptions.Item label="关联设备类型">Hangzhou, Zhejiang</Descriptions.Item>
                        <Descriptions.Item label="异常环节">empty</Descriptions.Item>
                        <Descriptions.Item label="知识内容">XXXXX</Descriptions.Item>
                    </Descriptions>
                </div>
            </Modal>
        </div>
    )
}

export default KnowledgeBase;