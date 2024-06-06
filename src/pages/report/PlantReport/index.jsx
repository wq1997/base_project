import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, message, DatePicker } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import dayjs from "dayjs";
import { getPlantReportList as getPlantReportListServer } from "@/services/report";

const Log = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const timeDimensionRef = useRef();
    const [timeDimension, setTimeDimension] = useState();
    const timeRef = useRef();
    const [time, setTime] = useState();
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
            title: "电站地址",
            dataIndex: "",
        },
        {
            title: "组串总容量(kWp)",
            dataIndex: "",
        },
        {
            title: "总辐照量(kWh/m²)",
            dataIndex: "",
        },
        {
            title: "日照时长(h)",
            dataIndex: "",
        },
        {
            title: "平均温度(℃)",
            dataIndex: "",
        },
        {
            title: "理论发电量(度)",
            dataIndex: "",
        },
        {
            title: "PV发电量(度)",
            dataIndex: "",
        },
        {
            title: "逆变器发电量(度)",
            dataIndex: "",
        },
        {
            title: "计划发电量(度)",
            dataIndex: "",
        },
        {
            title: "等价发电时(kWh/kWp)",
            dataIndex: "",
        },
        {
            title: "网馈电量(度)",
            dataIndex: "",
        },
        {
            title: "充电电量(度)",
            dataIndex: "",
        },
        {
            title: "放电电量(度)",
            dataIndex: "",
        },
        {
            title: "限电损失电量(度)",
            dataIndex: "",
        },
        {
            title: "限电损失收益(元)",
            dataIndex: "",
        },
        {
            title: "自发自用电量(度)",
            dataIndex: "",
        },
        {
            title: "自发自用率(%)",
            dataIndex: "",
        },
        {
            title: "峰值功率(kW)",
            dataIndex: "",
        },
        {
            title: "系统效率PR(%)",
            dataIndex: "",
        },
        {
            title: "负荷率(%)",
            dataIndex: "",
        },
        {
            title: "二氧化碳减排量(t)",
            dataIndex: "",
        },
        {
            title: "节约标准煤量(t)",
            dataIndex: "",
        },
        {
            title: "等效植树量(棵)",
            dataIndex: "",
        },
        {
            title: "收益(元)",
            dataIndex: "",
        },
        {
            title: "计划完成率(%)",
            dataIndex: "",
        },
    ];

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const name = plantNameRef.current;
        const timePeriod = timeDimensionRef.current;
        const time = timeRef.current;
        setLoading(true);
        const res = await getPlantReportListServer({
            pageNo: current,
            pageSize,
            name,
            time,
            timePeriod,
        });
        if (res?.data?.code == 200) {
            const { total, records } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(total),
            });
            setDataSource(records);
        } else {
            message.info(res?.data?.description);
        }
        setLoading(false);
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        plantNameRef.current = undefined;
        setPlantName();
        timeDimensionRef.current = undefined;
        setTimeDimension();
        timeRef.current = undefined;
        setTime();
        getList();
    };

    useEffect(() => {
        getList();
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
                    label="电站名称"
                    placeholder="请输入电站名称"
                    inputWidth={250}
                    value={plantName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        plantNameRef.current = value;
                        setPlantName(value);
                    }}
                />
                <SearchInput
                    label="时间维度"
                    value={timeDimension}
                    type="select"
                    options={[
                        { name: "按日统计", code: "DAY" },
                        { name: "按月统计", code: "MONTH" },
                        { name: "按年统计", code: "YEAR" },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        timeDimensionRef.current = value;
                        setTimeDimension(value);
                    }}
                />
                <div>
                    <DatePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            executeTimeRef.current = dateStr;
                            setTime(dateStr);
                        }}
                        value={time ? dayjs(time) : null}
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
