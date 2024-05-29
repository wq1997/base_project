import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tooltip, DatePicker } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import AddPlant from "./AddPlant";
import dayjs from "dayjs";
import styles from "./index.less";
import {
    getPlantType as getPlantTypeServer,
    getPlantList as getPlantListServer,
} from "@/services/plant";

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
    const gridTimeRef = useRef();
    const [gridTime, setGridTime] = useState([]);
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "电站名称",
            dataIndex: "name",
        },
        {
            title: "所属公司",
            dataIndex: "company",
        },
        {
            title: "电站类型",
            dataIndex: "plantTypeName",
        },
        {
            title: "电站组串总容量(kWp)",
            dataIndex: "totalCapacity",
        },
        {
            title: "电站地址",
            dataIndex: "address",
        },
        {
            title: "联系人",
            dataIndex: "contact",
        },
        {
            title: "联系方式",
            dataIndex: "contactWay",
        },
        {
            title: "并网时间",
            dataIndex: "gridTime",
        },
        {
            title: "操作",
            dataIndex: "operate",
            width: 150,
            render: (_, { id }) => {
                return (
                    <Space size={10}>
                        <a
                            type="link"
                            onClick={() => {
                                setEditId(id);
                                setAddPlantOpen(true);
                            }}
                        >
                            编辑
                        </a>
                        <a style={{ color: "#ff4d4f" }} onClick={() => {}}>
                            删除
                        </a>
                        <a type="link" onClick={() => {}}>
                            详情
                        </a>
                    </Space>
                );
            },
        },
    ];

    const getPlantType = async () => {
        const res = await getPlantTypeServer();
        if (res?.data?.data) {
            setPlantTypeOptions(res?.data?.data);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const company = companyRef.current;
        const plantName = plantNameRef.current;
        const plantType = plantTypeRef.current;
        const [gridStartTime, gridEndTime] = gridTimeRef.current || [];
        setLoading(true);
        try {
            const res = await getPlantListServer({
                pageNo: current,
                pageSize,
                company,
                name: plantName,
                plantType,
                gridStartTime,
                gridEndTime,
            });
            if (res?.data?.code == 200) {
                const { total, records } = res?.data?.data;
                setPagination({
                    ...paginationRef.current,
                    total: parseInt(total),
                });
                setDataSource(records);
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
        gridTimeRef.current = undefined;
        setGridTime();
        getList();
    };

    const onAddPlantClose = () => {
        setEditId();
        getList();
        setAddPlantOpen(false);
    };

    useEffect(() => {
        getPlantType();
        getList();
    }, []);

    return (
        <>
            <AddPlant open={addPlantOpen} editId={editId} onClose={onAddPlantClose} />
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
                    label="电站名称"
                    placeholder="请输入电站名称"
                    inputWidth={250}
                    value={plantName}
                    onChange={value => {
                        plantNameRef.current = value;
                        setPlantName(value);
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
                <div>
                    <span>并网时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            gridTimeRef.current = dateStr;
                            setGridTime(dateStr?.includes("") ? [] : dateStr);
                        }}
                        value={
                            gridTime && gridTime.length > 0
                                ? [dayjs(gridTime[0]), dayjs(gridTime[1])]
                                : []
                        }
                    />
                </div>
                <Button type="primary" onClick={getList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                loading={loading}
                rowKey="id"
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
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
