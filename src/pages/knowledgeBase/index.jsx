import { history } from "umi";
import { Space, Button, Table, theme, DatePicker, Modal, Descriptions, message } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { SearchInput } from "@/components";
import React, { useState, useEffect, useRef } from "react";
import styles from "./index.less";
import {
    knowledgeInitData as knowledgeInitDataServe,
    knowledgeFindPage as knowledgeFindPageServe,
    knowledgeDelete as knowledgeDeleteServe,
} from "@/services";
import dayjs from "dayjs";

const KnowledgeBase = () => {
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
    const [dataSource, setDataSource] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [detailOpen, setDetailOpen] = useState(false);
    const [options, setOptions] = useState();
    const [date, setDate] = useState();
    const [currentRecord, setCurrentRecord] = useState();
    const dateRef = useRef();

    const columns = [
        {
            title: "知识状态",
            dataIndex: "statusZh",
            width: 100
        },
        {
            title: "知识名称",
            dataIndex: "title",
            width: 200,
        },
        {
            title: "知识类型",
            dataIndex: "type",
            width: 100,
        },
        {
            title: "发布时间",
            dataIndex: "createdTime",
            width: 200,
        },
        {
            title: "关联项目",
            dataIndex: "project",
            width: 300,
            render(_, row) {
                return row?.project?.name;
            }
        },
        {
            title: "撰写人",
            dataIndex: "creatorName",
            width: 200,
        },
        {
            title: "设备类型",
            dataIndex: "deviceTypes",
            width: 100,
            render(_, row) {
                return row?.deviceTypes?.join(',');
            }
        },
        {
            title: "异常环节",
            dataIndex: "exceptionRefs",
            width: 200,
            render(_, row) {
                return row?.exceptionRefs?.map(item => item?.name)?.join(',');
            }
        },
        {
            title: "审批人",
            dataIndex: "auditorName",
            width: 200,
        },
        {
            title: "最后修改时间",
            dataIndex: "lastUpdatedTime",
            width: 200,
        },
        {
            title: "操作",
            dataIndex: "Action",
            fixed: 'right',
            width: 250,
            render(_, row) {
                return (
                    <Space>
                        <Button
                            type="link"
                            style={{ color: token.colorPrimary }}
                            onClick={() => {
                                history.push(`/knowledgeBase/editOrCheck?openType=Edit&id=${row?.id}`)
                            }}
                        >
                            编辑
                        </Button>
                        <Button type="link" style={{ color: '#FF4D4F' }} onClick={() => history.push(`/knowledgeBase/editOrCheck?openType=Check&id=${row?.id}`)}>审核</Button>
                        <Button
                            type="link"
                            style={{ color: '#13C0FF' }}
                            onClick={() => {
                                setDetailOpen(true);
                                setCurrentRecord(row);
                            }}
                        >
                            详情
                        </Button>
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
        const exceptionRefId = abnormalLinkRef.current;
        const status = knowledageStatusRef.current;
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
                deviceType,
                exceptionRefId,
                status
            },
        });
        if (res?.data?.status === "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data || {};
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setDataSource(recordList);
        }
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
        getList();
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
                    options={options?.deviceTypes}
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
                    options={options?.exceptionRefs}
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
                scroll={{
                    x: 1500
                }}
                title={() => (
                    <Space className="table-title">
                        <Button
                            type="primary"
                            onClick={() => {
                                history.push(`/knowledgeBase/editOrCheck?openType=Add`)
                            }}
                        >
                            新增知识
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                if (selectedRowKeys?.length === 0) {
                                    message.error("请先勾选需要删除的行!")
                                    return;
                                };
                                Modal.confirm({
                                    title: "系统提示",
                                    content:
                                        "删除此条记录不可恢复，请确认后再删除！",
                                    onOk: async () => {
                                        const res = await knowledgeDeleteServe({
                                            ids: selectedRowKeys
                                        })
                                        if (res?.data?.status === "SUCCESS") {
                                            getList();
                                            setSelectedRowKeys([]);
                                        }
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
                title="详情"
                open={detailOpen}
                onCancel={() => {
                    setDetailOpen(false);
                }}
                width={800}
            >
                <div style={{ marginTop: 20 }}>
                    <Descriptions column={1}>
                        {
                            currentRecord?.type &&
                            <Descriptions.Item label="知识类型">{currentRecord?.type}</Descriptions.Item>
                        }
                        {
                            currentRecord?.title &&
                            <Descriptions.Item label="知识标题">{currentRecord?.title}</Descriptions.Item>
                        }
                        {
                            currentRecord?.project?.name &&
                            <Descriptions.Item label="关联项目">{currentRecord?.project?.name}</Descriptions.Item>
                        }
                        {
                            currentRecord?.deviceTypes?.length > 0 &&
                            <Descriptions.Item label="关联设备类型">{currentRecord?.deviceTypes?.join(',')}</Descriptions.Item>
                        }
                        {
                            currentRecord?.exceptionRefs?.length > 0 &&
                            <Descriptions.Item label="异常环节">{currentRecord?.exceptionRefs?.map(item => item?.name)?.join(',')}</Descriptions.Item>
                        }
                    </Descriptions>
                    {
                        currentRecord?.content &&
                        <div className={styles.knowledageShow}>
                            <div className={styles.knowledageShowTitle}>知识内容</div>
                            <div dangerouslySetInnerHTML={{ __html: currentRecord?.content }} className={styles.knowledageShowContent}/>
                        </div>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default KnowledgeBase;