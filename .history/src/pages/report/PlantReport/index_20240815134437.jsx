import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, message, DatePicker } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { jsonToUrlParams } from "@/utils/utils";
import dayjs from "dayjs";
import { getPlantReportList as getPlantReportListServer } from "@/services/report";
import moment from "moment";

const Log = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const [plantNameOptions, setPlantNameOptions] = useState();
    const timeDimensionRef = useRef();
    const [timeDimension, setTimeDimension] = useState("DAY");
    const timeRef = useRef();
    const [time, setTime] = useState(dayjs());
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

    const columns = [
        {
            title: "电站名称",
            dataIndex: "name",
        },
        {
            title: "电站地址",
            dataIndex: "address",
        },
        {
            title: "组串总容量(kWp)",
            dataIndex: "capacity",
        },
        {
            title: "逆变器发电量(kWh)",
            dataIndex: "inverterPower",
        },

        {
            title: "网馈电量(kWh)",
            dataIndex: "netFeedInPower",
        },
        {
            title: "单设备峰值功率(kW)",
            dataIndex: "peakPower",
        },
    ];

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const name = plantNameRef.current;
        const timePeriod = timeDimensionRef.current || "DAY";
        const time = timeRef.current||moment().format("YYYY-MM-DD");
        if (!time) return message.info("请先选择日期");
        setLoading(true);
        console.log("timePeriod", timePeriod);
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

    const handleSearch = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        getList();
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        plantNameRef.current = undefined;
        setPlantName();
        timeDimensionRef.current = undefined;
        setTimeDimension();
        timeRef.current = undefined;
        setTime();
        setDataSource();
        setPagination({
            current: 1,
            total: 0,
        });
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            <Space
                style={{
                    flexWrap: "wrap",
                }}
            >
                 <SearchInput
                    label="电站名称"
                    placeholder="请选择电站"
                    value={plantName}
                    type="select"
                    options={plantNameOptions}
                    onChange={value => {
                        plantNameRef.current = value;
                        setPlantName(value);
                    }}
                />
                <SearchInput
                    label="时间维度"
                    value={timeDimension}
                    allowClear={false}
                    type="select"
                    options={[
                        { displayName: "按日统计", name: "DAY" },
                        { displayName: "按月统计", name: "MONTH" },
                        { displayName: "按年统计", name: "YEAR" },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        timeDimensionRef.current = value;
                        setTimeDimension(value);
                        timeRef.current = undefined;
                        setTime();
                    }}
                />
                <div>
                    <DatePicker
                        picker={
                            {
                                DAY: "day",
                                MONTH: "month",
                                YEAR: "year",
                            }[timeDimension]
                        }
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            timeRef.current = dateStr;
                            setTime(dateStr);
                        }}
                        value={time ? dayjs(time) : null}
                    />
                </div>
                <Button type="primary" onClick={() => handleSearch()}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>

            <Table
                loading={loading}
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
                title={() => (
                    <div
                        style={{
                            textAlign: "right",
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={() => {
                                const name = plantNameRef.current;
                                const timePeriod = timeDimensionRef.current || "DAY";
                                const time = timeRef.current;
                                if (!time) return message.info("请先选择日期");
                                let url = `${process.env.API_URL_1}/api/v1/report/export-plant-report${jsonToUrlParams(
                                    {
                                        name,
                                        timePeriod,
                                        time,
                                    }
                                )}`;
                                window.open(url);
                            }}
                        >
                            导出
                        </Button>
                    </div>
                )}
            />
        </>
    );
};

export default Log;
