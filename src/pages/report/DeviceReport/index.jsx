import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tooltip, DatePicker } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import dayjs from "dayjs";

const Log = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const deviceNameRef = useRef();
    const [deviceName, setDeviceName] = useState();
    const deviceTypeRef = useRef();
    const [deviceType, setDeviceType] = useState();
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
    const timeDimensionRef = useRef();
    const [timeDimension, setTimeDimension] = useState();
    const [timeDimensionOptions, setTimeDimensionOptions] = useState([]);
    const executeTimeRef = useRef();
    const [executeTime, setExecuteTime] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "序号",
            dataIndex: "",
        },
        {
            title: "电站名称",
            dataIndex: "",
        },
        {
            title: "设备名称",
            dataIndex: "",
        },
        {
            title: "设备类型",
            dataIndex: "",
        },
        {
            title: "组串总容量(kWp)",
            dataIndex: "",
        },
        {
            title: "发电量(度)",
            dataIndex: "",
        },
        {
            title: "累计发电量(度)",
            dataIndex: "",
        },
        {
            title: "等价发电时(kWh/kWp)",
            dataIndex: "",
        },
        {
            title: "峰值交流功率(kW)",
            dataIndex: "",
        },
        {
            title: "并网时长(h)",
            dataIndex: "",
        },
        {
            title: "限电损失电量(度)",
            dataIndex: "",
        },
    ];

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const deviceName = deviceNameRef.current;
        const pageName = pageRef.current;
        const operationName = operationRef.current;
        setLoading(true);
        try {
            const res = await getOperationLogServe({
                pageNum: current,
                pageSize,
                queryCmd: {},
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
        deviceTypeRef.current = undefined;
        setDeviceType();
        deviceNameRef.current = undefined;
        setDeviceName();
        timeDimensionRef.current = undefined;
        setTimeDimension();
        executeTimeRef.current = undefined;
        setExecuteTime([]);
        getList();
    };

    useEffect(() => {
        //  getList();
    }, []);

    return (
        <>
            <Space
                style={{
                    flexWrap: "wrap",
                    marginBottom: "8px",
                }}
            >
                <SearchInput
                    label="设备类型"
                    value={deviceType}
                    type="select"
                    options={deviceTypeOptions}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        deviceTypeRef.current = value;
                        setDeviceType(value);
                    }}
                />
                <SearchInput
                    label="设备名称"
                    placeholder="请输入设备名称"
                    inputWidth={250}
                    value={deviceName}
                    onChange={value => {
                        deviceNameRef.current = value;
                        setDeviceName(value);
                    }}
                />
                <SearchInput
                    label="时间维度"
                    value={timeDimension}
                    type="select"
                    options={[
                        { name: "按日统计", code: "day" },
                        { name: "按月统计", code: "month" },
                        { name: "按年统计", code: "year" },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        timeDimensionRef.current = value;
                        setTimeDimension(value);
                    }}
                />
                <div>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            executeTimeRef.current = dateStr;
                            setExecuteTime(dateStr);
                        }}
                        value={
                            executeTime && executeTime.length > 0
                                ? [dayjs(executeTime[0]), dayjs(executeTime[1])]
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
                dataSource={[]}
                columns={columns}
                pagination={pagination}
                scroll={{
                    x: 2500,
                }}
            />
        </>
    );
};

export default Log;
