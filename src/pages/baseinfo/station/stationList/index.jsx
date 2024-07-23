import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, Card } from "antd";
import { useSelector } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput, CardPage } from "@/components";
import AddCompany from "./AddCompany";
import {
    getStationList as getStationListServe,
    deleteStation as deleteStationServer,
    getEditPageInitData as getEditPageInitDataServe,
} from "@/services/sz_index";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { hasPerm } from "@/utils/utils";
import "./index.less";

const Company = () => {
    const nameRef = useRef();
    const [editId, setEditId] = useState();
    const { user } = useSelector(state => state.user);
    const [name, setName] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [companyList, setCompanyList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addCompanyOpen, setAddCompanyOpen] = useState(false);
    const [editInitData, setEditInitData] = useState();

    const columns = [
        {
            title: "场站名称",
            dataIndex: "resourceName",
        },
        {
            title: "场站编号",
            dataIndex: "resourceId",
        },
        {
            title: "关联公司",
            dataIndex: "company",
            render(_,record){
                return record?.company?.userName
            }
        },
        {
            title: "用电户号",
            dataIndex: "resourceId",
        },
        {
            title: "是否默认确认任务",
            dataIndex: "autoConfirmTask",
            render: value => (value ? "是" : "否"),
        },
        {
            title: "平台分润比例",
            dataIndex: "platformProfitSharingRatio",
        },
        {
            title: "联系人",
            dataIndex: "company",
            render(_,record){
                return record?.company?.operator
            }
        },
        {
            title: "联系人电话1",
            dataIndex: "company",
            render(_,record){
                return record?.company?.operatorTel1
            }
        },
        {
            title: "联系人电话2",
            dataIndex: "company",
            render(_,record){
                return record?.company?.operatorTel2
            }
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, record) =>
                record?.code != "SERMATEC" &&
                hasPerm(user, "op:load_resource_edit") && (
                    <a
                        onClick={() => {
                            setAddCompanyOpen(true);
                            setEditId(record.id);
                        }}
                    >
                        编辑
                    </a>
                ),
        },
    ];

    const onSelectChange = newSelectedRowKeys => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const onAddCompanyClose = resFlag => {
        setEditId();
        resFlag && getCompanyList();
        setAddCompanyOpen(false);
    };

    const getEditPageInitData = async () => {
        const res = await getEditPageInitDataServe();
        if(res?.data?.data){
            setEditInitData(res?.data?.data);
        }
    }

    const getCompanyList = async () => {
        const { current, pageSize } = paginationRef.current;
        const name = nameRef.current;
        const res = await getStationListServe({
            pageNum: current,
            pageSize,
            queryCmd: { keyword: name },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setCompanyList(recordList);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        nameRef.current = "";
        setName("");
        getCompanyList();
    };

    const handleDelete = () => {
        if (selectedRowKeys?.length == 0) {
            return message.info("请先勾选需要删除的数据");
        }
        Modal.confirm({
            title: "确定删除?",
            content: "删除后不可恢复",
            onOk: async () => {
                const res = await deleteStationServer(selectedRowKeys);
                if (res?.data?.status == "SUCCESS") {
                    message.success("删除成功");
                    setPagination({
                        current: 1,
                    });
                    setSelectedRowKeys([]);
                    getCompanyList();
                }
            },
        });
    };

    useEffect(() => {
        getCompanyList();
        getEditPageInitData();
    }, []);

    return (
        <CardPage>
            <AddCompany
                initData={editInitData}
                open={addCompanyOpen}
                editId={editId}
                onClose={resFlag => onAddCompanyClose(resFlag)}
            />
            <Space className="search">
                <SearchInput
                    label="场站"
                    value={name}
                    inputWidth={250}
                    placeholder="请输入场站名称或场站编号"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <Button type="primary" onClick={getCompanyList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={companyList}
                columns={columns}
                pagination={pagination}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                    getCheckboxProps: record => ({
                        disabled: record.code === "SERMATEC",
                    }),
                }}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getCompanyList();
                }}
                title={() => (
                    <Space className="table-title">
                        {hasPerm(user, "op:load_resource_add") && (
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setAddCompanyOpen(true)}
                            >
                                新增场站
                            </Button>
                        )}
                        {hasPerm(user, "op:load_resource_delete") && (
                            <Button type="primary" danger onClick={handleDelete}>
                                删除场站
                                {selectedRowKeys?.length ? (
                                    <span>（{selectedRowKeys?.length}）</span>
                                ) : (
                                    ""
                                )}
                            </Button>
                        )}
                    </Space>
                )}
            ></Table>
        </CardPage>
    );
};

export default Company;
