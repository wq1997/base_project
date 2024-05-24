import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tooltip, DatePicker } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import AddPlant from "./AddPlant";
import dayjs from "dayjs";
import styles from "./index.less";
import { getPlantList as getPlantListServer } from "@/services/plant";

const Log = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addPlantOpen, setAddPlantOpen] = useState(false);
    const [editId, setEditId] = useState();
    const companyRef = useRef();
    const [company, setCompany] = useState();
    const plantTypeRef = useRef();
    const [plantType, setPlantType] = useState();
    const [plantTypeOptions, setPlantTypeOptions] = useState([]);
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const connectGridTimeRef = useRef();
    const [connectGridTime, setConnectGridTime] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "序号",
            dataIndex: "operatorAccount",
        },
        {
            title: "SN号",
            dataIndex: "",
        },
        {
            title: "设备名称",
            dataIndex: "operationPage",
        },
        {
            title: "设备类型",
            dataIndex: "operatorName",
        },
        {
            title: "设备状态",
            dataIndex: "",
        },
        {
            title: "设备型号",
            dataIndex: "",
        },
        {
            title: "电站名称",
            dataIndex: "",
        },
        {
            title: "质保有效期",
            dataIndex: "",
        },
        {
            title: "通信状态",
            dataIndex: "",
        },
    ];

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const company = companyRef.current;
        const plantName = plantNameRef.current;
        const plantType = plantTypeRef.current;
        setLoading(true);
        try {
            const res = await getPlantListServer({
                pageNo: current,
                pageSize,
                queryCmd: {
                    company,
                    name: plantName,
                    plantType,
                },
            });
            if (res?.data?.status == "SUCCESS") {
                const { totalRecord, recordList } = res?.data?.data;
                setPagination({
                    ...paginationRef.current,
                    total: parseInt(totalRecord),
                });
                setDataSource(recordList);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        companyRef.current = undefined;
        setCompany();
        plantTypeRef.current = undefined;
        setPlantType();
        plantNameRef.current = undefined;
        setPlantName();
        connectGridTimeRef.current = undefined;
        setConnectGridTime();
        getList();
    };

    const onAddPlantClose = resFlag => {
        setEditId();
        resFlag && getCompanyList();
        setAddPlantOpen(false);
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            <AddPlant open={addPlantOpen} onClose={resFlag => onAddPlantClose(resFlag)} />
            <Space
                style={{
                    flexWrap: "wrap",
                    marginBottom: "8px",
                }}
            >
                <SearchInput
                    label="所属公司"
                    placeholder="请输入所属公司"
                    inputWidth={250}
                    value={company}
                    onChange={value => {
                        companyRef.current = value;
                        setCompany(value);
                    }}
                />
                <SearchInput
                    label="电站类型"
                    value={plantType}
                    type="select"
                    options={plantTypeOptions}
                    onChange={value => {
                        plantTypeRef.current = value;
                        setPlantType(value);
                    }}
                />
                <SearchInput
                    label="电站名称"
                    placeholder="请输入电站名称"
                    inputWidth={250}
                    value={plantName}
                    onChange={value => {
                        plantNameRef.current = value;
                        setPlantName(value);
                    }}
                />
                <div>
                    <span>并网时间：</span>
                    <DatePicker
                        onChange={(date, dateStr) => {
                            connectGridTimeRef.current = dateStr;
                            setConnectGridTime(dateStr);
                        }}
                        value={connectGridTime ? dayjs(connectGridTime) : undefined}
                    />
                </div>
                <Button type="primary" onClick={getList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                loading={loading}
                dataSource={dataSource?.map(data => {
                    return {
                        ...data,
                        key: data?.id,
                    };
                })}
                columns={columns}
                pagination={pagination}
                title={() => (
                    <Button
                        type="primary"
                        onClick={() => setAddPlantOpen(true)}
                        style={{ float: "right", marginBottom: "8px" }}
                    >
                        新增电站
                    </Button>
                )}
            />
        </>
    );
};

export default Log;
