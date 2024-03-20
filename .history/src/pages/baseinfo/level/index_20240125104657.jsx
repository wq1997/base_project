import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal } from "antd";
import { SearchInput } from "@/components";
import AutoUpdate from "./AutoUpdate";
import UpdateLevel from "./UpdateLevel";
import {
    getLevelList as getLevelListServer,
    getLevelSearchInitData as getLevelSearchInitDataServer,
} from "@/services/company";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";

const Company = () => {
    const companyNameRef = useRef();
    const statusRef = useRef();
    const [editData, setEditData] = useState();
    const [companyName, setCompanyName] = useState();
    const [status, setStatus] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [companyList, setCompanyList] = useState([]);
    const [addCompanyOpen, setAddCompanyOpen] = useState(false);
    const [autoUpdateOpen, setAutoUpdateOpen] = useState(false);

    const columns = [
        {
            title: "生效状态",
            dataIndex: "statusZh",
        },
        {
            title: "公司名称",
            dataIndex: "companyName",
        },
        {
            title: "公司编号",
            dataIndex: "companyCode",
        },
        {
            title: "公司等级",
            dataIndex: "levelText",
        },
        {
            title: "生效时间",
            dataIndex: "createdTime",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, record) =>
                record?.status == "IN_EFFECT" && (
                    <a
                        onClick={() => {
                            setAddCompanyOpen(true);
                            setEditData(record);
                        }}
                    >
                        编辑
                    </a>
                ),
        },
    ];

    const onAddCompanyClose = resFlag => {
        setEditData();
        resFlag && getLevelList();
        setAddCompanyOpen(false);
    };

    const getLevelSearchInitData = async () => {
        const res = await getLevelSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { levelStatus } = res?.data?.data;
            setStatusList(levelStatus);
        }
    };

    const getLevelList = async () => {
        const { current, pageSize } = paginationRef.current;
        const name = nameRef.current;
        const status = statusRef.current;
        const res = await getLevelListServer({
            pageNum: current,
            pageSize,
            queryCmd: { name, status },
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
        nameRef.current = undefined;
        setName();
        statusRef.current = undefined;
        setStatus();
        getLevelList();
    };

    useEffect(() => {
        getLevelSearchInitData();
        getLevelList();
    }, []);

    return (
        <div>
            <AutoUpdate open={autoUpdateOpen} onClose={() => setAutoUpdateOpen(false)} />
            <UpdateLevel
                open={addCompanyOpen}
                editData={editData}
                onClose={resFlag => onAddCompanyClose(resFlag)}
            />
            <Space className="search">
                <SearchInput
                    label="公司名称"
                    value={name}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <SearchInput
                    label="邀约确认状态"
                    value={status}
                    type="select"
                    options={statusList}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        statusRef.current = value;
                        setStatus(value);
                    }}
                />
                <Button type="primary" onClick={getLevelList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={companyList}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getLevelList();
                }}
                title={() => (
                    <Button type="primary" onClick={() => setAutoUpdateOpen(true)}>
                        自动更新逻辑
                    </Button>
                )}
            ></Table>
        </div>
    );
};

export default Company;
