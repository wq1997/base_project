import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Popconfirm, DatePicker, message } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import AddPlant from "./AddPlant";
import Detail from "./Detail";
import dayjs from "dayjs";
import {
    getPlantType as getPlantTypeServer,
    getPlantList as getPlantListServer,
    deletePlantById as deletePlantByIdServer,
} from "@/services/plant";

const Log = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addPlantOpen, setAddPlantOpen] = useState(false);
    const [editId, setEditId] = useState();
    const companyRef = useRef();
    const [companyOptions, setCompanyOptions] = useState([]);
    const [company, setCompany] = useState();
    const plantTypeRef = useRef();
    const [plantType, setPlantType] = useState();
    const [plantTypeOptions, setPlantTypeOptions] = useState([]);
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const gridTimeRef = useRef();
    const [gridTime, setGridTime] = useState([]);
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [detailId, setDetailId] = useState();
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "电站名称",
            dataIndex: "name",
        },
        {
            title: "关联用户",
            dataIndex: "",
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
                            onClick={() => {
                                setEditId(id);
                                setAddPlantOpen(true);
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

    const deletePlant = async id => {
        const res = await deletePlantByIdServer(id);
        if (res?.data?.code == 200) {
            const { current } = paginationRef?.current;
            if (current != 1 && dataSource.length == 1) {
                (paginationRef.current.current = current - 1),
                    setPagination({
                        current: current - 1,
                    });
            }
            getList();
            message.info("删除成功");
        } else {
            message.info(res?.data?.description);
        }
    };

    const getPlantType = async () => {
        const res = await getPlantTypeServer();
        if (res?.data?.code == 200) {
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

    const handleSearch = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        getList();
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
            <Detail
                detailId={detailId}
                onClose={() => {
                    setDetailId();
                }}
            />
            <Space
                style={{
                    flexWrap: "wrap",
                    marginBottom: "8px",
                }}
            >
                <SearchInput
                    label="所属公司"
                    placeholder="请选择所属公司"
                    type="select"
                    options={companyOptions}
                    value={company}
                    onChange={value => {
                        companyRef.current = value;
                        setCompany(value);
                    }}
                />
                 <SearchInput
                    label="关联用户"
                    placeholder="请选择关联用户"
                    type="select"
                    options={companyOptions}
                    value={company}
                    onChange={value => {
                        companyRef.current = value;
                        setCompany(value);
                    }}
                />
                <SearchInput
                    label="电站名称"
                    placeholder="请输入电站名称"
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
                <Button type="primary" onClick={() => handleSearch()}>
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
                    <div style={{ textAlign: "right" }}>
                        <Button type="primary" onClick={() => setAddPlantOpen(true)}>
                            新增电站
                        </Button>
                    </div>
                )}
            />
        </>
    );
};

export default Log;
